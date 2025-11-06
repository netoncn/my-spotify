'use client';

import useSWR from 'swr';
import { fetcher } from '@/shared/lib/fetcher';

export function useSpotifyUser() {
  const { data: user, error, isLoading } = useSWR(
    '/api/me',
    fetcher
  );

  return {
    user,
    isLoading,
    isError: error,
  };
}
