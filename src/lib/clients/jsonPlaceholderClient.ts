/**
 * Example API client for JSONPlaceholder (https://jsonplaceholder.typicode.com/)
 * Demonstrates how to structure external API clients in the monorepo.
 */

export async function fetchPosts(): Promise<string[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}