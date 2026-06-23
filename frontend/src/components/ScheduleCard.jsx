export default function ScheduleCard({ item }) {
  return (
    <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-temple-deep">{item.activity}</h4>
          <p className="mt-1 text-sm text-slate-600">{item.notes}</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-temple-deep">{item.startTime} - {item.endTime}</span>
      </div>
    </div>
  );
}