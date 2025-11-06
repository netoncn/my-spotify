import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageSwitcher } from '@/shared/components/language-switcher';
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

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    localStorageMock.clear();
    i18n.changeLanguage('en'); // Reset language for each test
  });

  it('renders language buttons', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Brazilian Portuguese')).toBeInTheDocument();
    expect(screen.getByText('Spanish')).toBeInTheDocument();
  });

  it('changes language to pt-BR when Brazilian Portuguese button is clicked', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );
    const ptBrButton = screen.getByText('Brazilian Portuguese');
    fireEvent.click(ptBrButton);
    expect(i18n.language).toBe('pt-BR');
    expect(localStorage.getItem('i18nextLng')).toBe('pt-BR');
  });

  it('changes language to es when Spanish button is clicked', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );
    const esButton = screen.getByText('Spanish');
    fireEvent.click(esButton);
    expect(i18n.language).toBe('es');
    expect(localStorage.getItem('i18nextLng')).toBe('es');
  });

  it('loads language from localStorage on mount', () => {
    localStorage.setItem('i18nextLng', 'es');
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSwitcher />
      </I18nextProvider>
    );
    expect(i18n.language).toBe('es');
  });
});
