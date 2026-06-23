import { Link, useParams, Navigate } from 'react-router-dom';
import BudgetCard from '../components/BudgetCard';
import Gallery from '../components/Gallery';
import Loader from '../components/Loader';
import ScheduleCard from '../components/ScheduleCard';
import { getTempleById, getBudgetsForTemple, getSchedulesForTemple, getPlacesForTemple } from '../data';

export default function TempleDetailsPage() {
  const { templeId } = useParams();
  const temple = getTempleById(templeId);

  if (!temple) {
    return <Navigate to="/temples" replace />;
  }

  const schedules = getSchedulesForTemple(temple.id);
  const budgets = getBudgetsForTemple(temple.id);
  const places = getPlacesForTemple(temple.id);

  const gallery = [
    { src: temple.image, alt: temple.name, label: `${temple.name} hero view` },
    ...['gallery'].flatMap(() => []),
  ];

  return (
    <section className="section-shell py-12">
      <div className="overflow-hidden rounded-[2rem] border border-amber-100 bg-white shadow-glow">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-temple-gold">Temple Details</p>
            <h1 className="display-font mt-3 text-5xl font-bold text-temple-deep">{temple.name}</h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">{temple.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl bg-amber-50 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-temple-gold">Timings</p>
                <p className="mt-1 font-semibold text-temple-deep">{temple.openingTime} - {temple.closingTime}</p>
              </div>
              <div className="rounded-2xl bg-amber-50 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-temple-gold">Best visit</p>
                <p className="mt-1 font-semibold text-temple-deep">{temple.bestVisitTime}</p>
              </div>
              <div className="rounded-2xl bg-amber-50 px-4 py-3 sm:col-span-2 xl:col-span-1">
                <p className="text-xs uppercase tracking-[0.2em] text-temple-gold">Speciality</p>
                <p className="mt-1 font-semibold text-temple-deep">{temple.speciality}</p>
              </div>
            </div>
          </div>
          <div className="aspect-[4/3] lg:aspect-auto">
            <img src={temple.image} alt={temple.name} className="h-full w-full object-cover" />
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
              {schedules.length ? schedules.map((item) => <ScheduleCard key={item.id} item={item} />) : <Loader />}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="section-title">Nearby Places</h2>
            <div className="mt-4 grid gap-3">
              {places.map((place) => (
                <div key={place.id} className="rounded-2xl border border-amber-100 bg-white p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-temple-deep">{place.name}</h3>
                      <p className="mt-1 text-sm text-slate-600">{place.description}</p>
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
              {budgets.map((budget) => <BudgetCard key={budget.id} item={budget} />)}
            </div>
          </div>

          <div>
            <h2 className="section-title">Gallery</h2>
            <Gallery
              title={`${temple.name} views`}
              images={[
                { src: temple.image, alt: temple.name, label: temple.name },
                { src: temple.image, alt: temple.name, label: `${temple.name} main view` },
                { src: temple.image, alt: temple.name, label: `${temple.name} temple view` },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/temples" className="rounded-full border border-amber-200 px-5 py-3 text-sm font-semibold text-temple-deep transition hover:bg-white">Back to listing</Link>
        <Link to="/planner" className="rounded-full bg-temple-deep px-5 py-3 text-sm font-semibold text-white transition hover:bg-temple-gold">Open planner</Link>
      </div>
    </section>
  );
}