// src/lib/types/userTypes.ts

/**
 * Represents a user within our application domain.
 * This type is independent of any specific authentication library.
 */
export interface AppUser {
  id: string;
  name?: string | null; // Optional based on your user model
  email: string;
  // Add other application-specific user properties here
  // e.g., role: string;
  // Avoid including sensitive data like password hashes here.
}