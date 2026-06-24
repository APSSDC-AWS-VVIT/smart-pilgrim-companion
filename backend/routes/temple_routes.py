from flask import Blueprint, jsonify, request

from models.budget import Budget
from models.place import Place
from models.schedule import Schedule
from models.temple import Temple
from services.analytics_service import build_analytics
from services.planner_service import get_planner_payload
from services.recommendation_engine import build_recommendation
from services.search_service import search_everything
from services.temple_service import (
    get_all_routes,
    get_all_temples,
    get_nearby_places,
    get_temple_by_id_or_name,
    get_routes_for_temple,
    serialize_temples,
)
from utils.response import error_response, success_response
from utils.validator import build_validation_report


temple_bp = Blueprint("temple_bp", __name__)


@temple_bp.route("/temples", methods=["GET"])
@temple_bp.route("/temples/", methods=["GET"])
def temples():
    temples_list = get_all_temples()
    return success_response(serialize_temples(temples_list), "temples fetched")


@temple_bp.route("/temples/<string:identifier>", methods=["GET"])
def temple_detail(identifier):
    temple = get_temple_by_id_or_name(identifier)
    if not temple:
        return error_response("temple not found", 404)
    payload = serialize_temples([temple])[0]
    payload["budgets"] = [
        {
            "budget_id": budget.budget_id,
            "budget_type": budget.budget_type,
            "min_cost": budget.min_cost,
            "max_cost": budget.max_cost,
            "persons": budget.persons,
            "days": budget.days,
            "includes": budget.includes,
        }
        for budget in Budget.query.filter_by(temple_id=temple.temple_id).order_by(Budget.min_cost.asc()).all()
    ]
    payload["schedules"] = [
        {
            "schedule_id": schedule.schedule_id,
            "activity": schedule.activity,
            "start_time": schedule.start_time,
            "end_time": schedule.end_time,
            "notes": schedule.notes,
        }
        for schedule in Schedule.query.filter_by(temple_id=temple.temple_id).order_by(Schedule.schedule_id.asc()).all()
    ]
    payload["places"] = [
        {
            "place_id": place.place_id,
            "place_name": place.place_name,
            "place_type": place.place_type,
            "distance_from_temple": place.distance_from_temple,
            "description": place.description,
        }
        for place in Place.query.filter_by(temple_id=temple.temple_id).order_by(Place.place_id.asc()).all()
    ]
    return success_response(payload, "temple fetched")


@temple_bp.route("/routes", methods=["GET"])
def routes():
    routes_list = get_all_routes()
    data = [
        {
            "route_id": route.route_id,
            "source": route.source,
            "destination": route.destination,
            "travel_mode": route.travel_mode,
            "duration": route.duration,
            "estimated_cost": route.estimated_cost,
            "notes": route.notes,
        }
        for route in routes_list
    ]
    return success_response(data, "routes fetched")


@temple_bp.route("/budgets", methods=["GET"])
def budgets():
    temple_id = request.args.get("temple_id")
    min_cost = request.args.get("min_cost", type=int)
    max_cost = request.args.get("max_cost", type=int)

    query = Budget.query
    if temple_id:
        query = query.filter_by(temple_id=temple_id)
    if min_cost is not None:
        query = query.filter(Budget.min_cost >= min_cost)
    if max_cost is not None:
        query = query.filter(Budget.max_cost <= max_cost)

    data = [
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
        for budget in query.order_by(Budget.budget_id.asc()).all()
    ]
    return success_response(data, "budgets fetched")


@temple_bp.route("/schedules", methods=["GET"])
def schedules():
    temple_id = request.args.get("temple_id")
    query = Schedule.query
    if temple_id:
        query = query.filter_by(temple_id=temple_id)
    data = [
        {
            "schedule_id": schedule.schedule_id,
            "temple_id": schedule.temple_id,
            "activity": schedule.activity,
            "start_time": schedule.start_time,
            "end_time": schedule.end_time,
            "notes": schedule.notes,
        }
        for schedule in query.order_by(Schedule.schedule_id.asc()).all()
    ]
    return success_response(data, "schedules fetched")


@temple_bp.route("/search", methods=["GET"])
def search():
    query_text = request.args.get("q", "").strip()
    if not query_text:
        return success_response({"temple": {}, "routes": [], "places": [], "schedules": []}, "search query missing")
    return success_response(search_everything(query_text), "search completed")


@temple_bp.route("/planner", methods=["GET"])
def planner():
    temple_identifier = request.args.get("temple") or request.args.get("temple_id")
    if not temple_identifier:
        return error_response("temple is required", 400)
    payload = get_planner_payload(
        temple_identifier,
        days=request.args.get("days"),
        budget_type=request.args.get("budget"),
        persons=request.args.get("persons"),
    )
    if not payload:
        return error_response("temple not found", 404)
    return success_response(payload, "planner data fetched")


@temple_bp.route("/recommendation", methods=["GET"])
def recommendation():
    payload = build_recommendation({
        "temple": request.args.get("temple") or request.args.get("temple_id"),
        "days": request.args.get("days"),
        "budget": request.args.get("budget"),
        "persons": request.args.get("persons"),
    })
    if not payload:
        return error_response("temple not found", 404)
    return success_response(payload, "recommendation generated")


@temple_bp.route("/rank", methods=["GET"])
def rank():
    temples = get_all_temples()
    max_budget_count = max((Budget.query.filter_by(temple_id=temple.temple_id).count() for temple in temples), default=1)
    max_schedule_count = max((Schedule.query.filter_by(temple_id=temple.temple_id).count() for temple in temples), default=1)
    max_route_count = max((len(get_routes_for_temple(temple)) for temple in temples), default=1)
    ranking = []
    for temple in temples:
        budget_count = Budget.query.filter_by(temple_id=temple.temple_id).count()
        schedule_count = Schedule.query.filter_by(temple_id=temple.temple_id).count()
        route_count = len(get_routes_for_temple(temple))
        place_count = len(get_nearby_places(temple.temple_id))
        score = round(
            (
                (budget_count / max_budget_count) * 0.30
                + (schedule_count / max_schedule_count) * 0.40
                + (route_count / max_route_count) * 0.30
            )
            * 100
        )
        ranking.append({"temple": temple.temple_name, "score": score, "breakdown": {"budget_fit": budget_count, "time_fit": schedule_count, "route_fit": route_count, "places": place_count}})
    ranking.sort(key=lambda item: (-item["score"], item["temple"]))
    return success_response({"ranking": ranking}, "rank calculated")


@temple_bp.route("/health", methods=["GET"])
def health():
    return jsonify(build_validation_report())


@temple_bp.route("/analytics", methods=["GET"])
def analytics():
    return success_response(build_analytics(), "analytics generated")