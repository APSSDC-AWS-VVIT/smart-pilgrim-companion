import { useEffect, useMemo, useState } from 'react';
import PlannerCard from '../components/PlannerCard';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { buildSuggestedPlan } from '../services/plannerService';
import { getTemples } from '../services/templeService';

export default function TravelPlannerPage() {
  const [selectedTempleId, setSelectedTempleId] = useState('T001');
  const [budgetType, setBudgetType] = useState('low');
  const [days, setDays] = useState(3);
  const [search, setSearch] = useState('');
  const [temples, setTemples] = useState([]);
  const [plan, setPlan] = useState(null);
  const [loadingTemples, setLoadingTemples] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadTemples() {
      setLoadingTemples(true);

      try {
        const results = await getTemples();
        if (active) {
          setTemples(results);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load temple options.');
        }
      } finally {
        if (active) {
          setLoadingTemples(false);
        }
      }
    }

    loadTemples();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadPlan() {
      setLoadingPlan(true);
      setError('');

      try {
        const result = await buildSuggestedPlan(selectedTempleId, { type: budgetType, persons: 1 }, Number(days));
        if (active) {
          setPlan(result);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to build a plan.');
          setPlan(null);
        }
      } finally {
        if (active) {
          setLoadingPlan(false);
        }
      }
    }

    loadPlan();

    return () => {
      active = false;
    };
  }, [selectedTempleId, budgetType, days]);

  const templeOptions = useMemo(() => temples.map((temple) => ({ value: temple.id, label: temple.name })), [temples]);
  const selectedTemple = useMemo(() => temples.find((temple) => temple.id === selectedTempleId) || temples[0], [temples, selectedTempleId]);
  const budgetBands = plan?.budgets || [];
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
              {loadingTemples ? <div className="mt-2"><Loader /></div> : (
                <select value={selectedTempleId} onChange={(event) => setSelectedTempleId(event.target.value)} className="mt-2 w-full rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 outline-none focus:border-temple-gold">
                  {templeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              )}
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
              Suggested plans now use the backend planner API for the selected temple.
            </div>
          </div>
        </div>

        {loadingPlan ? <Loader /> : <PlannerCard plan={plan} />}
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
            {!matchingBudgets.length && !loadingPlan ? <div className="rounded-2xl border border-dashed border-amber-200 bg-white p-6 text-sm text-slate-500">No matching budget bands available.</div> : null}
          </div>
        </div>

        <div>
          <h2 className="section-title">Scenario fit</h2>
          <div className="mt-4 rounded-3xl border border-amber-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-temple-gold">Selected temple</p>
            <p className="mt-2 text-2xl font-semibold text-temple-deep">{selectedTemple?.name || 'Select a temple'}</p>
            <p className="mt-3 text-sm text-slate-600">This planner is now aligned to the backend planner API and keeps the same UI layout.</p>
            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}