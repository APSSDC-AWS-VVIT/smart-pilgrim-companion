import { useMemo, useState } from 'react';
import SearchBar from '../components/SearchBar';
import TempleCard from '../components/TempleCard';
import { temples } from '../data';

export default function TemplesPage() {
  const [query, setQuery] = useState('');

  const filteredTemples = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return temples;
    }

    return temples.filter((temple) =>
      [temple.name, temple.location, temple.description, temple.speciality]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  return (
    <section className="section-shell py-12">
      <div className="max-w-3xl">
        <h1 className="section-title">Temple Listing</h1>
        <p className="section-copy">Browse the three validated temple records with their repository-sourced images, opening times, and short descriptions.</p>
      </div>

      <div className="mt-8 max-w-xl">
        <SearchBar value={query} onChange={setQuery} placeholder="Filter temples by name, location, or speciality" />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredTemples.map((temple) => (
          <TempleCard key={temple.id} temple={temple} />
        ))}
      </div>

      {filteredTemples.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-amber-200 bg-white p-10 text-center text-slate-500">
          No temples matched the current search.
        </div>
      ) : null}
    </section>
  );
}