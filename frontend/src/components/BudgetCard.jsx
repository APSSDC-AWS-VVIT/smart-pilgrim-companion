export default function BudgetCard({ item }) {
  return (
    <div className="rounded-2xl border border-amber-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-temple-gold">{item.type}</p>
          <h4 className="mt-1 font-semibold text-temple-deep">{item.includes}</h4>
        </div>
        <span className="rounded-full bg-temple-deep px-3 py-1 text-xs font-medium text-white">
          {item.persons} {item.persons === 1 ? 'person' : 'people'}
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-600">₹{item.minCost.toLocaleString('en-IN')} - ₹{item.maxCost.toLocaleString('en-IN')} for {item.days} day(s)</p>
    </div>
  );
}