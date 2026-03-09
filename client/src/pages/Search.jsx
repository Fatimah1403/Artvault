import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchArtworks } from '../utils/api';
import ArtworkCard from '../components/ArtworkCard';
import SkeletonCard from '../components/SkeletonCard';
import SearchBar from '../components/SearchBar';
import ErrorMessage from '../components/ErrorMessage';

function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const query = searchParams.get('q') || '';

    useEffect(() => {
        if (!query) return;
      
        const fetchArtworks = async () => {
          setLoading(true);
          setError("");
      
          try {
            const res = await searchArtworks(query);
            const results = res.data.data || [];
      
            if (results.length === 0) {
              setError(`No results found for '${query}'`);
            }
      
            setArtworks(results);
          } catch {
            setError("Something went wrong. Please try again.");
          } finally {
            setLoading(false);
          }
        };
      
        fetchArtworks();
      }, [query]);

    const handleSearch = (q) => setSearchParams({ q });


  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Search</h1>
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} initialValue={query} />
      </div>
      {query && !loading && !error && (
        <p className="text-gray-500 text-sm mb-6">
          Showing results for <span className="text-amber-400">'{query}'</span>
        </p>
      )}
      {error && <ErrorMessage message={error} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : artworks.map(a => <ArtworkCard key={a.id} artwork={a} />)
        }
      </div>
    </main>
  )
}

export default Search