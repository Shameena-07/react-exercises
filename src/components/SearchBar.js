import React from "react";
import { Search } from "lucide-react";
import "./SearchBar.css";

export default function SearchBar({ query, setQuery, onSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search recipes by ingredients..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="search-input"
        />
        <button onClick={onSearch} className="search-button" aria-label="Search">
          <Search size={18} />
        </button>
      </div>
    </div>
  );
}
