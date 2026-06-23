import { useMemo, useState } from 'react';
import PlannerCard from '../components/PlannerCard';
import SearchBar from '../components/SearchBar';
import { temples, budgets } from '../data';
import { buildSuggestedPlan } from '../services/plannerService';

const templeOptions = temples.map((temple) => ({ value: temple.id, label: temple.name }));

export default function TravelPlannerPage() {
  const [selectedTempleId, setSelectedTempleId] = useState('T001');
  const [budgetType, setBudgetType] = useState('low');
  const [days, setDays] = useState(3);
  const [search, setSearch] = useState('');

  const selectedTemple = useMemo(() => temples.find((temple) => temple.id === selectedTempleId) || temples[0], [selectedTempleId]);
  const persons = 1;

  const plan = useMemo(
    () => buildSuggestedPlan(selectedTemple, { type: budgetType, persons }, Number(days)),
    [budgetType, days, persons, selectedTemple],
  );

  const budgetBands = budgets.filter((item) => item.templeId === selectedTempleId);
  const matchingBudgets = budgetBands.filter((item) => item.type.includes(search.toLowerCase()) || String(item.persons).includes(search));

  return (
    <section className="section-shell py-12">
      <div className="max-w-3xl">
        <h1 className="section-title">Travel Planner</h1>
        <p className="section-copy">Use repository data to suggest routes, budgets, and temple journey steps for the selected pilgrimage.</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-amber-100 bg-white p-5 shadow-glow">
          <h2 className="display-font text-2xl font-bold text-temple-deep">Inputs</h2>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-600">Temple</span>
              <select value={selectedTempleId} onChange={(event) => setSelectedTempleId(event.target.value)} className="mt-2 w-full rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 outline-none focus:border-temple-gold">
                {templeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-600">Budget band</span>
              <select value={budgetType} onChange={(event) => setBudgetType(event.target.value)} className="mt-2 w-full rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 outline-none focus:border-temple-gold">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="premium">Premium</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-600">Days</span>
              <input type="number" min="1" max="7" value={days} onChange={(event) => setDays(Number(event.target.value))} className="mt-2 w-full rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 outline-none focus:border-temple-gold" />
            </label>

            <div className="rounded-2xl bg-amber-50 p-4 text-sm text-slate-700">
              Suggested plans currently use the CSV-backed budget bands and route table for the selected temple.
            </div>
          </div>
        </div>

        <PlannerCard plan={plan} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="section-title">Budget bands</h2>
          <div className="mt-4">
            <SearchBar value={search} onChange={setSearch} placeholder="Filter budget by type or travelers" />
          </div>
          <div className="mt-4 grid gap-3">
            {matchingBudgets.map((item) => (
              <div key={item.id} className="rounded-2xl border border-amber-100 bg-white p-4">
                <p className="font-semibold text-temple-deep">{item.type} · {item.persons} traveler(s)</p>
                <p className="mt-1 text-sm text-slate-600">₹{item.minCost.toLocaleString('en-IN')} - ₹{item.maxCost.toLocaleString('en-IN')} · {item.includes}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="section-title">Scenario fit</h2>
          <div className="mt-4 rounded-3xl border border-amber-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-temple-gold">Selected temple</p>
            <p className="mt-2 text-2xl font-semibold text-temple-deep">{selectedTemple.name}</p>
            <p className="mt-3 text-sm text-slate-600">This planner is aligned to the repository scenario content and can later connect to backend APIs without changing the UI layout.</p>
          </div>
        </div>
      </div>
    </section>
  );
}