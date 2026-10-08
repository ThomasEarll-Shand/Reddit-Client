import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SubredditList from './SubredditList';
  
  test('renders the subreddit list', () => {
    render(
    <SubredditList selectedSubreddit="all" setSelectedSubreddit={() => {}}/>
  );
  expect(screen.getByText('Subreddits')).toBeInTheDocument();
  expect(screen.getByText('r/reactjs')).toBeInTheDocument();
  expect(screen.getByText('r/javascript')).toBeInTheDocument();
});



test('selects a subreddit when clicked', async () => {
  const user = userEvent.setup();
  const mockSetSelectedSubreddit = jest.fn();

  render(
    <SubredditList selectedSubreddit="all" setSelectedSubreddit={mockSetSelectedSubreddit}/>
  );
  const reactButton = screen.getByText('r/reactjs');
  await user.click(reactButton);
  expect(mockSetSelectedSubreddit).toHaveBeenCalledWith('reactjs');
});