/**
 * Formats a string by capitalizing the first letter and making the rest lowercase.
 * Example: "hello WORLD" -> "Hello world"
 */
export function formatString(input: string): string {
  if (!input) return '';
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}