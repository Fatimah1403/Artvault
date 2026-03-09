import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtist, searchArtworks } from '../utils/api';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import ArtworkCard from '../components/ArtworkCard';

export default function ArtistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtist(id)
      .then(async res => {
        const a = res.data.data;
        setArtist(a);
        const worksRes = await searchArtworks(a.title);
        setWorks((worksRes.data.data || []).slice(0, 6));
      })
      .catch(() => navigate(-1))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse space-y-4">
      <div className="h-10 bg-[#111] rounded w-1/3" />
      <div className="h-5 bg-[#111] rounded w-1/4" />
      <div className="h-32 bg-[#111] rounded" />
    </div>
  );

  if (!artist) return null;

  const { title, description, birth_date, death_date, place_of_birth } = artist;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 text-sm transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="border-b border-[#1f1f1f] pb-10 mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">{title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
          {place_of_birth && (
            <span className="flex items-center gap-1.5">
              <MapPin size={14} /> {place_of_birth}
            </span>
          )}
          {(birth_date || death_date) && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {birth_date && `b. ${birth_date}`}
              {birth_date && death_date && ' — '}
              {death_date && `d. ${death_date}`}
            </span>
          )}
        </div>
        {description && (
          <div
            className="text-gray-400 leading-relaxed max-w-3xl text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>

      {works.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-6">Works in this Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map(a => <ArtworkCard key={a.id} artwork={a} />)}
          </div>
        </section>
      )}
    </main>
  );
}