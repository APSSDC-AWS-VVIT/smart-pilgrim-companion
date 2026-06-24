from collections import Counter
from statistics import mean
import re

from models.budget import Budget
from models.route import Route
from models.schedule import Schedule
from models.temple import Temple


def _parse_cost_range(cost_text):
    if not cost_text:
        return None
    numbers = [int(token.replace(",", "")) for token in re.findall(r"\d[\d,]*", str(cost_text))]
    if not numbers:
        return None
    return min(numbers), max(numbers)


def build_analytics():
    temples = Temple.query.order_by(Temple.temple_name.asc()).all()
    if not temples:
        return {"popular_temple": "", "avg_budget": "", "popular_route": ""}

    temple_scores = []
    for temple in temples:
        budget_count = Budget.query.filter_by(temple_id=temple.temple_id).count()
        schedule_count = Schedule.query.filter_by(temple_id=temple.temple_id).count()
        route_count = Route.query.filter(
            (Route.destination.ilike(f"%{temple.temple_name}%"))
            | (Route.destination.ilike(f"%{temple.district}%"))
            | (Route.source.ilike(f"%{temple.district}%"))
        ).count()
        temple_scores.append((temple.temple_name, budget_count + schedule_count + route_count))

    popular_temple = max(temple_scores, key=lambda item: (item[1], item[0]))[0]

    budget_values = [budget.min_cost for budget in Budget.query.order_by(Budget.budget_id.asc()).all()]
    avg_budget = f"₹{round(mean(budget_values))}" if budget_values else ""

    routes = Route.query.order_by(Route.route_id.asc()).all()
    mode_counts = Counter(route.travel_mode for route in routes)
    popular_mode = mode_counts.most_common(1)[0][0] if mode_counts else ""
    popular_mode_routes = [route for route in routes if route.travel_mode == popular_mode]
    best_route = None
    if popular_mode_routes:
        best_route = min(
            (
                (route, _parse_cost_range(route.estimated_cost))
                for route in popular_mode_routes
                if _parse_cost_range(route.estimated_cost) is not None
            ),
            key=lambda item: item[1][0],
            default=(popular_mode_routes[0], None),
        )[0]

    popular_route = ""
    if best_route:
        popular_route = f"{best_route.source} to {best_route.destination} via {best_route.travel_mode}"

    return {
        "popular_temple": popular_temple,
        "avg_budget": avg_budget,
        "popular_route": popular_route,
    }