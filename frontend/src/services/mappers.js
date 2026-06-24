import { getTempleImage, templeImageSets } from '../data/imagePaths';

export function normalizeTemple(temple) {
  if (!temple) {
    return null;
  }

  const templeId = temple.temple_id;
  const imageSet = templeImageSets[templeId] || {};

  return {
    id: templeId,
    templeId,
    name: temple.temple_name,
    state: temple.state,
    district: temple.district,
    location: temple.location,
    description: temple.description,
    history: temple.history,
    openingTime: temple.opening_time,
    closingTime: temple.closing_time,
    bestVisitTime: temple.best_visit_time,
    speciality: temple.speciality,
    contactInfo: temple.contact_info,
    website: temple.website,
    notes: temple.notes,
    image: getTempleImage(templeId),
    gallery: imageSet.gallery || [],
  };
}

export function normalizeBudget(budget) {
  return {
    id: budget.budget_id,
    templeId: budget.temple_id,
    type: budget.budget_type,
    minCost: budget.min_cost,
    maxCost: budget.max_cost,
    persons: budget.persons,
    days: budget.days,
    includes: budget.includes,
  };
}

export function normalizeRoute(route) {
  return {
    id: route.route_id,
    source: route.source,
    destination: route.destination,
    templeId: route.destination,
    mode: route.travel_mode,
    duration: route.duration,
    estimatedCost: route.estimated_cost,
    notes: route.notes,
  };
}

export function normalizeSchedule(schedule) {
  return {
    id: schedule.schedule_id,
    templeId: schedule.temple_id,
    activity: schedule.activity,
    startTime: schedule.start_time,
    endTime: schedule.end_time,
    notes: schedule.notes,
  };
}

export function normalizePlace(place) {
  return {
    id: place.place_id,
    templeId: place.temple_id,
    name: place.place_name,
    type: place.place_type,
    distance: place.distance_from_temple,
    description: place.description,
  };
}
