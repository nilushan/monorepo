'use client'; // This needs to be a client component to use hooks

import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <button className="px-3 py-1 text-sm rounded bg-gray-200 text-gray-500 cursor-wait" disabled>Loading...</button>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 hidden sm:inline">Signed in as {session.user?.email}</span>
        <button
          onClick={() => signOut()}
          className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      // Redirects to the default sign-in page provided by NextAuth.js
      // You can customize this by setting `pages: { signIn: '/your/custom/path' }` in authConfig
      onClick={() => signIn()} // Can specify a provider: signIn('credentials') or signIn('google')
      className="px-3 py-1 text-sm rounded bg-green-500 text-white hover:bg-green-600"
    >
      Sign In
    </button>
  );
}