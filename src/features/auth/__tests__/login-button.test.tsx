import { render, screen } from '@testing-library/react';
import { LoginButton } from '@/features/auth/components/login-button';
import '@testing-library/jest-dom';

jest.mock('@/shared/api/spotify', () => ({
  getSpotifyAuthUrl: jest.fn(() => 'https://mock-spotify-auth-url.com'),
}));

describe('LoginButton', () => {
  it('renders a login button', () => {
    render(<LoginButton />);
    const button = screen.getByRole('button', { name: /login with spotify/i });
    expect(button).toBeInTheDocument();
  });
});
