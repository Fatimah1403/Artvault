import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArtworks } from '../utils/api';
import ArtworkCard from '../components/ArtworkCard';
import SkeletonCard from '../components/SkeletonCard';
import SearchBar from '../components/SearchBar';
import { Sparkles } from 'lucide-react';


function Home() {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getArtworks(1)
          .then(res => setArtworks(res.data.data.slice(0, 8)))
          .catch(console.error)
          .finally(() => setLoading(false));
    }, []);

      const handleSearch = (q) => navigate(`/search?q=${encodeURIComponent(q)}`);

  return (
    <main>
      {/* Hero */}
      <section className="relative py-28 px-4 flex flex-col items-center text-center border-b border-[#1f1f1f]">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 to-transparent pointer-events-none" />
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-amber-400" />
          <span className="text-amber-400 text-xs uppercase tracking-widest font-medium">
            Art Institute of Chicago
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Explore the World's<br />
          <span className="text-amber-400">Greatest Art</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-lg">
          Discover thousands of artworks from one of the largest art museums in the world.
        </p>
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-white mb-8">
          Highlights from the Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : artworks.map(a => <ArtworkCard key={a.id} artwork={a} />)
          }
        </div>
      </section>
    </main>
  )
}

export default Home