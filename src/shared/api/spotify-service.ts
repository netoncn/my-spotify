import { fetcher } from '@/shared/lib/fetcher';

export async function getUserPlaylists(): Promise<any> {
  const response = await fetcher('https://api.spotify.com/v1/me/playlists');
  return response;
}

export async function getUserTopArtists(): Promise<any> {
  const response = await fetcher('https://api.spotify.com/v1/me/top/artists');
  return response;
}

export async function getUserTopTracks(): Promise<any> {
  const response = await fetcher('https://api.spotify.com/v1/me/top/tracks');
  return response;
}
