import { buildQueryString, requestJson } from './api';
import { normalizeBudget, normalizePlace, normalizeRoute, normalizeSchedule, normalizeTemple } from './mappers';

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function deriveTimeline(steps) {
  const sourceSteps = safeArray(steps);
  const labels = ['Travel', 'Arrival', 'Darshan', 'Explore', 'Return'];

  return labels.map((label, index) => ({
    order: index + 1,
    title: label,
    detail: sourceSteps[index] || sourceSteps[sourceSteps.length - 1] || 'Generating best available pilgrimage plan…',
  }));
}

function formatMoney(minCost, maxCost) {
  if (minCost === undefined || maxCost === undefined) {
    return '';
  }

  return `₹${Number(minCost).toLocaleString('en-IN')} - ₹${Number(maxCost).toLocaleString('en-IN')}`;
}

function normalizePlannerResponse(response) {
  const data = response?.data || {};
  return {
    temple: data.temple_details ? normalizeTemple(data.temple_details) : null,
    templeName: data.temple_details?.temple_name || data.temple || '',
    bestTime: data.best_time || data.temple_details?.best_visit_time || '',
    estimatedBudget: data.estimated_budget || '',
    routes: safeArray(data.route).map((route) => normalizeRoute(route)),
    budgets: safeArray(data.budget).map((budget) => normalizeBudget(budget)),
    steps: safeArray(data.steps),
    // ✅ FIX 1: Capture the array from the backend payload response right here
    nearbyPlaces: safeArray(data.nearbyPlaces).map((place) => normalizePlace(place))
  };
}

export async function loadPlannerData({ templeId, temple, budgetType, days, persons = 1 }) {
  const templeRequest = temple ? Promise.resolve({ data: temple }) : requestJson(`/temples/${encodeURIComponent(templeId)}`);

  const [plannerResponse, recommendationResponse, templeResponse, routesResponse] = await Promise.all([
    requestJson(`/planner${buildQueryString({ temple: templeId, days, budget: budgetType, persons })}`),
    requestJson(`/recommendation${buildQueryString({ temple: templeId, days, budget: budgetType, persons })}`),
    templeRequest,
    requestJson('/routes'),
  ]);

  const planner = normalizePlannerResponse(plannerResponse);
  const recommendation = recommendationResponse?.data || {};
  const fetchedTemple = normalizeTemple(templeResponse.data);
  const allRoutes = safeArray(routesResponse.data).map((route) => normalizeRoute(route));
  const destinationHint = `${fetchedTemple?.name || ''} ${fetchedTemple?.district || ''} ${fetchedTemple?.location || ''}`.toLowerCase();
  const matchingRoutes = allRoutes.filter((route) => {
    const routeText = `${route.source} ${route.destination} ${route.notes} ${route.mode}`.toLowerCase();
    return routeText.includes(destinationHint) || route.destination === fetchedTemple?.district || route.destination === fetchedTemple?.name || route.destination === fetchedTemple?.location;
  });

  const selectedRoute = planner.routes[0] || normalizeRoute(recommendation.route_details || null) || matchingRoutes[0] || null;
  const selectedBudget = planner.budgets.find((budget) => budget.type === String(budgetType).toLowerCase()) || planner.budgets[0] || null;
  const timeline = deriveTimeline(planner.steps);

  return {
    temple: fetchedTemple,
    templeName: fetchedTemple?.name || planner.templeName || 'Temple',
    selectedRoute,
    routeOptions: matchingRoutes.length ? matchingRoutes : planner.routes,
    budgetOptions: planner.budgets,
    selectedBudget,
    estimatedBudget: recommendation.estimated_budget || planner.estimatedBudget || formatMoney(selectedBudget?.minCost, selectedBudget?.maxCost),
    bestTime: recommendation.best_time || planner.bestTime || fetchedTemple?.bestVisitTime || '',
    routeSummary: selectedRoute ? `${selectedRoute.source} to ${selectedRoute.destination} via ${selectedRoute.mode} (${selectedRoute.duration})` : 'Generating best available pilgrimage plan…',
    travelDuration: selectedRoute?.duration || '',
    travelCost: selectedRoute?.estimatedCost || '',
    recommendation,
    journeySteps: planner.steps,
    timeline,
    // ✅ FIX 2: Map the processed items directly from the normalized response object
    nearbyPlaces: planner.nearbyPlaces,
    schedules: safeArray(fetchedTemple?.schedules).map((schedule) => normalizeSchedule(schedule)),
    smartTips: [
      recommendation.travel_tip,
      fetchedTemple?.bestVisitTime ? `Best visit window: ${fetchedTemple.bestVisitTime}.` : '',
      selectedBudget ? `Budget fit: ${selectedBudget.type.toUpperCase()} (${formatMoney(selectedBudget.minCost, selectedBudget.maxCost)}).` : '',
    ].filter(Boolean),
    riskNotes: [
      'Book darshan early to reduce waiting time.',
      recommendation.travel_tip,
      selectedRoute?.notes ? `Route note: ${selectedRoute.notes}` : '',
    ].filter(Boolean),
    loadingMessage: 'Generating best available pilgrimage plan…',
  };
}