import { useEffect, useState } from 'react';
import Gallery from '../components/Gallery';
import Loader from '../components/Loader';
import RouteCard from '../components/RouteCard';
import { getRoutes } from '../services/routeService';
import { getTemples, getTempleById } from '../services/templeService';

export default function ExplorePage() {
  const [temples, setTemples] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadExploreData() {
      setLoading(true);
      setError('');

      try {
        const baseTemples = await getTemples();
        const [routeResults, templeDetails] = await Promise.all([
          getRoutes(),
          Promise.all(baseTemples.map((temple) => getTempleById(temple.id))),
        ]);

        if (active) {
          setTemples(baseTemples);
          setRoutes(routeResults);
          setDetails(templeDetails.filter(Boolean));
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load explore data.');
          setTemples([]);
          setRoutes([]);
          setDetails([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadExploreData();

    return () => {
      active = false;
    };
  }, []);

  const galleryImages = details.flatMap((temple) => [
    { src: temple.image, alt: temple.name, label: temple.name },
    ...(temple.gallery || []).map((src, index) => ({ src, alt: temple.name, label: `${temple.name} gallery ${index + 1}` })),
  ]);

  if (loading) {
    return (
      <section className="section-shell py-12">
        <Loader />
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-shell py-12">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="section-shell py-12">
      <div className="max-w-3xl">
        <h1 className="section-title">Explore</h1>
        <p className="section-copy">Compare route options, nearby attractions, and temple visuals from the same source records.</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="section-title">Routes</h2>
          <div className="mt-4 grid gap-3">
            {routes.slice(0, 8).map((route) => <RouteCard key={route.id} route={route} />)}
          </div>
        </div>

        <div>
          <h2 className="section-title">Nearby Attractions</h2>
          <div className="mt-4 grid gap-3">
            {temples.map((temple) => (
              <div key={temple.id} className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-temple-gold">{temple.name}</p>
                <div className="mt-3 grid gap-2">
                  {(details.find((item) => item.id === temple.id)?.places || []).slice(0, 4).map((place) => (
                    <div key={place.id} className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-temple-ink">
                      {place.name} · {place.distance}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Gallery title="Temple Gallery" images={galleryImages} />
      </div>
    </section>
  );
}