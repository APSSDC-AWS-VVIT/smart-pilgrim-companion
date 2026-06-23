const rawBudgets = [
  { budget_id: 'B001', temple_id: 'T001', budget_type: 'low', min_cost: 3400, max_cost: 4500, persons: 1, days: 3, includes: 'Complete pilgrimage' },
  { budget_id: 'B002', temple_id: 'T001', budget_type: 'medium', min_cost: 9000, max_cost: 12000, persons: 1, days: 3, includes: 'Complete pilgrimage' },
  { budget_id: 'B003', temple_id: 'T001', budget_type: 'premium', min_cost: 27000, max_cost: 40000, persons: 1, days: 3, includes: 'Complete pilgrimage' },
  { budget_id: 'B004', temple_id: 'T001', budget_type: 'low', min_cost: 7000, max_cost: 9000, persons: 2, days: 3, includes: 'Couple budget' },
  { budget_id: 'B005', temple_id: 'T001', budget_type: 'medium', min_cost: 18000, max_cost: 24000, persons: 2, days: 3, includes: 'Couple budget' },
  { budget_id: 'B006', temple_id: 'T001', budget_type: 'premium', min_cost: 50000, max_cost: 75000, persons: 2, days: 3, includes: 'Couple budget' },
  { budget_id: 'B007', temple_id: 'T001', budget_type: 'low', min_cost: 14000, max_cost: 18000, persons: 4, days: 3, includes: 'Family budget' },
  { budget_id: 'B008', temple_id: 'T001', budget_type: 'medium', min_cost: 35000, max_cost: 48000, persons: 4, days: 3, includes: 'Family budget' },
  { budget_id: 'B009', temple_id: 'T001', budget_type: 'premium', min_cost: 90000, max_cost: 150000, persons: 4, days: 3, includes: 'Family budget' },
  { budget_id: 'B010', temple_id: 'T002', budget_type: 'low', min_cost: 1020, max_cost: 1200, persons: 1, days: 2, includes: 'Complete pilgrimage' },
  { budget_id: 'B011', temple_id: 'T002', budget_type: 'medium', min_cost: 4120, max_cost: 5300, persons: 1, days: 2, includes: 'Complete pilgrimage' },
  { budget_id: 'B012', temple_id: 'T002', budget_type: 'premium', min_cost: 12120, max_cost: 14100, persons: 1, days: 2, includes: 'Complete pilgrimage' },
  { budget_id: 'B013', temple_id: 'T003', budget_type: 'low', min_cost: 1250, max_cost: 1450, persons: 1, days: 2, includes: 'Travel, accommodation, transit, puja, food' },
  { budget_id: 'B014', temple_id: 'T003', budget_type: 'medium', min_cost: 5000, max_cost: 6000, persons: 1, days: 2, includes: 'Travel, accommodation, transit, puja, food' },
  { budget_id: 'B015', temple_id: 'T003', budget_type: 'premium', min_cost: 11910, max_cost: 13910, persons: 1, days: 2, includes: 'Travel, accommodation, transit, puja, food' },
  { budget_id: 'B016', temple_id: 'T003', budget_type: 'low', min_cost: 2500, max_cost: 2900, persons: 2, days: 2, includes: 'Couple budget' },
  { budget_id: 'B017', temple_id: 'T003', budget_type: 'medium', min_cost: 9500, max_cost: 11500, persons: 2, days: 2, includes: 'Couple budget' },
  { budget_id: 'B018', temple_id: 'T003', budget_type: 'premium', min_cost: 22000, max_cost: 26000, persons: 2, days: 2, includes: 'Couple budget' },
  { budget_id: 'B019', temple_id: 'T003', budget_type: 'low', min_cost: 5000, max_cost: 5800, persons: 4, days: 2, includes: 'Family budget' },
  { budget_id: 'B020', temple_id: 'T003', budget_type: 'medium', min_cost: 18000, max_cost: 22000, persons: 4, days: 2, includes: 'Family budget' },
  { budget_id: 'B021', temple_id: 'T003', budget_type: 'premium', min_cost: 42000, max_cost: 52000, persons: 4, days: 2, includes: 'Family budget' },
];

export const budgets = rawBudgets.map((budget) => ({
  id: budget.budget_id,
  templeId: budget.temple_id,
  type: budget.budget_type,
  minCost: budget.min_cost,
  maxCost: budget.max_cost,
  persons: budget.persons,
  days: budget.days,
  includes: budget.includes,
}));

export function getBudgetsForTemple(templeId) {
  return budgets.filter((budget) => budget.templeId === templeId);
}

export function getBudgetMatch(templeId, days, persons) {
  const exact = budgets.find(
    (budget) => budget.templeId === templeId && budget.days === Number(days) && budget.persons === Number(persons),
  );

  if (exact) {
    return exact;
  }

  return budgets.find((budget) => budget.templeId === templeId) || null;
}