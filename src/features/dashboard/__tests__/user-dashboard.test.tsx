import { render, screen } from '@testing-library/react';
import { UserDashboard } from '@/features/dashboard/components/user-dashboard';
import { useUser } from '@/features/auth/components/user-provider';
import '@testing-library/jest-dom';
import i18n from '@/shared/lib/i18n';
import { I18nextProvider } from 'react-i18next';

jest.mock('@/features/auth/components/user-provider', () => ({
  useUser: jest.fn(),
}));

describe('UserDashboard', () => {
  beforeEach(() => {
    i18n.changeLanguage('en');
  });

  it('renders loading state', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      isLoading: true,
      isError: null,
    });
    render(
      <I18nextProvider i18n={i18n}>
        <UserDashboard />
      </I18nextProvider>
    );
    expect(screen.getByText('Loading user data...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
      isError: new Error('Failed to fetch'),
    });
    render(
      <I18nextProvider i18n={i18n}>
        <UserDashboard />
      </I18nextProvider>
    );
    expect(screen.getByText('Error loading user data.')).toBeInTheDocument();
  });

  it('renders not logged in state', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
      isError: null,
    });
    render(
      <I18nextProvider i18n={i18n}>
        <UserDashboard />
      </I18nextProvider>
    );
    expect(screen.getByText('Not logged in.')).toBeInTheDocument();
  });

  it('renders user welcome message when logged in', () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { display_name: 'Test User' },
      isLoading: false,
      isError: null,
    });
    render(
      <I18nextProvider i18n={i18n}>
        <UserDashboard />
      </I18nextProvider>
    );
    expect(screen.getByText('Welcome, Test User')).toBeInTheDocument();
  });
});
