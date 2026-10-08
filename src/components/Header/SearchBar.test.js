import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';
import userEvent from '@testing-library/user-event';

test('renders the search input', () => {
  render(
    <SearchBar searchTerm="" setSearchTerm={() => {}}/>
  );
  const searchInput = screen.getByPlaceholderText('Search posts...');
  expect(searchInput).toBeInTheDocument();
});


test('calls setSearchTerm when the user types', async () => {
  const user = userEvent.setup();
  const mockSetSearchTerm = jest.fn();
  render(
    <SearchBar searchTerm="" setSearchTerm={mockSetSearchTerm}/>
  );
  const searchInput = screen.getByPlaceholderText('Search posts...');
  await user.type(searchInput, 'react');
  expect(mockSetSearchTerm).toHaveBeenCalled();
});