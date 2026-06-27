# from flask import Blueprint, jsonify, request
# from models.budget import Budget
# from models.place import Place
# from models.schedule import Schedule
# from models.temple import Temple
# from services.analytics_service import build_analytics, get_analytics_summary_data  # Clean explicit top-level import
# from services.planner_service import get_planner_payload
# from services.recommendation_engine import build_recommendation
# from services.search_service import search_everything
# from services.temple_service import (
#     get_all_routes,
#     get_all_temples,
#     get_nearby_places,
#     get_temple_by_id_or_name,
#     get_routes_for_temple,
#     serialize_temples,
# )
# from utils.response import error_response, success_response
# from utils.validator import build_validation_report

# temple_bp = Blueprint("temple_bp", __name__)

# @temple_bp.route("/temples", methods=["GET"])
# @temple_bp.route("/temples/", methods=["GET"])
# def temples():
#     temples_list = get_all_temples()
#     return success_response(serialize_temples(temples_list), "temples fetched")

# @temple_bp.route("/temples/<string:identifier>", methods=["GET"])
# def temple_detail(identifier):
#     temple = get_temple_by_id_or_name(identifier)
#     if not temple:
#         return error_response("temple not found", 404)
#     payload = serialize_temples([temple])[0]
#     payload["budgets"] = [_serialize_budget_item(b) for b in Budget.query.filter_by(temple_id=temple.temple_id).all()]
#     payload["schedules"] = [_serialize_schedule_item(s) for s in Schedule.query.filter_by(temple_id=temple.temple_id).all()]
#     payload["places"] = [_serialize_place_item(p) for p in Place.query.filter_by(temple_id=temple.temple_id).all()]
#     return success_response(payload, "temple fetched")

# def _serialize_budget_item(b):
#     return {"budget_id": b.budget_id, "budget_type": b.budget_type, "min_cost": b.min_cost, "max_cost": b.max_cost, "persons": b.persons, "days": b.days, "includes": b.includes}

# def _serialize_schedule_item(s):
#     return {"schedule_id": s.schedule_id, "activity": s.activity, "start_time": s.start_time, "end_time": s.end_time, "notes": s.notes}

# def _serialize_place_item(p):
#     return {"place_id": p.place_id, "place_name": p.place_name, "place_type": p.place_type, "distance_from_temple": p.distance_from_temple, "description": p.description}

# @temple_bp.route("/routes", methods=["GET"])
# def routes():
#     return success_response([
#         {"route_id": r.route_id, "source": r.source, "destination": r.destination, "travel_mode": r.travel_mode, "duration": r.duration, "estimated_cost": r.estimated_cost, "notes": r.notes}
#         for r in get_all_routes()
#     ], "routes fetched")

# @temple_bp.route("/budgets", methods=["GET"])
# def budgets():
#     query = Budget.query
#     if request.args.get("temple_id"):
#         query = query.filter_by(temple_id=request.args.get("temple_id"))
#     return success_response([_serialize_budget_item(b) for b in query.all()], "budgets fetched")

# @temple_bp.route("/schedules", methods=["GET"])
# def schedules():
#     query = Schedule.query
#     if request.args.get("temple_id"):
#         query = query.filter_by(temple_id=request.args.get("temple_id"))
#     return success_response([
#         {"schedule_id": s.schedule_id, "temple_id": s.temple_id, "activity": s.activity, "start_time": s.start_time, "end_time": s.end_time, "notes": s.notes}
#         for s in query.all()
#     ], "schedules fetched")

# @temple_bp.route("/search", methods=["GET"])
# def search():
#     query_text = request.args.get("q", "").strip()
#     if not query_text:
#         return success_response({"temple": {}, "routes": [], "places": [], "schedules": []}, "search query missing")
#     return success_response(search_everything(query_text), "search completed")

