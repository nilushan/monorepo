// src/lib/services/authService.ts
// Remove: import type { User } from 'next-auth';
import type { AppUser } from '@/lib/types/userTypes'; // Import our local user type

// --- Placeholder Data & Logic ---
// Replace these with actual database interactions and password hashing checks
const users = [
  { id: '1', name: 'Test User', email: 'test@example.com', passwordHash: 'hashed_password_for_password' },
];

async function findUserByEmail(email: string): Promise<(typeof users)[0] | null> {
  console.log(`[AuthService] Searching for user: ${email}`);
  // Simulate DB lookup
  await new Promise(resolve => setTimeout(resolve, 20));
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  return user || null;
}

async function verifyPassword(plainPassword: string, hash: string): Promise<boolean> {
  console.log(`[AuthService] Verifying password...`);
  // Simulate password hash comparison (e.g., using bcrypt.compare)
  await new Promise(resolve => setTimeout(resolve, 30));
  // IMPORTANT: Replace with actual hash comparison!
  const isMatch = plainPassword === 'password' && hash === 'hashed_password_for_password';
  return isMatch;
}
// --- End Placeholder ---


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
): Promise<AppUser | null> => { // Update return type to use AppUser
  if (!email || !password) {
    console.log('[AuthService] Missing email or password for verification.');
    return null;
  }

  const user = await findUserByEmail(email);

  if (!user) {
    console.log(`[AuthService] User not found: ${email}`);
    // Security: Avoid indicating whether the user exists or password was wrong.
    // Consider adding a consistent delay here regardless of outcome.
    return null;
  }

  const isValidPassword = await verifyPassword(password, user.passwordHash);

  if (!isValidPassword) {
    console.log(`[AuthService] Invalid password for user: ${email}`);
    // Security: Consistent delay consideration.
    return null;
  }

  console.log(`[AuthService] Credentials verified successfully for: ${email}`);
  // Return only the necessary user data for the session/token
  // Exclude sensitive fields like passwordHash
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    // image: user.image, // Include if you have user images
  };
};