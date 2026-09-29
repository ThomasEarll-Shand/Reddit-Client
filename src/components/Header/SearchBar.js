import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      className="search-bar"
    />
  );
}

export default SearchBar;