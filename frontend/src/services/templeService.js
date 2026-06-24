import { buildQueryString, requestJson } from './api';
import { normalizeBudget, normalizePlace, normalizeSchedule, normalizeTemple } from './mappers';

function normalizeTempleDetail(payload) {
  const temple = normalizeTemple(payload);
  if (!temple) {
    return null;
  }

  return {
    ...temple,
    budgets: Array.isArray(payload.budgets) ? payload.budgets.map(normalizeBudget) : [],
    schedules: Array.isArray(payload.schedules) ? payload.schedules.map(normalizeSchedule) : [],
    places: Array.isArray(payload.places) ? payload.places.map(normalizePlace) : [],
  };
}

export async function getTemples() {
  const response = await requestJson('/temples');
  return Array.isArray(response.data) ? response.data.map(normalizeTemple) : [];
}

export async function getTempleById(templeId) {
  const response = await requestJson(`/temples/${encodeURIComponent(templeId)}`);
  return normalizeTempleDetail(response.data);
}

export async function getTemplesForQuery(query) {
  if (!query.trim()) {
    return getTemples();
  }

  const response = await requestJson(`/search${buildQueryString({ q: query })}`);
  const matches = Array.isArray(response.data) ? response.data : [];
  const matchedIds = new Set(matches.map((item) => item.temple_id).filter(Boolean));

  const temples = await getTemples();
  return temples.filter((temple) => matchedIds.has(temple.id));
}

export async function searchTemples(query) {
  const response = await requestJson(`/search${buildQueryString({ q: query })}`);
  return Array.isArray(response.data) ? response.data : [];
}
