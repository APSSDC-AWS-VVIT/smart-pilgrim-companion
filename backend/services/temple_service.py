from models.temple import Temple
from models.budget import Budget
from models.schedule import Schedule
from models.place import Place
from models.route import Route


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
    return Temple.query.filter(
        (Temple.temple_id.ilike(identifier)) | (Temple.temple_name.ilike(identifier))
    ).first()


def search_temples(query):
    return Temple.query.filter(Temple.temple_name.ilike(f"%{query}%")).order_by(Temple.temple_name.asc()).all()


def get_all_routes():
    return Route.query.order_by(Route.route_id.asc()).all()


def get_all_budgets():
    return Budget.query.order_by(Budget.budget_id.asc()).all()


def get_all_schedules():
    return Schedule.query.order_by(Schedule.schedule_id.asc()).all()


def get_nearby_places(temple_id):
    return Place.query.filter_by(temple_id=temple_id).order_by(Place.place_id.asc()).all()
