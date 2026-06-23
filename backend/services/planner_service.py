from models.budget import Budget
from models.place import Place
from models.route import Route
from models.schedule import Schedule
from models.temple import Temple


def get_planner_payload(temple_id):
    temple = Temple.query.filter_by(temple_id=temple_id).first()
    if not temple:
        return None
    return {
        "temple": {
            "temple_id": temple.temple_id,
            "temple_name": temple.temple_name,
            "state": temple.state,
            "district": temple.district,
            "location": temple.location,
            "description": temple.description,
        },
        "budgets": [
            {
                "budget_id": budget.budget_id,
                "budget_type": budget.budget_type,
                "min_cost": budget.min_cost,
                "max_cost": budget.max_cost,
                "persons": budget.persons,
                "days": budget.days,
                "includes": budget.includes,
            }
            for budget in Budget.query.filter_by(temple_id=temple_id).order_by(Budget.min_cost.asc()).all()
        ],
        "schedules": [
            {
                "schedule_id": schedule.schedule_id,
                "activity": schedule.activity,
                "start_time": schedule.start_time,
                "end_time": schedule.end_time,
                "notes": schedule.notes,
            }
            for schedule in Schedule.query.filter_by(temple_id=temple_id).order_by(Schedule.schedule_id.asc()).all()
        ],
        "places": [
            {
                "place_id": place.place_id,
                "place_name": place.place_name,
                "place_type": place.place_type,
                "distance_from_temple": place.distance_from_temple,
                "description": place.description,
            }
            for place in Place.query.filter_by(temple_id=temple_id).order_by(Place.place_id.asc()).all()
        ],
        "routes": [
            {
                "route_id": route.route_id,
                "source": route.source,
                "destination": route.destination,
                "travel_mode": route.travel_mode,
                "duration": route.duration,
                "estimated_cost": route.estimated_cost,
                "notes": route.notes,
            }
            for route in Route.query.filter(Route.destination.ilike(temple.temple_name)).order_by(Route.route_id.asc()).all()
        ],
    }
