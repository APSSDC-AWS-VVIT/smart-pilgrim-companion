# import math

# from models.budget import Budget
# from models.temple import Temple
# from services.planner_service import _normalize_budget_type, _parse_cost_range, _resolve_temple
# from services.temple_service import get_routes_for_temple


# def _select_budget(temple_id, days, persons, budget_type):
#     budgets = Budget.query.filter_by(temple_id=temple_id).order_by(Budget.min_cost.asc()).all()
#     if not budgets:
#         return None

#     if days is not None and persons is not None:
#         for budget in budgets:
#             if budget.days == days and budget.persons == persons and budget.budget_type.lower() == budget_type:
#                 return budget

#     for budget in budgets:
#         if budget.budget_type.lower() == budget_type:
#             return budget

#     return budgets[0]


# def _choose_route(routes, budget_type):
#     if not routes:
#         return None

#     scored_routes = []
#     for route in routes:
#         cost_range = _parse_cost_range(route.get("estimated_cost"))
#         if cost_range is None:
#             continue
#         scored_routes.append((route, cost_range))

#     if not scored_routes:
#         return routes[0]

#     if budget_type == "low":
#         return min(scored_routes, key=lambda item: item[1][0])[0]
#     if budget_type in {"premium", "high"}:
#         preferred_modes = ["flight", "private car", "train + bus", "train"]
#         for mode in preferred_modes:
#             mode_matches = [item for item in scored_routes if mode in item[0].get("travel_mode", "").lower()]
#             if mode_matches:
#                 return max(mode_matches, key=lambda item: item[1][1])[0]
#         return max(scored_routes, key=lambda item: item[1][1])[0]

#     midpoint = sum((cost_range[0] + cost_range[1]) / 2 for _, cost_range in scored_routes) / len(scored_routes)
#     return min(scored_routes, key=lambda item: abs(((item[1][0] + item[1][1]) / 2) - midpoint))[0]


# def _travel_tip(budget_type, temple):
#     if budget_type == "low":
#         return "Book darshan early and prefer the lowest-cost train or bus option."
#     if budget_type in {"premium", "high"}:
#         return "Choose comfortable travel, reserve premium slots early, and plan for a smoother darshan."
#     return "Balance comfort and savings by booking transport in advance and aligning with the best visit window."


# def build_recommendation(payload):
#     temple = _resolve_temple(payload.get("temple") or payload.get("temple_id"))
#     if not temple:
#         return None

#     try:
#         days = int(payload.get("days")) if payload.get("days") is not None else None
#     except (TypeError, ValueError):
#         days = None

#     try:
#         persons = int(payload.get("persons")) if payload.get("persons") is not None else 1
#     except (TypeError, ValueError):
#         persons = 1

#     budget_type = _normalize_budget_type(payload.get("budget")) or "medium"
#     routes = get_routes_for_temple(temple)
#     route_choice = _choose_route(routes, budget_type)
#     budget_choice = _select_budget(temple.temple_id, days, persons, budget_type)

#     if budget_choice:
#         estimated_budget = str(math.ceil((budget_choice.min_cost + budget_choice.max_cost) / 2))
#     else:
#         estimated_budget = "0"

#     recommended_route = route_choice.get("travel_mode") if route_choice else ""
#     if not recommended_route and route_choice:
#         recommended_route = route_choice.get("source", "")

#     return {
#         "temple": temple.temple_name,
#         "recommended_route": recommended_route,
#         "estimated_budget": estimated_budget,
#         "best_time": temple.best_visit_time,
#         "travel_tip": _travel_tip(budget_type, temple),
#         "route_details": route_choice,
#         "budget_details": {
#             "budget_id": budget_choice.budget_id,
#             "budget_type": budget_choice.budget_type,
#             "min_cost": budget_choice.min_cost,
#             "max_cost": budget_choice.max_cost,
#             "persons": budget_choice.persons,
#             "days": budget_choice.days,
#             "includes": budget_choice.includes,
#         }
#         if budget_choice
#         else None,
#     }

import math
import re
from models.budget import Budget
from models.place import Place
from models.schedule import Schedule

def _parse_cost_range(cost_text):
    if not cost_text:
        return (0, 0)
    numbers = [int(token.replace(",", "")) for token in re.findall(r"\d[\d,]*", str(cost_text))]
    if not numbers:
        return (0, 0)
    if len(numbers) == 1:
        return numbers[0], numbers[0]
    return min(numbers), max(numbers)

def _parse_duration_hours(duration_text):
    if not duration_text:
        return 5.0
    numbers = [float(x) for x in re.findall(r"\d+\.?\d*", str(duration_text))]
    if not numbers:
        return 5.0
    return numbers[0]

