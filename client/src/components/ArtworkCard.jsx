import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/api';
import { ImageOff } from 'lucide-react';

export default function ArtworkCard({ artwork }) {
  const { id, title, artist_display, date_display, image_id, department_title } = artwork;
  const imgUrl = getImageUrl(image_id, 400);

  return (
    <Link
      to={`/artwork/${id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
      className="group block bg-[#111] border border-[#1f1f1f] rounded-xl overflow-hidden
        hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-[#0a0a0a] flex items-center justify-center">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
        
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.innerHTML = `
                <div style="width:100%;height:100%;display:flex;flex-direction:column;
                  align-items:center;justify-content:center;gap:8px">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" 
                    stroke="#374151" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="m21 15-5-5L5 21"/>
                  </svg>
                  <span style="color:#374151;font-size:11px">No image</span>
                </div>`;
            }}
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <ImageOff size={36} style={{ color: '#374151' }} />
            <span style={{ color: '#374151', fontSize: '11px' }}>No image</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        {department_title && (
          <span style={{ color: '#c9a84c' }}
            className="text-xs uppercase tracking-widest font-medium">
            {department_title}
          </span>
        )}
        <h3 style={{ color: '#ffffff' }}
          className="mt-1 font-semibold text-sm leading-snug line-clamp-2">
          {title}
        </h3>
        <p style={{ color: '#6b7280' }} className="mt-1 text-xs line-clamp-1">
          {artist_display}
        </p>
        {date_display && (
          <p style={{ color: '#4b5563' }} className="text-xs mt-0.5">
            {date_display}
          </p>
        )}
      </div>
    </Link>
  );
}