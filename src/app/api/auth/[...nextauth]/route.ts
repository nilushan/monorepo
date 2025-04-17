// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
// Remove unused import: import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// Import the authentication service function
import { verifyUserCredentials } from '@/lib/services/authService';

const authConfig = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign-in form (e.g., "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign-in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g., domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // --- Delegate credential verification to the auth service ---
        console.log('API Route: Delegating authorization check to AuthService for:', credentials?.email);

        // Add validation to ensure credentials are provided
        if (!credentials?.email || !credentials?.password) {
          console.log('API Route: Missing email or password in credentials.');
          return null; // Return null if credentials are incomplete
        }

        // Now we know email and password exist
        const user = await verifyUserCredentials(
          credentials.email, // Pass directly now that we've checked
          credentials.password,
        );

        // The service function returns the user object (without sensitive data) on success, or null on failure.
        if (user) {
          console.log('API Route: Authorization successful, returning user object.');
          return user; // Return the user object provided by the service
        } else {
          console.log('API Route: Authorization failed.');
          return null; // Indicate failure to NextAuth
        }
      },
    }),
    // Add other providers like Google, GitHub, etc. here
    // GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
  ],
  // --- Optional Callbacks ---
  // callbacks: {
  //   async jwt({ token, user }) {
  //     // Persist the user id or role to the token right after signin
  //     if (user) {
  //       token.id = user.id;
  //       // token.role = user.role; // Add custom properties if needed
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     // Send properties to the client, like user id and role from the token
  //     if (session.user) {
  //       session.user.id = token.id as string;
  //       // session.user.role = token.role; // Add custom properties if needed
  //     }
  //     return session;
  //   },
  // },

  // --- Session Strategy ---
  // Using JWT for session strategy is common, especially for serverless environments
  session: {
    strategy: 'jwt' as const, // Add 'as const' for correct type inference
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // --- Custom Pages ---
  // pages: {
  //   signIn: '/auth/signin', // Default: /api/auth/signin
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for email/passwordless login)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out to disable)
  // },

  // --- Debugging ---
  // Enable debug messages in the console if you are having problems
  // debug: process.env.NODE_ENV === 'development',

  // --- Secret ---
  // Ensure NEXTAUTH_SECRET is set in your environment variables (.env.local)
  secret: process.env.NEXTAUTH_SECRET,
};

// Initialize NextAuth.js with the configuration
const handler = NextAuth(authConfig);

// Export the handlers for GET and POST requests
export { handler as GET, handler as POST };