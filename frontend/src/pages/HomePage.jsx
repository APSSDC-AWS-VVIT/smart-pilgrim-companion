import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import TempleCard from '../components/TempleCard';
import RouteCard from '../components/RouteCard';
import { temples, getTopRoutes, metadata } from '../data';

export default function HomePage() {
  const featuredTemples = temples;
  const highlightItems = [
    `3 validated temples`,
    `${metadata.totalRoutes} route records`,
    `${metadata.totalSchedules} schedule records`,
    'Temporary frontend data adapters',
  ];

  return (
    <>
      <section className="hero-border bg-temple-radial">
        <div className="section-shell grid gap-10 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-20">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-amber-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-temple-gold">
              Cloud-based spiritual travel assistance
            </span>
            <div className="space-y-4">
              <h1 className="display-font max-w-3xl text-5xl font-bold leading-[0.95] text-temple-deep sm:text-6xl">
                Plan temple journeys with validated data and a calm, modern travel experience.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Smart Pilgrim Companion turns the repository&apos;s temple, route, schedule, budget, and attraction records into a responsive frontend for Tirumala, Srisailam, and Srikalahasti.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <SearchBar value="" onChange={() => {}} placeholder="Search temple names, routes, or nearby places" />
              <Link to="/planner" className="inline-flex items-center justify-center rounded-2xl bg-temple-deep px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-temple-gold">
                Open planner
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {highlightItems.map((item) => (
                <div key={item} className="rounded-2xl border border-amber-100 bg-white px-4 py-4 text-sm text-temple-ink shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[2rem] border border-amber-100 bg-white p-5 shadow-glow">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-temple-gold">Quick Planner</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>Choose a temple, select a budget band, and preview a suggested plan before backend APIs are connected.</p>
                <div className="rounded-2xl bg-amber-50 px-4 py-3 text-temple-deep">Mobile-first layout with clean cards and warm temple palette.</div>
              </div>
            </div>
            <div className="rounded-[2rem] border border-deep-100 bg-gradient-to-br from-temple-deep to-[#294e74] p-5 text-white shadow-glow">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">Highlights</p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-white/90">
                <p>Temple listings, detailed views, route discovery, gallery browsing, and itinerary planning built from repository data.</p>
                <p>Ready for minimal backend replacement later because the data shape mirrors CSV and JSON source fields.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Featured Temples</h2>
            <p className="section-copy">The three validated temple records are surfaced exactly as stored in the repository data files.</p>
          </div>
          <Link to="/temples" className="hidden rounded-full border border-amber-200 px-4 py-2 text-sm font-semibold text-temple-deep transition hover:bg-white sm:inline-flex">
            View all
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredTemples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} compact />
          ))}
        </div>
      </section>

      <section className="section-shell py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="section-title">Quick Planner</h2>
            <p className="section-copy">Use the planner to combine temple, budget, days, scenario steps, and route suggestions from the same repository source set.</p>
            <Link to="/planner" className="mt-5 inline-flex rounded-full bg-temple-deep px-5 py-3 text-sm font-semibold text-white transition hover:bg-temple-gold">Start planning</Link>
          </div>
          <div className="grid gap-3">
            {getTopRoutes(4).map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}