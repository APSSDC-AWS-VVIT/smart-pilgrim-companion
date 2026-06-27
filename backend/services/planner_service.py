import math
import re
from models.budget import Budget
from models.temple import Temple
from services.temple_service import get_routes_for_temple, get_nearby_places
from services.analytics_service import increment_analytic_metric
from models.place import Place

def _normalize_budget_type(value):
    if not value:
        return "low"
    normalized = str(value).strip().lower()
    if normalized == "high" or normalized == "premium":
        return "premium"
    return normalized

def _resolve_temple(identifier):
    if not identifier:
        return None
    normalized = str(identifier).strip()
    temple = Temple.query.filter(
        (Temple.temple_id.ilike(normalized)) | (Temple.temple_name.ilike(normalized))
    ).first()
    if temple:
        return temple

    wildcard = f"%{normalized}%"
    return Temple.query.filter(
        (Temple.temple_id.ilike(wildcard))
        | (Temple.temple_name.ilike(wildcard))
        | (Temple.district.ilike(wildcard))
        | (Temple.location.ilike(wildcard))
    ).first()

def _serialize_budget(budget):
    return {
        "budget_id": budget.budget_id,
        "budget_type": budget.budget_type,
        "min_cost": budget.min_cost,
        "max_cost": budget.max_cost,
        "persons": budget.persons,
        "days": budget.days,
        "includes": budget.includes,
    }

def _select_budgets(temple_id, days, persons, budget_type):
    budgets = Budget.query.filter_by(temple_id=temple_id).order_by(Budget.min_cost.asc()).all()
    if not budgets:
        return []
    type_matches = [b for b in budgets if b.budget_type.lower() == budget_type]
    if type_matches:
        return type_matches
    return budgets

def _parse_cost_range(cost_text):
    if not cost_text:
        return None
    numbers = [int(token.replace(",", "")) for token in re.findall(r"\d[\d,]*", str(cost_text))]
    if not numbers:
        return None
    if len(numbers) == 1:
        return numbers[0], numbers[0]
    return min(numbers), max(numbers)

def _choose_route(routes, budget_type):
    if not routes:
        return None
    parsed_routes = []
    for route in routes:
        cost_range = _parse_cost_range(route.get("estimated_cost"))
        if cost_range is None:
            continue
        parsed_routes.append((route, cost_range))

    if not parsed_routes:
        return routes[0]

    if budget_type == "low":
        return min(parsed_routes, key=lambda item: item[1][0])[0]
    if budget_type == "premium":
        return max(parsed_routes, key=lambda item: item[1][1])[0]
    return parsed_routes[0][0]

def _build_steps(temple, route, budget, days):
    steps = []
    if route:
        steps.append(f"Reach {route.get('destination')} via {route.get('travel_mode')} from {route.get('source')}.")
    if temple.best_visit_time:
        steps.append(f"Visit during {temple.best_visit_time.lower()} for the best darshan window.")
    if budget:
        steps.append(f"Keep the plan within the {budget.budget_type.lower()} budget band for {days or budget.days} day(s).")
    if temple.speciality:
        steps.append(f"Focus on {temple.speciality} as part of the temple experience.")
    return steps[:5]

def get_planner_payload(identifier, days=None, budget_type=None, persons=None):
    temple = _resolve_temple(identifier)
    if not temple:
        return None

    selected_budget_type = _normalize_budget_type(budget_type)
    try:
        days = int(days) if days is not None else 3
    except (TypeError, ValueError):
        days = 3

    budgets = _select_budgets(temple.temple_id, days, persons, selected_budget_type)
    budget_choice = budgets[0] if budgets else None
    routes = get_routes_for_temple(temple)
    chosen_route = _choose_route(routes, selected_budget_type)

    from services.recommendation_engine import build_ai_recommendation_node
    ai_node = build_ai_recommendation_node(temple, selected_budget_type, routes)

    # Increment metric values inside tracking logs synchronously 
    increment_analytic_metric("planner_requests")
    increment_analytic_metric("ai_recommendation_count")
    increment_analytic_metric("temple_selections", temple.temple_name)
    increment_analytic_metric("budget_selections", selected_budget_type.upper())
    if chosen_route:
        increment_analytic_metric("transport_selections", chosen_route.get("travel_mode", "Train"))

    return {
        "temple": temple.temple_name,
        "temple_details": {
            "temple_id": temple.temple_id,
            "temple_name": temple.temple_name,
            "state": temple.state,
            "district": temple.district,
            "location": temple.location,
            "description": temple.description,
            "best_visit_time": temple.best_visit_time,
            "speciality": temple.speciality,
        },
        "route": [chosen_route] if chosen_route else [],
        "selectedRoute": chosen_route,
        "budget": [_serialize_budget(b) for b in budgets],
        "budgetOptions": [_serialize_budget(b) for b in budgets],
        "routeOptions": routes,
        "timeline": [
            {"order": i + 1, "title": "Itinerary Milestone", "detail": step}
            for i, step in enumerate(_build_steps(temple, chosen_route, budget_choice, days))
        ],
        # "nearbyPlaces": [
        #     {"id": f"P{i}", "name": p.place_name, "type": p.place_type, "distance": p.distance_from_temple, "description": p.description}
        #     for i, p in enumerate(temple.places)
        # ] if hasattr(temple, 'places') and temple.places else [],
        "nearbyPlaces": [
            {
                "id": str(p.place_id), 
                "name": p.place_name, 
                "type": p.place_type, 
                "distance": p.distance_from_temple, 
                "description": p.description
            }
            for p in get_nearby_places(temple.temple_id)
        ],
        "smartTips": [ai_node["smart_tip"]],
        "riskNotes": ["Book darshan early to reduce waiting time.", ai_node["smart_tip"], f"Route note: {chosen_route.get('notes', 'N/A')}" if chosen_route else "N/A"],
        "steps": _build_steps(temple, chosen_route, budget_choice, days),
        "best_time": ai_node["best_visit_time"],
        "estimated_budget": ai_node["estimated_budget"].replace("₹", ""),
        "ai_recommendation": ai_node,
    }