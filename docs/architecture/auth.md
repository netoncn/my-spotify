# Authentication Architecture

This document outlines the authentication flow for the `my-spotify` application, which uses Spotify's OAuth 2.0 Authorization Code Flow.

## Flow Overview

1.  **User Initiation:** The user clicks the "Login with Spotify" button.
2.  **Redirect to Spotify:** The application redirects the user to Spotify's authorization page. The request includes our `client_id`, requested `scopes`, and a `redirect_uri`.
3.  **User Consent:** The user grants permission to the application on the Spotify page.
4.  **Spotify Redirects Back:** Spotify redirects the user back to the `redirect_uri` specified (`/api/auth/spotify/callback`). The redirect includes an `authorization_code` in the URL query parameters.
5.  **Code Exchange:** The Next.js API route at the callback URL receives the `authorization_code`. It then makes a secure, server-to-server request to Spotify's `/api/token` endpoint.
6.  **Token Reception:** Spotify validates the request and returns an `access_token`, `refresh_token`, and expiration time.
7.  **Session Management:** The server will store the tokens securely (e.g., in an HttpOnly cookie) to manage the user's session.
8.  **Authenticated State:** The user is now authenticated and can make requests to the Spotify API using the stored `access_token`.

## Token Refresh Mechanism

Spotify access tokens have a limited lifespan. To maintain a continuous authenticated session without requiring the user to re-authenticate, a token refresh mechanism is implemented:

1.  **Refresh Token Storage:** The `refresh_token` received during the initial code exchange is stored in a long-lived, HttpOnly cookie.
2.  **Expired Access Token:** When an API request to Spotify fails due to an expired `access_token` (or before it expires, proactively), the application can trigger a token refresh.
3.  **Refresh Request:** A client-side call to `/api/auth/refresh-token` is made. This server-side endpoint reads the `refresh_token` from the HttpOnly cookie.
4.  **New Token Exchange:** The server-side endpoint makes a `POST` request to Spotify's `/api/token` endpoint with `grant_type: 'refresh_token'` and the stored `refresh_token`.
5.  **Update Tokens:** Spotify returns a new `access_token` (and potentially a new `refresh_token`). These new tokens are then updated in their respective HttpOnly cookies.
6.  **Retry Original Request:** The original failed API request can then be retried with the new `access_token`.

## Client-Side Token Refresh

To provide a seamless user experience, client-side API calls are wrapped in a custom `fetcher` utility (`src/shared/lib/fetcher.ts`). This utility automatically handles expired access tokens:

1.  **API Request:** An API call is made using the `fetcher`.
2.  **401 Unauthorized:** If the API call returns a `401 Unauthorized` status, it indicates an expired access token.
3.  **Attempt Refresh:** The `fetcher` automatically calls the `/api/auth/refresh-token` endpoint to obtain a new access token.
4.  **Retry Request:** If the token refresh is successful, the original failed API request is retried with the newly acquired access token.
5.  **Redirect on Failure:** If the token refresh itself fails (e.g., due to an expired refresh token or other issues), the user is redirected to the login page to re-authenticate.

## User Context

To make authenticated user information available throughout the client-side application, a React Context mechanism is used:

1.  **Server-Side User Profile Endpoint:** A dedicated API route (`/api/me`) is created to securely fetch the authenticated user's Spotify profile. This endpoint reads the `spotify_access_token` from HttpOnly cookies and uses the `getSpotifyUserProfile` function to retrieve data from Spotify.
2.  **`useSpotifyUser` Hook:** A custom React Hook (`src/features/auth/hooks/use-spotify-user.ts`) utilizes `useSWR` to fetch user data from the `/api/me` endpoint. This hook handles loading, error states, and leverages the `fetcher` utility for automatic token refresh.
3.  **`UserProvider` Component:** A React Context Provider (`src/features/auth/components/user-provider.tsx`) wraps the application's children, making the user data (obtained from `useSpotifyUser`) accessible to any component within its scope.
4.  **Global Availability:** The `UserProvider` is integrated into the root layout (`src/app/layout.tsx`), ensuring that user context is globally available to all client components.

## Components

*   `src/features/auth/components/login-button.tsx`: The client-side component that starts the authentication flow.
*   `src/shared/api/spotify.ts`: Contains functions for interacting with the Spotify API, including generating the initial authorization URL, exchanging the code for a token, triggering a token refresh, and fetching user profile data.
*   `src/app/api/auth/spotify/callback/route.ts`: The server-side API route that handles the callback from Spotify, exchanges the code for a token, and establishes the user session.
*   `src/app/api/auth/refresh-token/route.ts`: The server-side API route responsible for exchanging a `refresh_token` for a new `access_token` and updating the session cookies.
*   `src/app/api/me/route.ts`: The server-side API route to securely fetch the authenticated user's Spotify profile.
*   `src/shared/lib/fetcher.ts`: A utility that wraps client-side `fetch` requests to automatically handle access token expiration and refresh.
*   `src/features/auth/hooks/use-spotify-user.ts`: A React hook for fetching and managing the authenticated Spotify user's profile data.
*   `src/features/auth/components/user-provider.tsx`: A React Context Provider to make the authenticated user's data globally available to client components.
