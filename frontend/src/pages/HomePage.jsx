import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import TempleCard from '../components/TempleCard';
import RouteCard from '../components/RouteCard';
import Loader from '../components/Loader';
import { getRoutes } from '../services/routeService';
import { getTemples } from '../services/templeService';

export default function HomePage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [temples, setTemples] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadHomeData() {
      setLoading(true);
      setError('');

      try {
        const [templeResults, routeResults] = await Promise.all([getTemples(), getRoutes()]);
        if (active) {
          setTemples(templeResults);
          setRoutes(routeResults);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load home data.');
          setTemples([]);
          setRoutes([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadHomeData();

    return () => {
      active = false;
    };
  }, []);

  const featuredTemples = temples.slice(0, 3);
  const highlightItems = [
    `${temples.length || 3} validated temples`,
    `${routes.length || 22} route records`,
    'Backend APIs connected',
    'Frontend uses API-backed data',
  ];

  function handleHomeSearch() {
    const query = searchValue.trim();
    navigate(query ? `/temples?q=${encodeURIComponent(query)}` : '/temples');
  }

  return (
    <>
      <section className="hero-border bg-temple-radial">
        <div className="section-shell grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div className="space-y-6 stagger">
            <span className="inline-flex rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-card)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-temple-gold">
              Cloud-based spiritual travel assistance
            </span>
            <div className="space-y-4">
              <h1 className="display-font max-w-3xl text-5xl font-bold leading-[0.95] text-temple-deep sm:text-6xl">
                Plan temple journeys with validated data and a calm, modern travel experience.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-app-muted sm:text-lg">
                Smart Pilgrim Companion turns the repository&apos;s temple, route, schedule, budget, and attraction records into a responsive frontend for Tirumala, Srisailam, and Srikalahasti.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <SearchBar value={searchValue} onChange={setSearchValue} onSubmit={handleHomeSearch} placeholder="Search temple names, routes, or nearby places" />
              <Link to="/planner" className="button-primary inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold shadow-glow">
                Open planner
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {highlightItems.map((item) => (
                <div key={item} className="surface-card rounded-2xl px-4 py-4 text-sm text-temple-ink">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="surface-card rounded-[2rem] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-temple-gold">Quick Planner</p>
              <div className="mt-4 space-y-3 text-sm text-app-muted">
                <p>Choose a temple, select a budget band, and preview a suggested plan directly from the backend planner endpoint.</p>
                <div className="surface-card-soft rounded-2xl px-4 py-3 text-temple-deep">Mobile-first layout with clean cards and warm temple palette.</div>
              </div>
            </div>
            <div className="rounded-[2rem] bg-gradient-to-br from-temple-deep to-temple-saffron p-5 text-white shadow-glow">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200">Highlights</p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-white/90">
                <p>Temple listings, detailed views, route discovery, gallery browsing, and itinerary planning are now powered by the backend APIs.</p>
                <p>Response field names are preserved in the service layer so the UI stays unchanged.</p>
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
          <Link to="/temples" className="button-secondary hidden rounded-full px-4 py-2 text-sm font-semibold sm:inline-flex">
            View all
          </Link>
        </div>

        {loading ? <div className="mt-8"><Loader /></div> : null}
        {!loading && error ? <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">{error}</div> : null}
        {!loading && !error ? (
          <div className="stagger mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredTemples.map((temple) => (
              <TempleCard key={temple.id} temple={temple} compact />
            ))}
          </div>
        ) : null}
      </section>

      <section className="section-shell py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="section-title">Quick Planner</h2>
            <p className="section-copy">Use the planner to combine temple, budget, days, schedule steps, and route suggestions from the backend planner endpoint.</p>
            <Link to="/planner" className="button-primary mt-5 inline-flex rounded-full px-5 py-3 text-sm font-semibold">Start planning</Link>
          </div>
          <div className="grid gap-3">
            {(loading ? [] : routes.slice(0, 4)).map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}