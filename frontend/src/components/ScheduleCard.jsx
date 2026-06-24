export default function ScheduleCard({ item }) {
  return (
    <div className="surface-card-soft rounded-2xl p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-semibold text-temple-deep">{item.activity}</h4>
          <p className="mt-1 text-sm text-app-muted">{item.notes}</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-temple-deep">{item.startTime} - {item.endTime}</span>
      </div>
    </div>
  );
}