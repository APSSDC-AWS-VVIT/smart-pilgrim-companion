import { getBudgetMatch } from '../data/budgets';
import { getRoutesForTemple } from '../data/routes';
import { getScenarioForTemple } from '../data/scenarios';

export function buildSuggestedPlan(temple, budget, days) {
  if (!temple) {
    return null;
  }

  const scenario = getScenarioForTemple(temple.id);
  const routes = getRoutesForTemple(temple.id);
  const budgetMatch = getBudgetMatch(temple.id, days, budget.persons || 1);

  const routeSummary = routes.length
    ? `${routes[0].source} to ${routes[0].destination} via ${routes[0].mode} (${routes[0].duration})`
    : 'No route data available';

  return {
    templeName: temple.name,
    routeSummary,
    budgetSummary: budgetMatch ? `${budgetMatch.type} budget: ₹${budgetMatch.minCost} - ₹${budgetMatch.maxCost} for ${budgetMatch.persons} traveler(s) over ${budgetMatch.days} day(s)` : 'Budget data not available',
    scenario,
    travelOptions: routes.slice(0, 4),
  };
}