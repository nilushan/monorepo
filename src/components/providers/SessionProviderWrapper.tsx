'use client'; // This directive marks this as a Client Component

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface SessionProviderWrapperProps {
  children: React.ReactNode;
  // We don't need to pass the session prop here when using App Router
  // SessionProvider automatically fetches it
}

/**
 * A client component wrapper for NextAuth's SessionProvider.
 * This is necessary because the root layout is a Server Component,
 * but SessionProvider uses React Context.
 */
export default function SessionProviderWrapper({ children }: SessionProviderWrapperProps) {
  // The SessionProvider component makes the session accessible via the useSession hook
  return <SessionProvider>{children}</SessionProvider>;
}