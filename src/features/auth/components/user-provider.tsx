'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useSpotifyUser } from '@/features/auth/hooks/use-spotify-user';

interface UserContextType {
  user: any;
  isLoading: boolean;
  isError: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { user, isLoading, isError } = useSpotifyUser();

  return (
    <UserContext.Provider value={{ user, isLoading, isError }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
