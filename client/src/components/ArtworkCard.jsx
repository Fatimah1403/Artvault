import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/api';
import { ImageOff } from 'lucide-react';

export default function ArtworkCard({ artwork }) {
  const { id, title, artist_display, date_display, image_id, department_title } = artwork;
  const imgUrl = getImageUrl(image_id, 400);

  return (
    <Link
      to={`/artwork/${id}`}
      className="group block bg-[#111] border border-[#1f1f1f] rounded-xl overflow-hidden
        hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden bg-[#0a0a0a]">
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff size={40} className="text-gray-700" />
          </div>
        )}
      </div>

      <div className="p-4">
        {department_title && (
          <span className="text-xs uppercase tracking-widest text-amber-400 font-medium">
            {department_title}
          </span>
        )}
        <h3 className="mt-1 text-white font-semibold text-sm leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="mt-1 text-gray-500 text-xs line-clamp-1">{artist_display}</p>
        {date_display && (
          <p className="text-gray-600 text-xs mt-0.5">{date_display}</p>
        )}
      </div>
    </Link>
  );
}