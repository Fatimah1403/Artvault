import React, { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch, initialValue = "" }) {
  const [query, setQuery] = useState(initialValue);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a search term");
      return;
    }
    setError("");
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex items-center gap-2">

        <div className="relative flex-1">

          {/* <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10"
          /> */}

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artworks, artists..."
            autoFocus
            style={{
              backgroundColor: "#1a1a1a",
              color: "#ffffff",
              caretColor: "#f59e0b",
              border: "1px solid #333333",
            }}
            className="
              w-full
              appearance-none
              rounded-xl
              pl-10 pr-4 py-3
              placeholder:text-gray-600
              focus:outline-none
              focus:ring-2
              focus:ring-amber-400
              transition-all
              text-sm
              cursor-text
            "
          />
        </div>

        <button
          type="submit"
          className="
            w-24 shrink-0
            py-3
            bg-amber-400 text-black
            font-semibold rounded-xl
            hover:bg-amber-300
            active:scale-95
            transition-all text-sm
          "
        >
          Search
        </button>
      </div>

      {error && (
        <p className="mt-2 text-red-400 text-sm pl-1">{error}</p>
      )}
    </form>
  );
}