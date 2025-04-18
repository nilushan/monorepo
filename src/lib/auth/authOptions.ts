import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyUserCredentials } from '@/lib/services/authService';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('AuthOptions: Delegating authorization check to AuthService for:', credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log('AuthOptions: Missing email or password in credentials.');
          return null;
        }

        const user = await verifyUserCredentials(credentials.email, credentials.password);

        if (user) {
          console.log('AuthOptions: Authorization successful, returning user object.');
          return user;
        } else {
          console.log('AuthOptions: Authorization failed.');
          return null;
        }
      },
    }),
  ],
  // Add other NextAuth options here if needed
};