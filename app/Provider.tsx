'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { Session } from 'next-auth'; // Import the correct type from next-auth

interface ProvidersProps {
  children: ReactNode;
  session?: Session | null; // The session can be null if there's no active session
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
