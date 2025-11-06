import { render, screen, waitFor } from '@testing-library/react';
import { UserPlaylists } from '@/features/dashboard/components/user-playlists';
import '@testing-library/jest-dom';
import i18n from '@/shared/lib/i18n';
import { I18nextProvider } from 'react-i18next';
import useSWR from 'swr';

jest.mock('swr');

describe('UserPlaylists', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
    (useSWR as jest.Mock).mockReset();
  });

  it('renders loading state', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    render(
      <I18nextProvider i18n={i18n}>
        <UserPlaylists />
      </I18nextProvider>
    );
    expect(screen.getByText('Loading playlists...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error('Failed to fetch playlists'),
      isLoading: false,
    });
    render(
      <I18nextProvider i18n={i18n}>
        <UserPlaylists />
      </I18nextProvider>
    );
    expect(screen.getByText(/Error loading playlists/i)).toBeInTheDocument();
  });

  it('renders no playlists found state', () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: { items: [] },
      error: undefined,
      isLoading: false,
    });
    render(
      <I18nextProvider i18n={i18n}>
        <UserPlaylists />
      </I18nextProvider>
    );
    expect(screen.getByText('No playlists found.')).toBeInTheDocument();
  });

  it('renders playlists when data is available', async () => {
    const mockPlaylists = {
      items: [
        { id: '1', name: 'My Playlist 1' },
        { id: '2', name: 'My Playlist 2' },
      ],
    };
    (useSWR as jest.Mock).mockReturnValue({
      data: mockPlaylists,
      error: undefined,
      isLoading: false,
    });
    render(
      <I18nextProvider i18n={i18n}>
        <UserPlaylists />
      </I18nextProvider>
    );

    expect(screen.getByText('Your Playlists')).toBeInTheDocument();
    expect(screen.getByText('My Playlist 1')).toBeInTheDocument();
    expect(screen.getByText('My Playlist 2')).toBeInTheDocument();
  });
});
