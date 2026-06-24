import math

from models.budget import Budget
from models.temple import Temple
from services.planner_service import _normalize_budget_type, _parse_cost_range, _resolve_temple
from services.temple_service import get_routes_for_temple


def _select_budget(temple_id, days, persons, budget_type):
    budgets = Budget.query.filter_by(temple_id=temple_id).order_by(Budget.min_cost.asc()).all()
    if not budgets:
        return None

    if days is not None and persons is not None:
        for budget in budgets:
            if budget.days == days and budget.persons == persons and budget.budget_type.lower() == budget_type:
                return budget

    for budget in budgets:
        if budget.budget_type.lower() == budget_type:
            return budget

    return budgets[0]


def _choose_route(routes, budget_type):
    if not routes:
        return None

    scored_routes = []
    for route in routes:
        cost_range = _parse_cost_range(route.get("estimated_cost"))
        if cost_range is None:
            continue
        scored_routes.append((route, cost_range))

    if not scored_routes:
        return routes[0]

    if budget_type == "low":
        return min(scored_routes, key=lambda item: item[1][0])[0]
    if budget_type in {"premium", "high"}:
        preferred_modes = ["flight", "private car", "train + bus", "train"]
        for mode in preferred_modes:
            mode_matches = [item for item in scored_routes if mode in item[0].get("travel_mode", "").lower()]
            if mode_matches:
                return max(mode_matches, key=lambda item: item[1][1])[0]
        return max(scored_routes, key=lambda item: item[1][1])[0]

    midpoint = sum((cost_range[0] + cost_range[1]) / 2 for _, cost_range in scored_routes) / len(scored_routes)
    return min(scored_routes, key=lambda item: abs(((item[1][0] + item[1][1]) / 2) - midpoint))[0]


def _travel_tip(budget_type, temple):
    if budget_type == "low":
        return "Book darshan early and prefer the lowest-cost train or bus option."
    if budget_type in {"premium", "high"}:
        return "Choose comfortable travel, reserve premium slots early, and plan for a smoother darshan."
    return "Balance comfort and savings by booking transport in advance and aligning with the best visit window."


def build_recommendation(payload):
    temple = _resolve_temple(payload.get("temple") or payload.get("temple_id"))
    if not temple:
        return None

    try:
        days = int(payload.get("days")) if payload.get("days") is not None else None
    except (TypeError, ValueError):
        days = None

    try:
        persons = int(payload.get("persons")) if payload.get("persons") is not None else 1
    except (TypeError, ValueError):
        persons = 1

    budget_type = _normalize_budget_type(payload.get("budget")) or "medium"
    routes = get_routes_for_temple(temple)
    route_choice = _choose_route(routes, budget_type)
    budget_choice = _select_budget(temple.temple_id, days, persons, budget_type)

    if budget_choice:
        estimated_budget = str(math.ceil((budget_choice.min_cost + budget_choice.max_cost) / 2))
    else:
        estimated_budget = "0"

    recommended_route = route_choice.get("travel_mode") if route_choice else ""
    if not recommended_route and route_choice:
        recommended_route = route_choice.get("source", "")

    return {
        "temple": temple.temple_name,
        "recommended_route": recommended_route,
        "estimated_budget": estimated_budget,
        "best_time": temple.best_visit_time,
        "travel_tip": _travel_tip(budget_type, temple),
        "route_details": route_choice,
        "budget_details": {
            "budget_id": budget_choice.budget_id,
            "budget_type": budget_choice.budget_type,
            "min_cost": budget_choice.min_cost,
            "max_cost": budget_choice.max_cost,
            "persons": budget_choice.persons,
            "days": budget_choice.days,
            "includes": budget_choice.includes,
        }
        if budget_choice
        else None,
    }