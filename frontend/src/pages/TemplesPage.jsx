import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import TempleCard from '../components/TempleCard';
import { getTemplesForQuery } from '../services/templeService';

export default function TemplesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    let active = true;

    async function loadTemples() {
      setLoading(true);
      setError('');

      try {
        const results = await getTemplesForQuery(query);
        if (active) {
          setTemples(results);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load temple data.');
          setTemples([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTemples();

    return () => {
      active = false;
    };
  }, [query]);

  function handleSearchChange(value) {
    setQuery(value);
    setSearchParams(value ? { q: value } : {}, { replace: true });
  }

  function retryLoad() {
    setSearchParams(query ? { q: query } : {}, { replace: true });
  }

  return (
    <section className="section-shell py-12">
      <div className="max-w-3xl">
        <h1 className="section-title">Temple Listing</h1>
        <p className="section-copy">Browse the three validated temple records with their repository-sourced images, opening times, and short descriptions.</p>
      </div>

      <div className="mt-8 max-w-xl">
        <SearchBar value={query} onChange={handleSearchChange} onSubmit={retryLoad} placeholder="Filter temples by name, location, or speciality" />
      </div>

      {loading ? <div className="mt-8"><Loader /></div> : null}

      {!loading && error ? (
        <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          <p>{error}</p>
          <button type="button" onClick={retryLoad} className="mt-4 rounded-full bg-temple-deep px-4 py-2 font-semibold text-white">
            Retry
          </button>
        </div>
      ) : null}

      {!loading && !error ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {temples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} />
          ))}
        </div>
      ) : null}

      {!loading && !error && temples.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-amber-200 bg-white p-10 text-center text-slate-500">
          No temples matched the current search.
        </div>
      ) : null}
    </section>
  );
}