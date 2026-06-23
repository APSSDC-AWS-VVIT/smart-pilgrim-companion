export default function PlannerCard({ plan }) {
  if (!plan) {
    return null;
  }

  return (
    <div className="space-y-5 rounded-3xl border border-amber-100 bg-white p-5 shadow-glow">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-temple-gold">Suggested Plan</p>
        <h3 className="display-font mt-2 text-3xl font-bold text-temple-deep">{plan.templeName}</h3>
        <p className="mt-2 text-sm text-slate-600">{plan.routeSummary}</p>
        <p className="mt-2 text-sm text-slate-600">{plan.budgetSummary}</p>
      </div>

      <div>
        <h4 className="font-semibold text-temple-deep">Recommended steps</h4>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {plan.scenario.steps.slice(0, 8).map((step) => (
            <div key={step} className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-temple-ink">
              {step}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-temple-deep">Travel options</h4>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {plan.travelOptions.map((route) => (
            <div key={route.id} className="rounded-2xl border border-amber-100 p-4">
              <p className="text-sm font-semibold text-temple-deep">{route.source} to {route.destination}</p>
              <p className="mt-1 text-sm text-slate-600">{route.mode} - {route.duration}</p>
              <p className="mt-1 text-sm text-slate-500">{route.estimatedCost} · {route.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}