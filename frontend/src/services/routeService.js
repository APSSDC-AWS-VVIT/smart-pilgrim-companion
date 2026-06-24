import { requestJson } from './api';
import { normalizeRoute } from './mappers';

export async function getRoutes() {
  const response = await requestJson('/routes');
  return Array.isArray(response.data) ? response.data.map(normalizeRoute) : [];
}
