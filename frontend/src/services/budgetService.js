import { buildQueryString, requestJson } from './api';
import { normalizeBudget } from './mappers';

export async function getBudgets(filters = {}) {
  const response = await requestJson(`/budgets${buildQueryString(filters)}`);
  return Array.isArray(response.data) ? response.data.map(normalizeBudget) : [];
}

export async function getBudgetsForTemple(templeId, filters = {}) {
  return getBudgets({ temple_id: templeId, ...filters });
}
