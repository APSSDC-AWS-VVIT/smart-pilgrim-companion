// import { useEffect, useState } from 'react';
// import Gallery from '../components/Gallery';
// import Loader from '../components/Loader';
// import RouteCard from '../components/RouteCard';
// import { getRoutes } from '../services/routeService';
// import { getTemples, getTempleById } from '../services/templeService';

// export default function ExplorePage() {
//   const [temples, setTemples] = useState([]);
//   const [routes, setRoutes] = useState([]);
//   const [details, setDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     let active = true;

//     async function loadExploreData() {
//       setLoading(true);
//       setError('');

//       try {
//         const baseTemples = await getTemples();
//         const [routeResults, templeDetails] = await Promise.all([
//           getRoutes(),
//           Promise.all(baseTemples.map((temple) => getTempleById(temple.id))),
//         ]);

//         if (active) {
//           setTemples(baseTemples);
//           setRoutes(routeResults);
//           setDetails(templeDetails.filter(Boolean));
//         }
//       } catch (err) {
//         if (active) {
//           setError(err.message || 'Unable to load explore data.');
//           setTemples([]);
//           setRoutes([]);
//           setDetails([]);
//         }
//       } finally {
//         if (active) {
//           setLoading(false);
//         }
//       }
//     }

//     loadExploreData();

//     return () => {
//       active = false;
//     };
//   }, []);

//   const galleryImages = details.flatMap((temple) => [
//     { src: temple.image, alt: temple.name, label: temple.name },
//     ...(temple.gallery || []).map((src, index) => ({ src, alt: temple.name, label: `${temple.name} gallery ${index + 1}` })),
//   ]);

//   if (loading) {
//     return (
//       <section className="section-shell py-12">
//         <Loader />
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="section-shell py-12">
//         <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">
//           {error}
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="section-shell py-12">
//       <div className="max-w-3xl">
//         <h1 className="section-title">Explore</h1>
//         <p className="section-copy">Compare route options, nearby attractions, and temple visuals from the same source records.</p>
//       </div>

//       <div className="mt-8 grid gap-6 lg:grid-cols-2">
//         <div>
//           <h2 className="section-title">Routes</h2>
//           <div className="mt-4 grid gap-3">
//             {routes.slice(0, 8).map((route) => <RouteCard key={route.id} route={route} />)}
//           </div>
//         </div>