# @temple_bp.route("/planner", methods=["GET"])
# def planner():
#     temple_identifier = request.args.get("temple") or request.args.get("temple_id")
#     if not temple_identifier:
#         return error_response("temple is required", 400)
#     payload = get_planner_payload(
#         temple_identifier,
#         days=request.args.get("days"),
#         budget_type=request.args.get("budget"),
#         persons=request.args.get("persons"),
#     )
#     if not payload:
#         return error_response("temple not found", 404)
#     return success_response(payload, "planner data fetched")

# @temple_bp.route("/recommendation", methods=["GET"])
# def recommendation():
#     payload = build_recommendation({
#         "temple": request.args.get("temple") or request.args.get("temple_id"),
#         "days": request.args.get("days"),
#         "budget": request.args.get("budget"),
#         "persons": request.args.get("persons"),
#     })
#     if not payload:
#         return error_response("temple not found", 404)
#     return success_response(payload, "recommendation generated")

# @temple_bp.route("/rank", methods=["GET"])
# def rank():
#     temples = get_all_temples()
#     max_budget_count = max((Budget.query.filter_by(temple_id=t.temple_id).count() for t in temples), default=1)
#     max_schedule_count = max((Schedule.query.filter_by(temple_id=t.temple_id).count() for t in temples), default=1)
#     max_route_count = max((len(get_routes_for_temple(t)) for t in temples), default=1)
#     ranking = []
#     for temple in temples:
#         b_count = Budget.query.filter_by(temple_id=temple.temple_id).count()
#         s_count = Schedule.query.filter_by(temple_id=temple.temple_id).count()
#         r_count = len(get_routes_for_temple(temple))
#         p_count = len(get_nearby_places(temple.temple_id))
#         score = round(((b_count / max_budget_count) * 0.30 + (s_count / max_schedule_count) * 0.40 + (r_count / max_route_count) * 0.30) * 100)
#         ranking.append({"temple": temple.temple_name, "score": score, "breakdown": {"budget_fit": b_count, "time_fit": s_count, "route_fit": r_count, "places": p_count}})
#     ranking.sort(key=lambda item: (-item["score"], item["temple"]))
#     return success_response({"ranking": ranking}, "rank calculated")

# @temple_bp.route("/health", methods=["GET"])
# def health():
#     return jsonify(build_validation_report())

# @temple_bp.route("/analytics", methods=["GET"])
# def analytics():
#     return success_response(build_analytics(), "analytics generated")

# @temple_bp.route("/analytics/summary", methods=["GET"])
# def analytics_summary_route():  # Renamed to completely avoid namespace shadowing
#     data = get_analytics_summary_data()
#     return success_response(data, "analytics summary fetched")
from flask import Blueprint, jsonify, request
import time
from datetime import datetime
from models.budget import Budget
from models.place import Place
from models.schedule import Schedule
from models.temple import Temple
from services.analytics_service import build_analytics, get_analytics_summary_data
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

# Performance state storage
PERFORMANCE_METRICS = {
    "last_planner_generation_time_ms": 0,
    "last_recommendation_response_time_ms": 0,
    "last_api_response_time_ms": 0
}

@temple_bp.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy",
        "backend": "running",
        "planner": "available",
        "recommendation": "active",
        "analytics": "active",
        "timestamp": datetime.utcnow().isoformat() + "Z"
    })

@temple_bp.route("/temples", methods=["GET"])
@temple_bp.route("/temples/", methods=["GET"])
def temples():
    start_time = time.time()
    temples_list = get_all_temples()
    PERFORMANCE_METRICS["last_api_response_time_ms"] = int((time.time() - start_time) * 1000)
    return success_response(serialize_temples(temples_list), "temples fetched")

