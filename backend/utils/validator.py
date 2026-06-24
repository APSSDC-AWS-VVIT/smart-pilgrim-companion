from collections import Counter, defaultdict
from datetime import datetime
import re

from models.budget import Budget
from models.place import Place
from models.route import Route
from models.schedule import Schedule
from models.temple import Temple


def _has_value(value):
    return value is not None and str(value).strip() != ""


def _parse_time_to_minutes(value):
    if not _has_value(value):
        return None
    cleaned = str(value).strip().upper().replace(".", "")
    for fmt in ("%I:%M %p", "%I %p"):
        try:
            parsed = datetime.strptime(cleaned, fmt)
            return parsed.hour * 60 + parsed.minute
        except ValueError:
            continue
    return None


def _parse_cost_range(cost_text):
    if not _has_value(cost_text):
        return None
    numbers = [int(token.replace(",", "")) for token in re.findall(r"\d[\d,]*", str(cost_text))]
    if not numbers:
        return None
    return min(numbers), max(numbers)


def _extract_day_key(notes):
    if not _has_value(notes):
        return "default"
    match = re.search(r"Day\s*(\d+)", str(notes), re.IGNORECASE)
    if match:
        return f"day-{match.group(1)}"
    return str(notes).strip().lower()[:40] or "default"


def _check_missing_values(rows, fields, label, errors):
    for row in rows:
        for field in fields:
            if not _has_value(getattr(row, field, None)):
                errors.append(f"{label} {getattr(row, label[:-1] + '_id', getattr(row, 'temple_id', 'row'))} is missing {field}")


def _check_duplicates(rows, key, label, errors):
    counts = Counter(getattr(row, key) for row in rows)
    for value, count in counts.items():
        if count > 1:
            errors.append(f"Duplicate {label} detected for {value}")


def build_validation_report():
    errors = []

    temples = Temple.query.all()
    budgets = Budget.query.all()
    routes = Route.query.all()
    schedules = Schedule.query.all()
    places = Place.query.all()

    _check_missing_values(temples, ["temple_id", "temple_name", "state", "district", "location", "description"], "temples", errors)
    _check_missing_values(routes, ["route_id", "source", "destination", "travel_mode", "duration"], "routes", errors)
    _check_missing_values(budgets, ["budget_id", "temple_id", "budget_type", "min_cost", "max_cost", "persons", "days"], "budgets", errors)
    _check_missing_values(schedules, ["schedule_id", "temple_id", "activity", "start_time", "end_time"], "schedules", errors)
    _check_missing_values(places, ["place_id", "temple_id", "place_name", "place_type"], "places", errors)

    _check_duplicates(temples, "temple_id", "temple", errors)
    _check_duplicates(routes, "route_id", "route", errors)
    _check_duplicates(budgets, "budget_id", "budget", errors)
    _check_duplicates(schedules, "schedule_id", "schedule", errors)
    _check_duplicates(places, "place_id", "place", errors)

    temple_ids = {temple.temple_id for temple in temples}
    for budget in budgets:
        if budget.temple_id not in temple_ids:
            errors.append(f"Budget {budget.budget_id} references unknown temple {budget.temple_id}")
        if budget.min_cost < 0 or budget.max_cost < 0 or budget.min_cost > budget.max_cost:
            errors.append(f"Budget {budget.budget_id} has invalid cost range")

    for schedule in schedules:
        if schedule.temple_id not in temple_ids:
            errors.append(f"Schedule {schedule.schedule_id} references unknown temple {schedule.temple_id}")

    for place in places:
        if place.temple_id not in temple_ids:
            errors.append(f"Place {place.place_id} references unknown temple {place.temple_id}")

    for route in routes:
        cost_range = _parse_cost_range(route.estimated_cost)
        if route.estimated_cost and cost_range is None:
            errors.append(f"Route {route.route_id} has invalid estimated cost")
        elif cost_range and cost_range[0] > cost_range[1]:
            errors.append(f"Route {route.route_id} has invalid cost range")

    schedules_by_temple = defaultdict(list)
    for schedule in schedules:
        start = _parse_time_to_minutes(schedule.start_time)
        end = _parse_time_to_minutes(schedule.end_time)
        if start is None or end is None:
            errors.append(f"Schedule {schedule.schedule_id} has invalid time format")
            continue
        schedules_by_temple[(schedule.temple_id, _extract_day_key(schedule.notes))].append((schedule, start, end))

    for (temple_id, day_key), temple_schedules in schedules_by_temple.items():
        temple_schedules.sort(key=lambda item: item[1])
        previous_end = None
        for schedule, start, end in temple_schedules:
            if previous_end is not None and start < previous_end:
                errors.append(f"Schedule overlap detected for temple {temple_id} on {day_key}")
            previous_end = max(previous_end or 0, end)

    return {
        "status": "healthy" if not errors else "unhealthy",
        "errors": errors,
    }