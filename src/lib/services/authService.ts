// src/lib/services/authService.ts
// Remove: import type { User } from 'next-auth';

import { validateUserCredentials } from './userService';
import type { AppUser } from '@/lib/types/userTypes';


/**
 * Verifies user credentials against the database.
 * This function encapsulates the logic for finding a user and checking their password.
 * It should remain framework-agnostic (doesn't know about NextAuth directly).
 *
 * @param email The user's email
 * @param password The user's plain text password
 * @returns The user object (without sensitive data like password hash) if valid, otherwise null.
 */
export const verifyUserCredentials = async (
  email: string,
  password?: string | null,
): Promise<AppUser | null> => {
  if (!email || !password) {
    console.log('[AuthService] Missing email or password for verification.');
    return null;
  }

  // Use the MongoDB-backed user service
  const user = await validateUserCredentials(email, password);
  if (!user) {
    console.log(`[AuthService] Invalid credentials for: ${email}`);
    return null;
  }

  // Map to AppUser (exclude passwordHash)
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
};