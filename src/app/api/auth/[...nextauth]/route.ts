import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';

// Initialize NextAuth.js with the configuration
const handler = NextAuth(authOptions);

// Export the handlers for GET and POST requests
export { handler as GET, handler as POST };