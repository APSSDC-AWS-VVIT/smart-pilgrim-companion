import { useEffect, useMemo, useState } from 'react';
import PlannerCard from '../components/PlannerCard';
import Loader from '../components/Loader';
import { loadPlannerData } from '../services/plannerService';
import { getTemples } from '../services/templeService';

export default function TravelPlannerPage() {
  // 1. ALL STATES FIRST
  const [selectedTempleId, setSelectedTempleId] = useState('T001');
  const [budgetType, setBudgetType] = useState('low');
  const [days, setDays] = useState(3);
  const [temples, setTemples] = useState([]);
  const [plan, setPlan] = useState(null);
  const [loadingTemples, setLoadingTemples] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [error, setError] = useState('');

  // 2. MEMOIZED VALUES NEXT (Declared safely before hooks read them)
  const templeOptions = useMemo(() => temples.map((temple) => ({ value: temple.id, label: temple.name })), [temples]);
  const selectedTemple = useMemo(() => temples.find((temple) => temple.id === selectedTempleId) || temples[0] || null, [temples, selectedTempleId]);

  // 3. FUNCTIONS
  const refreshPlanner = async (currentTemple = selectedTemple) => {
    if (!currentTemple) {
      setPlan(null);
      setLoadingPlan(false);
      setError('Select a temple to generate a plan.');
      return;
    }

    setLoadingPlan(true);
    setError('');

    try {
      const result = await loadPlannerData({ templeId: currentTemple.id, temple: currentTemple, budgetType, days, persons: 1 });
      setPlan(result);
    } catch (err) {
      setPlan(null);
      setError(err.message || 'Generating best available pilgrimage plan…');
    } finally {
      setLoadingPlan(false);
    }
  };

  // 4. EFFECTS AT THE BOTTOM
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
      if (active) {
        await refreshPlanner(selectedTemple);
      }
    }

    loadPlan();

    return () => {
      active = false;
    };
  }, [selectedTemple, budgetType, days]);

  // 5. REMAINING DECONSTRUCTIONS (Properly unpacking the backend .data object envelope)
  const planData = plan?.data || plan;

  const routeOptions = planData?.routeOptions || [];
  const budgetOptions = planData?.budgetOptions || [];
  const timelineSteps = planData?.timeline || [];
  const nearbyPlaces = planData?.nearbyPlaces || [];
  const smartTips = planData?.smartTips || [];
  const riskNotes = planData?.riskNotes || [];

  return (
    <section className="section-shell py-12">
      <div className="max-w-4xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-temple-gold">Smart Temple Travel Planner</p>
        <h1 className="display-font text-4xl font-bold leading-tight text-temple-deep sm:text-5xl">Intelligent pilgrimage assistant for temple journeys</h1>
        <p className="section-copy">Generating best available pilgrimage plan… using the backend planner, recommendation, route, budget, and temple datasets.</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="surface-card rounded-[2rem] p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="display-font text-2xl font-bold text-temple-deep">Inputs</h2>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-temple-gold">Auto refresh</span>
          </div>

          <div className="mt-5 grid gap-4">
            <label className="block">
              <span className="text-sm font-medium text-app-muted">Temple</span>
              {loadingTemples ? <div className="mt-2"><Loader /></div> : (
                <select value={selectedTempleId} onChange={(event) => setSelectedTempleId(event.target.value)} className="select-shell mt-2 w-full rounded-2xl px-4 py-3 outline-none">
                  {templeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              )}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-app-muted">Budget</span>
              <select value={budgetType} onChange={(event) => setBudgetType(event.target.value)} className="select-shell mt-2 w-full rounded-2xl px-4 py-3 outline-none">
                <option value="low">LOW</option>
                <option value="medium">MEDIUM</option>
                <option value="premium">HIGH</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-app-muted">Days</span>
              <input type="number" min="1" max="7" value={days} onChange={(event) => setDays(Number(event.target.value))} className="input-shell mt-2 w-full rounded-2xl px-4 py-3 outline-none" />
            </label>

            <button type="button" onClick={() => refreshPlanner(selectedTemple)} className="button-primary inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold">
              Generate Plan
            </button>

            <div className="rounded-2xl border border-[color:var(--app-border)] bg-[color:var(--app-card-soft)] p-4 text-sm text-temple-ink">
              {error || 'Changing temple, budget, or days refreshes the plan automatically.'}
            </div>
          </div>
        </div>

        <PlannerCard plan={plan} loading={loadingPlan} />
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <section>
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="section-title">Travel Options</h2>
              <p className="section-copy">Routes ranked from the backend planner response and all matching route records.</p>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {routeOptions.length ? routeOptions.map((route) => {
              const isSelected = route.id === plan?.selectedRoute?.id;
              return (
                <div key={route.id} className={`surface-card rounded-2xl p-4 transition hover:-translate-y-0.5 ${isSelected ? 'ring-2 ring-temple-gold' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-temple-gold">{route.mode}</p>
                      <h4 className="mt-1 font-semibold text-temple-deep">{route.source} to {route.destination}</h4>
                      <p className="mt-1 text-sm text-app-muted">{route.notes}</p>
                    </div>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-temple-deep">{route.duration}</span>
                  </div>
                  <p className="mt-3 text-sm text-app-muted">{route.estimatedCost}</p>
                </div>
              );
            }) : (
              <div className="surface-card rounded-2xl p-4 text-sm text-app-muted">Generating best available pilgrimage plan…</div>
            )}
          </div>
        </section>

        <section>
          <h2 className="section-title">Budget Summary</h2>
          <div className="mt-4 grid gap-3">
            {budgetOptions.length ? budgetOptions.map((budget) => {
              const isSelected = (budget.type || '').toLowerCase() === budgetType;
              return (
                <div key={budget.id} className={`surface-card rounded-2xl p-4 transition hover:-translate-y-0.5 ${isSelected ? 'ring-2 ring-temple-gold bg-[color:var(--app-card-soft)]' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-temple-gold">{budget.type.toUpperCase()}</p>
                      <h4 className="mt-1 font-semibold text-temple-deep">₹{Number(budget.minCost).toLocaleString('en-IN')} - ₹{Number(budget.maxCost).toLocaleString('en-IN')}</h4>
                    </div>
                    <span className="rounded-full bg-temple-deep px-3 py-1 text-xs font-medium text-white">{budget.persons} persons</span>
                  </div>
                  <p className="mt-3 text-sm text-app-muted">{budget.persons} persons · {budget.days} days · {budget.includes}</p>
                </div>
              );
            }) : (
              <div className="surface-card rounded-2xl p-4 text-sm text-app-muted">Generating best available pilgrimage plan…</div>
            )}
          </div>
        </section>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <section>
          <h2 className="section-title">Journey Timeline</h2>
          <div className="mt-4 grid gap-3">
            {timelineSteps.length ? timelineSteps.map((step) => (
              <div key={`${step.order}-${step.title}`} className="flex items-start gap-4 rounded-2xl border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-glow">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-temple-deep text-sm font-semibold text-white">{step.order}</div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-temple-gold">{step.title}</p>
                  <p className="mt-1 text-sm leading-6 text-temple-ink">{step.detail}</p>
                </div>
              </div>
            )) : (
              <div className="surface-card rounded-2xl p-4 text-sm text-app-muted">Generating best available pilgrimage plan…</div>
            )}
          </div>
        </section>

        <section>
          <h2 className="section-title">Nearby Attractions</h2>
          <div className="mt-4 grid gap-3">
            {nearbyPlaces.length ? nearbyPlaces.map((place) => (
              <div key={place.id} className="surface-card rounded-2xl p-4 transition hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-temple-gold">{place.type}</p>
                    <h4 className="mt-1 font-semibold text-temple-deep">{place.name}</h4>
                    <p className="mt-1 text-sm text-app-muted">{place.description}</p>
                  </div>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-temple-deep">{place.distance}</span>
                </div>
              </div>
            )) : (
              <div className="surface-card rounded-2xl p-4 text-sm text-app-muted">Generating best available pilgrimage plan…</div>
            )}
          </div>
        </section>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <section>
          <h2 className="section-title">Smart Tips</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {(smartTips.length ? smartTips : ['Generating best available pilgrimage plan…']).map((tip) => (
              <div key={tip} className="surface-card-soft rounded-2xl p-4 text-sm leading-6 text-temple-ink transition hover:-translate-y-0.5">
                {tip}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Risk Notes</h2>
          <div className="mt-4 grid gap-3">
            {(riskNotes.length ? riskNotes : ['Generating best available pilgrimage plan…']).map((note) => (
              <div key={note} className="surface-card rounded-2xl p-4 text-sm leading-6 text-app-muted transition hover:-translate-y-0.5">
                {note}
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
