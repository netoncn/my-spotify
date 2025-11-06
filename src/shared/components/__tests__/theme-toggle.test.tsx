import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import { ThemeProvider } from '@/shared/components/theme-provider';
import '@testing-library/jest-dom';
import i18n from '@/shared/lib/i18n';
import { I18nextProvider } from 'react-i18next';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    clear: () => { store = {}; },
    removeItem: (key: string) => { delete store[key]; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorageMock.clear();
    i18n.changeLanguage('en');
  });

  it('renders with initial theme from localStorage or system preference', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      </I18nextProvider>
    );
    expect(screen.getByRole('button', { name: /toggle theme/i })).toHaveTextContent('Toggle Theme (Light)');
  });

  it('toggles theme from light to dark', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      </I18nextProvider>
    );
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveTextContent('Toggle Theme (Dark)');

    fireEvent.click(button);
    expect(button).toHaveTextContent('Toggle Theme (Light)');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('toggles theme from dark to light', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      </I18nextProvider>
    );
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveTextContent('Toggle Theme (Light)');

    fireEvent.click(button);
    expect(button).toHaveTextContent('Toggle Theme (Dark)');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