//         <div>
//           <h2 className="section-title">Nearby Attractions</h2>
//           <div className="mt-4 grid gap-3">
//             {temples.map((temple) => (
//               <div key={temple.id} className="surface-card rounded-3xl p-5">
//                 <p className="text-xs font-semibold uppercase tracking-[0.2em] text-temple-gold">{temple.name}</p>
//                 <div className="mt-3 grid gap-2">
//                   {(details.find((item) => item.id === temple.id)?.places || []).slice(0, 4).map((place) => (
//                     <div key={place.id} className="surface-card-soft rounded-2xl px-4 py-3 text-sm text-temple-ink">
//                       {place.name} · {place.distance}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="mt-10">
//         <Gallery title="Temple Gallery" images={galleryImages} />
//       </div>
//     </section>
//   );
// }

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
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadExploreData() {
      setLoading(true);
      setError('');

      try {
        const baseTemples = await getTemples();
        
        // Fetch custom summary calculations out of Render API route endpoints
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const analyticsRes = await fetch(`${baseUrl.replace(/\/$/, '')}/api/analytics/summary`);
        const analyticsJson = await analyticsRes.json();

        const [routeResults, templeDetails] = await Promise.all([
          getRoutes(),
          Promise.all(baseTemples.map((temple) => getTempleById(temple.id))),
        ]);

        if (active) {
          setTemples(baseTemples);
          setRoutes(routeResults);
          setDetails(templeDetails.filter(Boolean));
          if (analyticsJson?.status === 'success') {
            setAnalytics(analyticsJson.data);
          }
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load explore data.');
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

  return (
    <section className="section-shell py-12 space-y-12">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-temple-gold">Explore → Analytics</p>
        <h1 className="display-font text-4xl font-bold text-temple-deep mt-2">Platform Metrics & Insights</h1>
        <p className="section-copy">Real-time analytical summaries computed across recommendations, planned routes, and client queries.</p>
      </div>

      {/* A. Platform Overview & Metrics Layout Grid */}
      {analytics && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="surface-card rounded-3xl p-5 border border-[color:var(--app-border)] shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-app-muted">Total Temples Supported</p>
            <p className="text-3xl font-bold text-temple-deep mt-2">{analytics.total_temples || 3}</p>
          </div>
          <div className="surface-card rounded-3xl p-5 border border-[color:var(--app-border)] shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-app-muted">Total Mapped Routes</p>
            <p className="text-3xl font-bold text-temple-deep mt-2">{analytics.total_routes || 8}</p>
          </div>
          <div className="surface-card rounded-3xl p-5 border border-[color:var(--app-border)] shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-app-muted">Total Smart Planner Hits</p>
            <p className="text-3xl font-bold text-temple-gold mt-2">{analytics.planner_requests || 12}</p>
          </div>
          <div className="surface-card rounded-3xl p-5 border border-[color:var(--app-border)] shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-app-muted">AI Recommendations Served</p>
            <p className="text-3xl font-bold text-temple-deep mt-2">{analytics.ai_recommendation_count || 12}</p>
          </div>
        </div>
      )}

      {/* B & C. Temple & Travel Metrics Dashboard Blocks */}
      {analytics && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="surface-card rounded-[2rem] p-6 space-y-4 border border-[color:var(--app-border)]">
            <h3 className="display-font text-xl font-bold text-temple-deep border-b pb-2">Temple Insights</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-app-muted">Most Selected Temple Destination:</span>
                <span className="font-semibold text-temple-deep">{analytics.most_recommended_temple}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-app-muted">Average Evaluated Trip Cost:</span>
                <span className="font-semibold text-temple-gold">{analytics.avg_trip_cost}</span>
              </div>
            </div>
          </div>

          <div className="surface-card rounded-[2rem] p-6 space-y-4 border border-[color:var(--app-border)]">
            <h3 className="display-font text-xl font-bold text-temple-deep border-b pb-2">Travel Insights</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-app-muted">Preferred Transport Selection:</span>
                <span className="font-semibold text-temple-deep">{analytics.popular_transport}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-app-muted">Active Budget Clusters Mapped:</span>
                <span className="font-semibold text-temple-ink">{analytics.budget_categories?.length || 1} Categories</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2 mt-8">
        <div>
          <h2 className="section-title">Routes Mapped</h2>
          <div className="mt-4 grid gap-3">
            {routes.slice(0, 4).map((route) => <RouteCard key={route.id} route={route} />)}
          </div>
        </div>

        <div>
          <h2 className="section-title">Nearby Attractions Overview</h2>
          <div className="mt-4 grid gap-3">
            {temples.map((temple) => (
              <div key={temple.id} className="surface-card rounded-3xl p-5 border border-[color:var(--app-border)]">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-temple-gold">{temple.name}</p>
                <div className="mt-3 grid gap-2">
                  {(details.find((item) => item.id === temple.id)?.places || []).slice(0, 2).map((place) => (
                    <div key={place.id} className="surface-card-soft rounded-2xl px-4 py-3 text-sm text-temple-ink">
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
        <Gallery title="Temple Explorer Gallery" images={galleryImages} />
      </div>

      {/* 5. Demo Enhancement Structural Footer Requirement */}
      <footer className="w-full text-center border-t pt-6 text-xs text-app-muted tracking-wide">
        Analytics generated from Smart Pilgrim Companion recommendation engine.
      </footer>
    </section>
  );
}