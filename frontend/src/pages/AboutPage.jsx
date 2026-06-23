export default function AboutPage() {
  return (
    <section className="section-shell py-12">
      <div className="max-w-3xl">
        <h1 className="section-title">About</h1>
        <p className="section-copy">
          Smart Pilgrim Companion is a cloud-based spiritual travel and temple assistance platform using AWS. This frontend currently renders only the repository-validated temple data for Tirumala, Srisailam, and Srikalahasti.
        </p>
      </div>

      <div className="mt-8 grid gap-4 rounded-3xl border border-amber-100 bg-white p-6 shadow-glow md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-temple-gold">Design goals</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">Clean, modern, spiritual, minimal, mobile-first, and ready for backend API replacement later without changing the overall page structure.</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-temple-gold">Data policy</p>
          <p className="mt-3 text-sm leading-7 text-slate-600">No mock data, no external datasets, and no invented temple facts. The UI is wired only to repository CSV and JSON content.</p>
        </div>
      </div>
    </section>
  );
}