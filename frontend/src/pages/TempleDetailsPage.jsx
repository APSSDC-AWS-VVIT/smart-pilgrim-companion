import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BudgetCard from '../components/BudgetCard';
import Gallery from '../components/Gallery';
import Loader from '../components/Loader';
import ScheduleCard from '../components/ScheduleCard';
import { getTempleById } from '../services/templeService';

export default function TempleDetailsPage() {
  const { templeId } = useParams();
  const navigate = useNavigate();
  const [temple, setTemple] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadTemple() {
      setLoading(true);
      setError('');

      try {
        const result = await getTempleById(templeId);
        if (active) {
          setTemple(result);
        }
      } catch (err) {
        if (active) {
          setError(err.status === 404 ? 'Temple not found' : err.message || 'Unable to load temple details.');
          setTemple(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTemple();

    return () => {
      active = false;
    };
  }, [templeId]);

  if (loading) {
    return (
      <section className="section-shell py-12">
        <Loader />
      </section>
    );
  }

  if (error === 'Temple not found') {
    return (
      <section className="section-shell py-12">
        <div className="surface-card rounded-3xl p-10 text-center text-app-muted">
          <p>Temple not found.</p>
          <Link to="/temples" className="button-primary mt-4 inline-flex rounded-full px-4 py-2 text-sm font-semibold">
            Back to temples
          </Link>
        </div>
      </section>
    );
  }

  if (error || !temple) {
    return (
      <section className="section-shell py-12">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          <p>{error || 'Unable to load temple details.'}</p>
          <button type="button" onClick={() => navigate('/temples')} className="button-primary mt-4 rounded-full px-4 py-2 font-semibold">
            Back to temples
          </button>
        </div>
      </section>
    );
  }

  const gallery = [
    { src: temple.image, alt: temple.name, label: `${temple.name} hero view` },
    ...(temple.gallery || []).map((src, index) => ({ src, alt: temple.name, label: `${temple.name} gallery ${index + 1}` })),
  ];

  return (
    <section className="section-shell py-12">
      <div className="surface-card overflow-hidden rounded-[2rem]">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-temple-gold">Temple Details</p>
            <h1 className="display-font mt-3 text-5xl font-bold text-temple-deep">{temple.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-app-muted">{temple.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <div className="surface-card-soft rounded-2xl px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-temple-gold">Timings</p>
                <p className="mt-1 font-semibold text-temple-deep">{temple.openingTime} - {temple.closingTime}</p>
              </div>
              <div className="surface-card-soft rounded-2xl px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-temple-gold">Best visit</p>
                <p className="mt-1 font-semibold text-temple-deep">{temple.bestVisitTime}</p>
              </div>
              <div className="surface-card-soft rounded-2xl px-4 py-3 sm:col-span-2 xl:col-span-1">
                <p className="text-xs uppercase tracking-[0.2em] text-temple-gold">Speciality</p>
                <p className="mt-1 font-semibold text-temple-deep">{temple.speciality}</p>
              </div>
            </div>
          </div>
          <div className="aspect-[4/3] lg:aspect-auto">
            <img src={temple.image} alt={temple.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h2 className="section-title">Description</h2>
            <p className="section-copy">{temple.description}</p>
          </div>
          <div>
            <h2 className="section-title">History</h2>
            <p className="section-copy">{temple.history}</p>
          </div>
          <div>
            <h2 className="section-title">Schedules</h2>
            <div className="mt-4 grid gap-3">
              {temple.schedules.length ? temple.schedules.map((item) => <ScheduleCard key={item.id} item={item} />) : <div className="surface-card rounded-2xl border-dashed p-6 text-sm text-app-muted">No schedules available.</div>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="section-title">Nearby Places</h2>
            <div className="mt-4 grid gap-3">
              {temple.places.map((place) => (
                <div key={place.id} className="surface-card rounded-2xl p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-temple-deep">{place.name}</h3>
                      <p className="mt-1 text-sm text-app-muted">{place.description}</p>
                    </div>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-temple-deep">{place.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="section-title">Budget</h2>
            <div className="mt-4 grid gap-3">
              {temple.budgets.length ? temple.budgets.map((budget) => <BudgetCard key={budget.id} item={budget} />) : <div className="surface-card rounded-2xl border-dashed p-6 text-sm text-app-muted">No budget options available.</div>}
            </div>
          </div>

          <div>
            <h2 className="section-title">Gallery</h2>
            <Gallery
              title={`${temple.name} views`}
              images={gallery.slice(0, 6)}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/temples" className="button-secondary rounded-full px-5 py-3 text-sm font-semibold">Back to listing</Link>
        <Link to="/planner" className="button-primary rounded-full px-5 py-3 text-sm font-semibold">Open planner</Link>
      </div>
    </section>
  );
}