'use client';

import { useState, useCallback, useEffect } from 'react';

export interface Session {
  id: string;
  userId?: string;
  email?: string;
  isGuest: boolean;
  createdAt: Date;
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('session');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSession({
          ...parsed,
          createdAt: new Date(parsed.createdAt),
        });
      } catch {
        // Invalid session, start fresh
        createGuestSession();
      }
    } else {
      createGuestSession();
    }
    setIsLoading(false);
  }, []);

  const createGuestSession = useCallback(() => {
    const newSession: Session = {
      id: `guest-${Date.now()}`,
      isGuest: true,
      createdAt: new Date(),
    };
    setSession(newSession);
    localStorage.setItem('session', JSON.stringify(newSession));
  }, []);

  const createUserSession = useCallback(
    (userId: string, email: string) => {
      const newSession: Session = {
        id: `user-${userId}`,
        userId,
        email,
        isGuest: false,
        createdAt: new Date(),
      };
      setSession(newSession);
      localStorage.setItem('session', JSON.stringify(newSession));
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem('session');
    createGuestSession();
  }, []);

  return {
    session,
    isLoading,
    isGuest: session?.isGuest ?? true,
    createUserSession,
    logout,
  };
}
