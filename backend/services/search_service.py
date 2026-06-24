from models.budget import Budget
from models.place import Place
from models.route import Route
from models.schedule import Schedule
from services.temple_service import (
    get_budgets_for_temple,
    get_places_for_temple,
    get_routes_for_temple,
    get_schedules_for_temple,
    get_temple_by_id_or_name,
    search_temples,
    serialize_temples,
)


def _serialize_route(route):
    return {
        "route_id": route.route_id,
        "source": route.source,
        "destination": route.destination,
        "travel_mode": route.travel_mode,
        "duration": route.duration,
        "estimated_cost": route.estimated_cost,
        "notes": route.notes,
    }


def _serialize_place(place):
    return {
        "place_id": place.place_id,
        "temple_id": place.temple_id,
        "place_name": place.place_name,
        "place_type": place.place_type,
        "distance_from_temple": place.distance_from_temple,
        "description": place.description,
    }


def _serialize_schedule(schedule):
    return {
        "schedule_id": schedule.schedule_id,
        "temple_id": schedule.temple_id,
        "activity": schedule.activity,
        "start_time": schedule.start_time,
        "end_time": schedule.end_time,
        "notes": schedule.notes,
    }


def _matches(query, *fields):
    normalized_query = query.lower()
    for field in fields:
        if field and normalized_query in str(field).lower():
            return True
    return False


def search_everything(query):
    query_text = (query or "").strip()
    if not query_text:
        return {"temple": {}, "routes": [], "places": [], "schedules": []}

    temple_matches = search_temples(query_text)
    temple = get_temple_by_id_or_name(query_text)
    if not temple and temple_matches:
        temple = temple_matches[0]

    route_matches = [
        _serialize_route(route)
        for route in Route.query.order_by(Route.route_id.asc()).all()
        if _matches(query_text, route.source, route.destination, route.travel_mode, route.duration, route.notes)
    ]

    place_matches = [
        _serialize_place(place)
        for place in Place.query.order_by(Place.place_id.asc()).all()
        if _matches(query_text, place.place_name, place.place_type, place.distance_from_temple, place.description)
    ]

    schedule_matches = [
        _serialize_schedule(schedule)
        for schedule in Schedule.query.order_by(Schedule.schedule_id.asc()).all()
        if _matches(query_text, schedule.activity, schedule.start_time, schedule.end_time, schedule.notes)
    ]

    temple_payload = serialize_temples([temple])[0] if temple else {}
    if not temple_payload and temple_matches:
        temple_payload = serialize_temples([temple_matches[0]])[0]

    if temple_payload:
        matched_temple = get_temple_by_id_or_name(temple_payload.get("temple_id"))
        if matched_temple:
            route_matches = get_routes_for_temple(matched_temple) + route_matches
            place_matches = get_places_for_temple(matched_temple.temple_id) + place_matches
            schedule_matches = get_schedules_for_temple(matched_temple.temple_id) + schedule_matches
            budget_matches = get_budgets_for_temple(matched_temple.temple_id)
        else:
            budget_matches = []
    else:
        budget_matches = []

    def _dedupe(items, key):
        seen = set()
        deduped = []
        for item in items:
            value = item.get(key)
            if value in seen:
                continue
            seen.add(value)
            deduped.append(item)
        return deduped

    return {
        "temple": temple_payload,
        "routes": _dedupe(route_matches, "route_id"),
        "places": _dedupe(place_matches, "place_id"),
        "schedules": _dedupe(schedule_matches, "schedule_id"),
        "budgets": budget_matches or [
            {
                "budget_id": budget.budget_id,
                "temple_id": budget.temple_id,
                "budget_type": budget.budget_type,
                "min_cost": budget.min_cost,
                "max_cost": budget.max_cost,
                "persons": budget.persons,
                "days": budget.days,
                "includes": budget.includes,
            }
            for budget in Budget.query.order_by(Budget.budget_id.asc()).all()
            if _matches(query_text, budget.budget_type, budget.includes)
        ],
    }