export default function PlannerCard({ plan, loading = false }) {
  if (loading) {
    return (
      <div className="surface-card animate-pulse rounded-[2rem] p-5">
        <div className="h-4 w-40 rounded-full bg-black/5 dark:bg-white/10" />
        <div className="mt-4 h-8 w-3/5 rounded-2xl bg-black/5 dark:bg-white/10" />
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="h-28 rounded-2xl bg-black/5 dark:bg-white/10" />
          <div className="h-28 rounded-2xl bg-black/5 dark:bg-white/10" />
          <div className="h-28 rounded-2xl bg-black/5 dark:bg-white/10" />
          <div className="h-28 rounded-2xl bg-black/5 dark:bg-white/10" />
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="surface-card rounded-[2rem] p-5 text-app-muted">
        Generating best available pilgrimage plan…
      </div>
    );
  }

  const route = plan.selectedRoute;
  const recommendation = plan.recommendation || {};

  return (
    <div className="surface-card rounded-[2rem] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-temple-gold">AI Recommendation Card</p>
          <h3 className="display-font mt-2 text-3xl font-bold text-temple-deep">{plan.templeName}</h3>
          <p className="mt-2 text-sm text-app-muted">{plan.routeSummary}</p>
        </div>
        <div className="rounded-2xl bg-temple-deep px-4 py-3 text-right text-white shadow-glow">
          <p className="text-xs uppercase tracking-[0.18em] text-white/80">Estimated budget</p>
          <p className="mt-1 text-lg font-semibold">₹{plan.estimatedBudget || '—'}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="surface-card-soft rounded-2xl p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-temple-gold">Recommended Route</p>
          <p className="mt-2 font-semibold text-temple-deep">{recommendation.recommended_route || route?.mode || 'Generating best available pilgrimage plan…'}</p>
          <p className="mt-1 text-sm text-app-muted">{route ? `${route.source} → ${route.destination}` : 'Generating best available pilgrimage plan…'}</p>
        </div>
        <div className="surface-card-soft rounded-2xl p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-temple-gold">Travel Duration</p>
          <p className="mt-2 font-semibold text-temple-deep">{route?.duration || 'Generating best available pilgrimage plan…'}</p>
          <p className="mt-1 text-sm text-app-muted">{route?.notes || recommendation.travel_tip || 'Generating best available pilgrimage plan…'}</p>
        </div>
        <div className="surface-card-soft rounded-2xl p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-temple-gold">Temple Opening</p>
          <p className="mt-2 font-semibold text-temple-deep">{plan.temple?.openingTime || 'Generating best available pilgrimage plan…'}</p>
          <p className="mt-1 text-sm text-app-muted">Best visit: {plan.bestTime || recommendation.best_time || 'Generating best available pilgrimage plan…'}</p>
        </div>
        <div className="surface-card-soft rounded-2xl p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-temple-gold">Smart Tip</p>
          <p className="mt-2 text-sm font-semibold text-temple-deep">{plan.smartTips?.[0] || 'Generating best available pilgrimage plan…'}</p>
          <p className="mt-1 text-sm text-app-muted">{plan.smartTips?.[1] || recommendation.travel_tip || 'Generating best available pilgrimage plan…'}</p>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="font-semibold text-temple-deep">Journey Steps</h4>
        <div className="mt-3 grid gap-3">
          {(plan.journeySteps || []).length ? plan.journeySteps.slice(0, 5).map((step, index) => (
            <div key={step} className="flex items-start gap-4 rounded-2xl border border-[color:var(--app-border)] bg-[color:var(--app-card-soft)] px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-temple-deep text-sm font-semibold text-white">{index + 1}</div>
              <p className="text-sm leading-6 text-temple-ink">{step}</p>
            </div>
          )) : (
            <div className="rounded-2xl border border-dashed border-[color:var(--app-border)] px-4 py-3 text-sm text-app-muted">Generating best available pilgrimage plan…</div>
          )}
        </div>
      </div>
    </div>
  );
}
