import React, { useState } from 'react'
import { Search } from 'lucide-react';


export default function SearchBar({ onSearch, initialValue = '' }) {
    const [query, setQuery]  = useState(initialValue);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) {
            setError('Please enter a search term');
            return;
        }
        setError('');
        onSearch(query);
    }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artworks, artists..."
            className="w-full bg-[#111] border border-[#1f1f1f] rounded-xl pl-11 pr-4 py-3
              text-white caret-white placeholder: text-gray-500 focus:outline-none focus:border-amber-400
              transition-colors text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-amber-400 text-black font-semibold rounded-xl
            hover:bg-amber-300 transition-colors text-sm"
        >
          Search
        </button>
      </div>
      {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
    </form>
  );
  
}

