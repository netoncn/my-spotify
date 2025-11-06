import { type NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { exchangeCodeForTokens } from '@/shared/api/spotify';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const { accessToken, refreshToken, expiresIn } = await exchangeCodeForTokens(code);

    const oneHour = 60 * 60; // 1 hour
    const sevenDays = 60 * 60 * 24 * 7; // 7 days

    const cookiesInstance = await cookies();

    cookiesInstance.set('spotify_access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn, // Access token expiration
      path: '/',
    });

    cookiesInstance.set('spotify_refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: sevenDays, // Refresh token can last longer
      path: '/',
    });

    // Redirect to a success page or the main app
    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    // Redirect to an error page or the home page with an error message
    return NextResponse.redirect(new URL('/?error=authentication_failed', request.url));
  }
}