def _calculate_scores(temple, budget_type, routes):
    scored_results = []
    
    # 1. Budget Fit Target Reference Base
    if budget_type == "low":
        target_min, target_max = 0, 1500
    elif budget_type in {"premium", "high"}:
        target_min, target_max = 4000, 15000
    else:
        target_min, target_max = 1501, 3999

    # Fetch infrastructure factors from the database
    nearby_places_count = Place.query.filter_by(temple_id=temple.temple_id).count()
    schedules_count = Schedule.query.filter_by(temple_id=temple.temple_id).count()

    for route in routes:
        route_min, route_max = _parse_cost_range(route.get("estimated_cost", "0"))
        route_mid = (route_min + route_max) / 2
        
        # Calculate individual metric scores (0.0 to 1.0)
        if target_min <= route_mid <= target_max:
            budget_fit_score = 1.0
        else:
            distance = min(abs(route_mid - target_min), abs(route_mid - target_max))
            budget_fit_score = max(0.1, 1.0 - (distance / 5000.0))

        duration_hours = _parse_duration_hours(route.get("duration", ""))
        travel_time_score = max(0.1, 1.0 - (duration_hours / 24.0))
        
        temple_priority_score = min(1.0, 0.3 + (schedules_count / 10.0))
        nearby_places_score = min(1.0, 0.2 + (nearby_places_count / 8.0))

        # Core composite scalar function mapping
        final_score = (
            0.40 * budget_fit_score +
            0.30 * travel_time_score +
            0.20 * temple_priority_score +
            0.10 * nearby_places_score
        )
        
        scored_results.append({
            "route": route,
            "score": round(final_score * 100)
        })

    if not scored_results:
        return None, 50
        
    best_option = max(scored_results, key=lambda x: x["score"])
    return best_option["route"], best_option["score"]

def _generate_smart_insights(temple, budget_type, chosen_route):
    mode = chosen_route.get("travel_mode", "").lower() if chosen_route else "bus"
    
    if budget_type == "low":
        smart_tip = "Book darshan early and prefer the lowest-cost train or bus option."
        travel_reason = f"Optimized via {mode} transport to match budget limits while preserving a structured route timeline."
    elif budget_type in {"premium", "high"}:
        smart_tip = "Choose comfortable travel, reserve premium slots early, and plan for a smoother darshan."
        travel_reason = "Premium allocation prioritizing reduced transit latency and maximum transit comfort parameters."
    else:
        smart_tip = "Balance comfort and savings by booking transport in advance and aligning with the best visit window."
        travel_reason = "Balanced routing optimized for intermediate financial bands and reliable arrival windows."

    if "train" in mode and budget_type == "low":
        smart_tip = "Prefer train under low budget networks and arrange early morning darshan transitions."

    nearby_count = Place.query.filter_by(temple_id=temple.temple_id).count()
    if nearby_count >= 3:
        smart_tip += " Visit nearby temples together to maximize your journey itinerary footprint."

    return travel_reason, smart_tip

def build_ai_recommendation_node(temple, budget_type, routes):
    if not routes:
        return {
            "recommended_route": "Bus / Train",
            "estimated_budget": "₹3000",
            "travel_reason": "Fallback default planning recommendation profile applied.",
            "smart_tip": "Book darshan slots early to mitigate layout validation wait times.",
            "best_visit_time": temple.best_visit_time or "Early Morning",
            "confidence_score": "75%"
        }

    chosen_route, calculated_score = _calculate_scores(temple, budget_type, routes)
    travel_reason, smart_tip = _generate_smart_insights(temple, budget_type, chosen_route)

    # Fetch contextual target budget baseline limits
    budgets = Budget.query.filter_by(temple_id=temple.temple_id).all()
    matched_budget = next((b for b in budgets if b.budget_type.lower() == budget_type), None)
    if not matched_budget and budgets:
        matched_budget = budgets[0]

    if matched_budget:
        estimated_budget = f" can range from ₹{matched_budget.min_cost} to ₹{matched_budget.max_cost}"
        display_cost = f"₹{math.ceil((matched_budget.min_cost + matched_budget.max_cost) / 2)}"
    else:
        display_cost = "₹3500"
        estimated_budget = " matches baseline metrics"

    # Append structural string mappings to map accurately with the UI template expectations
    smart_tip_formatted = f"{smart_tip} Budget fit: {budget_type.upper()} ({estimated_budget.replace(' can range from ', '')})."

    return {
        "recommended_route": chosen_route.get("travel_mode", "Train") if chosen_route else "Train",
        "estimated_budget": display_cost,
        "travel_reason": travel_reason,
        "smart_tip": smart_tip_formatted,
        "best_visit_time": temple.best_visit_time or "Early Morning",
        "confidence_score": f"{calculated_score}%"
    }

def build_recommendation(payload):
    # Backward compatibility with baseline route endpoint queries
    from services.planner_service import _resolve_temple, _normalize_budget_type
    from services.temple_service import get_routes_for_temple

    temple = _resolve_temple(payload.get("temple") or payload.get("temple_id"))
    if not temple:
        return None

    budget_type = _normalize_budget_type(payload.get("budget")) or "low"
    routes = get_routes_for_temple(temple)
    
    ai_node = build_ai_recommendation_node(temple, budget_type, routes)

    # Resolve active raw single reference targets for legacy compatibility
    budgets = Budget.query.filter_by(temple_id=temple.temple_id).all()
    budget_choice = next((b for b in budgets if b.budget_type.lower() == budget_type), None) or (budgets[0] if budgets else None)

    return {
        "temple": temple.temple_name,
        "recommended_route": ai_node["recommended_route"],
        "estimated_budget": ai_node["estimated_budget"].replace("₹", ""),
        "best_time": ai_node["best_visit_time"],
        "travel_tip": ai_node["smart_tip"],
        "ai_recommendation": ai_node,
        "route_details": routes[0] if routes else None,
        "budget_details": {
            "budget_id": budget_choice.budget_id,
            "budget_type": budget_choice.budget_type,
            "min_cost": budget_choice.min_cost,
            "max_cost": budget_choice.max_cost,
            "persons": budget_choice.persons,
            "days": budget_choice.days,
            "includes": budget_choice.includes,
        } if budget_choice else None
    }