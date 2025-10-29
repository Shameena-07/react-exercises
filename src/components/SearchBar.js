import React from "react";
import "../App.css";

export default function SearchBar({ query, setQuery, onSearch }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search recipes by ingredients..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
}
