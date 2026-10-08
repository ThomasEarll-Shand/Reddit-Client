const { test, expect } = require('@playwright/test');



test('loads the Reddit application and displays posts', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'RedditMinimal' })
  ).toBeVisible();
  await expect(
    page.getByPlaceholder('Search posts...')
  ).toBeVisible();
});





test('filters posts when the user searches', async ({ page }) => {
  await page.goto('/');
  const searchInput = page.getByPlaceholder('Search posts...');
  await searchInput.fill('Redux');
  await expect(
    page.getByRole('heading', { name: /Redux/i })
  ).toBeVisible();
});




test('filters posts by subreddit', async ({ page }) => {
  await page.goto('/');
  // Click the React subreddit filter
  await page.getByRole('button', {
    name: 'r/reactjs',
  }).click();
  // A React post should still be displayed
  const reactPost = page.locator('.post').filter({
    hasText: 'r/reactjs',
  });
  await expect(reactPost).toBeVisible();
  // A JavaScript post should no longer be displayed
  const javascriptPost = page.locator('.post').filter({
    hasText: 'r/javascript',
  });
  await expect(javascriptPost).toHaveCount(0);
});



test('opens and closes the post modal', async ({ page }) => {
  await page.goto('/');
  // Find the first post
  const firstPost = page.locator('.post').first();
  // Click it to open the modal
  await firstPost.click();
  // Check that the modal opened
  const modal = page.locator('.post-modal');
  await expect(modal).toBeVisible();
  // Click the close button
  await modal.getByRole('button', {
    name: '✕',
  }).click();
  // Check that the modal disappeared
  await expect(modal).not.toBeVisible();
});