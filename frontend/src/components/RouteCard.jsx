export default function RouteCard({ route }) {
  return (
    <div className="surface-card rounded-2xl p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-temple-gold">{route.mode}</p>
          <h4 className="mt-1 font-semibold text-temple-deep">{route.source} to {route.destination}</h4>
          <p className="mt-1 text-sm text-app-muted">{route.notes}</p>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-temple-deep">{route.duration}</span>
      </div>
      <p className="mt-3 text-sm text-app-muted">{route.estimatedCost}</p>
    </div>
  );
}