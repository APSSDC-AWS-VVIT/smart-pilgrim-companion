import re

from models.temple import Temple
from models.budget import Budget
from models.schedule import Schedule
from models.place import Place
from models.route import Route


def _normalize_text(value):
    if not value:
        return ""
    return re.sub(r"[^a-z0-9]+", "", str(value).lower())


def _temple_aliases(temple):
    aliases = {
        _normalize_text(temple.temple_name),
        _normalize_text(temple.district),
        _normalize_text(temple.location),
        _normalize_text(temple.state),
    }
    return {alias for alias in aliases if alias}


def _matches_aliases(text, aliases):
    normalized_text = _normalize_text(text)
    return any(alias in normalized_text or normalized_text in alias for alias in aliases)


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


def _serialize_schedule(schedule):
    return {
        "schedule_id": schedule.schedule_id,
        "activity": schedule.activity,
        "start_time": schedule.start_time,
        "end_time": schedule.end_time,
        "notes": schedule.notes,
    }


def _serialize_place(place):
    return {
        "place_id": place.place_id,
        "place_name": place.place_name,
        "place_type": place.place_type,
        "distance_from_temple": place.distance_from_temple,
        "description": place.description,
    }


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


def serialize_temples(temples):
    return [
        {
            "temple_id": temple.temple_id,
            "temple_name": temple.temple_name,
            "state": temple.state,
            "district": temple.district,
            "location": temple.location,
            "description": temple.description,
            "history": temple.history,
            "opening_time": temple.opening_time,
            "closing_time": temple.closing_time,
            "best_visit_time": temple.best_visit_time,
            "speciality": temple.speciality,
            "contact_info": temple.contact_info,
            "website": temple.website,
            "notes": temple.notes,
        }
        for temple in temples
    ]


def get_all_temples():
    return Temple.query.order_by(Temple.temple_name.asc()).all()


def get_temple_by_id_or_name(identifier):
    if not identifier:
        return None

    normalized_identifier = identifier.strip()
    exact_match = Temple.query.filter(
        (Temple.temple_id.ilike(normalized_identifier)) | (Temple.temple_name.ilike(normalized_identifier))
    ).first()
    if exact_match:
        return exact_match

    wildcard = f"%{normalized_identifier}%"
    return Temple.query.filter(
        (Temple.temple_id.ilike(wildcard))
        | (Temple.temple_name.ilike(wildcard))
        | (Temple.district.ilike(wildcard))
        | (Temple.location.ilike(wildcard))
        | (Temple.description.ilike(wildcard))
    ).first()


def search_temples(query):
    wildcard = f"%{query}%"
    return Temple.query.filter(
        (Temple.temple_name.ilike(wildcard))
        | (Temple.district.ilike(wildcard))
        | (Temple.location.ilike(wildcard))
        | (Temple.description.ilike(wildcard))
        | (Temple.history.ilike(wildcard))
        | (Temple.speciality.ilike(wildcard))
    ).order_by(Temple.temple_name.asc()).all()


def get_all_routes():
    return Route.query.order_by(Route.route_id.asc()).all()


def get_all_budgets():
    return Budget.query.order_by(Budget.budget_id.asc()).all()


def get_all_schedules():
    return Schedule.query.order_by(Schedule.schedule_id.asc()).all()


def get_nearby_places(temple_id):
    return Place.query.filter_by(temple_id=temple_id).order_by(Place.place_id.asc()).all()


def get_places_for_temple(temple_id):
    return [
        _serialize_place(place)
        for place in get_nearby_places(temple_id)
    ]


def get_budgets_for_temple(temple_id):
    return [
        _serialize_budget(budget)
        for budget in Budget.query.filter_by(temple_id=temple_id).order_by(Budget.min_cost.asc()).all()
    ]


def get_schedules_for_temple(temple_id):
    return [
        _serialize_schedule(schedule)
        for schedule in Schedule.query.filter_by(temple_id=temple_id).order_by(Schedule.schedule_id.asc()).all()
    ]


def get_routes_for_temple(temple):
    if not temple:
        return []

    aliases = _temple_aliases(temple)
    routes = Route.query.order_by(Route.route_id.asc()).all()
    matched_routes = [
        route
        for route in routes
        if _matches_aliases(route.source, aliases)
        or _matches_aliases(route.destination, aliases)
        or _matches_aliases(route.notes, aliases)
    ]
    if matched_routes:
        return [_serialize_route(route) for route in matched_routes]

    return [_serialize_route(route) for route in routes if _matches_aliases(route.destination, aliases)]


def serialize_budgets(budgets):
    return [_serialize_budget(budget) for budget in budgets]


def serialize_routes(routes):
    return [_serialize_route(route) for route in routes]


def serialize_schedules(schedules):
    return [_serialize_schedule(schedule) for schedule in schedules]


def serialize_places(places):
    return [_serialize_place(place) for place in places]
