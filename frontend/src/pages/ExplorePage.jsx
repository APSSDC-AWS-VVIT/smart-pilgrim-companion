import Gallery from '../components/Gallery';
import RouteCard from '../components/RouteCard';
import { routes, temples, getPlacesForTemple } from '../data';

export default function ExplorePage() {
  const galleryImages = temples.flatMap((temple) => [
    { src: temple.image, alt: temple.name, label: temple.name },
  ]);

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
                  {getPlacesForTemple(temple.id).slice(0, 4).map((place) => (
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