@temple_bp.route("/temples/<string:identifier>", methods=["GET"])
def temple_detail(identifier):
    start_time = time.time()
    temple = get_temple_by_id_or_name(identifier)
    if not temple:
        return error_response("temple not found", 404)
    payload = serialize_temples([temple])[0]
    payload["budgets"] = [_serialize_budget_item(b) for b in Budget.query.filter_by(temple_id=temple.temple_id).all()]
    payload["schedules"] = [_serialize_schedule_item(s) for s in Schedule.query.filter_by(temple_id=temple.temple_id).all()]
    payload["places"] = [_serialize_place_item(p) for p in Place.query.filter_by(temple_id=temple.temple_id).all()]
    PERFORMANCE_METRICS["last_api_response_time_ms"] = int((time.time() - start_time) * 1000)
    return success_response(payload, "temple fetched")

def _serialize_budget_item(b):
    return {"budget_id": b.budget_id, "budget_type": b.budget_type, "min_cost": b.min_cost, "max_cost": b.max_cost, "persons": b.persons, "days": b.days, "includes": b.includes}

def _serialize_schedule_item(s):
    return {"schedule_id": s.schedule_id, "activity": s.activity, "start_time": s.start_time, "end_time": s.end_time, "notes": s.notes}

def _serialize_place_item(p):
    return {"place_id": p.place_id, "place_name": p.place_name, "place_type": p.place_type, "distance_from_temple": p.distance_from_temple, "description": p.description}

@temple_bp.route("/routes", methods=["GET"])
def routes():
    return success_response([
        {"route_id": r.route_id, "source": r.source, "destination": r.destination, "travel_mode": r.travel_mode, "duration": r.duration, "estimated_cost": r.estimated_cost, "notes": r.notes}
        for r in get_all_routes()
    ], "routes fetched")

@temple_bp.route("/planner", methods=["GET"])
def planner():
    start_time = time.time()
    temple_identifier = request.args.get("temple") or request.args.get("temple_id")
    days_val = request.args.get("days")
    budget_val = request.args.get("budget")

    # API Validation Rules Matrix
    if not temple_identifier:
        return jsonify({"status": "error", "message": "Temple selection is required"}), 400
    
    if days_val is not None:
        try:
            if int(days_val) <= 0:
                return jsonify({"status": "error", "message": "Days parameter must be greater than 0"}), 400
        except ValueError:
            return jsonify({"status": "error", "message": "Invalid configuration value for days parameter"}), 400

    if budget_val and str(budget_val).lower() not in ["low", "medium", "premium", "high"]:
        return jsonify({"status": "error", "message": "Invalid budget selection"}), 400

    payload = get_planner_payload(
        temple_identifier,
        days=days_val,
        budget_type=budget_val,
        persons=request.args.get("persons"),
    )
    if not payload:
        return jsonify({"status": "error", "message": "Selected temple destination not found in database records"}), 404

    duration_ms = int((time.time() - start_time) * 1000)
    PERFORMANCE_METRICS["last_planner_generation_time_ms"] = duration_ms
    PERFORMANCE_METRICS["last_api_response_time_ms"] = duration_ms
    return success_response(payload, "planner data fetched")

@temple_bp.route("/recommendation", methods=["GET"])
def recommendation():
    start_time = time.time()
    payload = build_recommendation({
        "temple": request.args.get("temple") or request.args.get("temple_id"),
        "days": request.args.get("days"),
        "budget": request.args.get("budget"),
        "persons": request.args.get("persons"),
    })
    if not payload:
        return error_response("temple not found", 404)

    duration_ms = int((time.time() - start_time) * 1000)
    PERFORMANCE_METRICS["last_recommendation_response_time_ms"] = duration_ms
    PERFORMANCE_METRICS["last_api_response_time_ms"] = duration_ms
    return success_response(payload, "recommendation generated")

@temple_bp.route("/performance", methods=["GET"])
def performance_metrics():
    return jsonify({"status": "success", "metrics": PERFORMANCE_METRICS})

@temple_bp.route("/analytics/summary", methods=["GET"])
def analytics_summary_route():
    data = get_analytics_summary_data()
    return success_response(data, "analytics summary fetched")