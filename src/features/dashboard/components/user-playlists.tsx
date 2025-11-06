'use client';

import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { fetcher } from '@/shared/lib/fetcher';

type Playlist = {
  id: string;
  name: string;
  [key: string]: any;
};

type PlaylistsResponse = {
  items: Playlist[];
  [key: string]: any;
};

export function UserPlaylists() {
  const { t } = useTranslation();
  const { data: playlists, error, isLoading } = useSWR<PlaylistsResponse>(
    'https://api.spotify.com/v1/me/playlists',
    fetcher
  );

  if (isLoading) {
    return <div className="text-gray-700 dark:text-gray-300">{t('loading_playlists')}</div>;
  }

  if (error) {
    return <div className="text-red-500">{t('error_loading_playlists')}: {(error as Error).message}</div>;
  }

  if (!playlists || playlists.items.length === 0) {
    return <div className="text-gray-700 dark:text-gray-300">{t('no_playlists_found')}</div>;
  }

  return (
    <div className="mt-8 w-full max-w-md">
      <h3 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">{t('your_playlists')}</h3>
      <ul className="space-y-2">
        {playlists.items.map((playlist: Playlist) => (
          <li key={playlist.id} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md shadow-sm text-gray-800 dark:text-gray-200">
            {playlist.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
