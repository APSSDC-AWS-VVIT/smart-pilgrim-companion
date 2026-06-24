import { Link } from 'react-router-dom';

export default function TempleCard({ temple, compact = false }) {
  return (
    <article className="surface-card group overflow-hidden rounded-3xl transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(45,91,255,0.16)]">
      <div className={compact ? 'aspect-[4/3]' : 'aspect-[16/10]'}>
        <img src={temple.image} alt={temple.name} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="display-font text-2xl font-bold text-temple-deep">{temple.name}</h3>
            <p className="mt-1 text-sm text-app-muted">{temple.location}, {temple.district}</p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-temple-gold">{temple.bestVisitTime}</span>
        </div>
        <p className="text-sm leading-6 text-app-muted">{temple.description}</p>
        <div className="flex items-center justify-between gap-3 text-sm text-app-muted">
          <span>{temple.openingTime} - {temple.closingTime}</span>
          <span>{temple.state}</span>
        </div>
        <Link
          to={`/temples/${temple.id}`}
          className="button-primary inline-flex rounded-full px-4 py-2 text-sm font-semibold"
        >
          View details
        </Link>
      </div>
    </article>
  );
}