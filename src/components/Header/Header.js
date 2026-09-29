import React from 'react';
import './Header.css';
import SearchBar from './SearchBar';

function Header({ searchTerm, setSearchTerm }) {
  return (
    <header className="header">
      <h1>RedditMinimal</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </header>
  );
}

export default Header;