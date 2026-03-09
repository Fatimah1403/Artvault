import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getArtwork, getImageUrl } from '../utils/api';
import { ArrowLeft, User, ImageOff } from 'lucide-react';

export default function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtwork(id)
      .then(res => setArtwork(res.data.data))
      .catch(() => navigate('/browse'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square bg-[#111] rounded-2xl" />
        <div className="space-y-4">
          <div className="h-8 bg-[#111] rounded w-3/4" />
          <div className="h-5 bg-[#111] rounded w-1/2" />
          <div className="h-32 bg-[#111] rounded" />
        </div>
      </div>
    </div>
  );

  if (!artwork) return null;

  const {
    title, artist_display, artist_id, date_display,
    medium_display, dimensions, image_id,
    department_title, description
  } = artwork;

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 text-sm transition-colors"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-[#111] border border-[#1f1f1f]">
          {image_id ? (
            <img
              src={getImageUrl(image_id, 843)}
              alt={title}
              className="w-full object-cover"
            />
          ) : (
            <div className="aspect-square flex items-center justify-center text-gray-700">
              <ImageOff size={60} />
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {department_title && (
            <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
              {department_title}
            </span>
          )}
          <h1 className="text-3xl font-bold text-white mt-2 mb-3 leading-tight">{title}</h1>

          {artist_id ? (
            <Link
                to={`/artist/${artist_id}`}
                style={{ color: '#c9a84c', textDecoration: 'none' }}
                className="font-medium transition-colors flex items-center gap-1.5 mb-4 hover:opacity-80"
            >
                <User size={15} /> {artist_display}
            </Link>
            ) : (
            <p style={{ color: '#9ca3af' }} className="mb-4">{artist_display}</p>
            )}

          <div className="grid grid-cols-2 gap-3 mb-6">
            {date_display && (
              <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-3">
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Date</p>
                <p className="text-white text-sm">{date_display}</p>
              </div>
            )}
            {medium_display && (
              <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-3">
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Medium</p>
                <p className="text-white text-sm line-clamp-2">{medium_display}</p>
              </div>
            )}
            {dimensions && (
              <div className="bg-[#111] border border-[#1f1f1f] rounded-xl p-3 col-span-2">
                <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Dimensions</p>
                <p className="text-white text-sm">{dimensions}</p>
              </div>
            )}
          </div>

          {description && (
            <div>
              <h3 className="text-white font-semibold mb-2">About this Work</h3>
              <div
                className="text-gray-400 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}