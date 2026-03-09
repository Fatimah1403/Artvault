import { useState, useEffect } from 'react';
import { getArtworks, searchArtworks } from '../utils/api';
import ArtworkCard from '../components/ArtworkCard';
import SkeletonCard from '../components/SkeletonCard';

const DEPARTMENTS = [
  'Arts of Africa',
  'Arts of the Americas',
  'Arts of Asia',
  'Arts of Greece, Rome, and Byzantium',
  'Architecture and Design',
  'Applied Arts of Europe',
  'Contemporary Art',
  'Modern and Contemporary Art',
  'Painting and Sculpture of Europe',
  'Photography and Media',
  'Prints and Drawings',
  'Textiles',
];

export default function Browse() {
  const [artworks, setArtworks] = useState([]);
  const [selected, setSelected] = useState('All');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        let data = [];

        if (selected === 'All') {
          const res = await getArtworks(page);
          data = res.data.data || [];
        } else {
          
          const res = await searchArtworks(selected);
          data = (res.data.data || []).slice(0, 12);
        }

        setArtworks(prev => page === 1 ? data : [...prev, ...data]);
      } catch (err) {
        console.error('Failed to load artworks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [page, selected]);

  const handleDept = (dept) => {
    setSelected(dept);
    setPage(1);
    setArtworks([]);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Browse the Collection</h1>
      <p className="text-gray-500 mb-8">Explore art by department</p>

      {/* Department filter chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {['All', ...DEPARTMENTS].map(dept => (
          <button
            key={dept}
            onClick={() => handleDept(dept)}
            style={
              selected === dept
                ? { backgroundColor: '#c9a84c', color: '#000000', border: '1px solid #c9a84c' }
                : { backgroundColor: '#1a1a1a', color: '#9ca3af', border: '1px solid #2a2a2a' }
            }
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:text-white"
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Artwork grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artworks.map(a => <ArtworkCard key={a.id} artwork={a} />)}
        {loading && Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
      </div>

      {/* No results message */}
      {!loading && artworks.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No artworks found for this department.</p>
        </div>
      )}

      {!loading && artworks.length > 0 && selected === 'All' && (
        <div className="text-center mt-12">
          <button
            onClick={() => setPage(p => p + 1)}
            style={{ backgroundColor: '#c9a84c', color: '#000000' }}
            className="px-8 py-3 font-semibold rounded-xl hover:opacity-90 transition-all"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}