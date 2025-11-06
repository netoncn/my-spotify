import { type NextRequest, NextResponse } from 'next/server';
import { cookies as nextCookies } from 'next/headers';
import { getSpotifyUserProfile } from '@/shared/api/spotify';

export async function GET(request: NextRequest) {
  const cookies = await nextCookies();
  const accessToken = cookies.get('spotify_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userProfile = await getSpotifyUserProfile(accessToken);
    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 });
  }
}
