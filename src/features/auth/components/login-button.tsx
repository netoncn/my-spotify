'use client';

import { getSpotifyAuthUrl } from '@/shared/api/spotify';
import { useTranslation } from 'react-i18next';

export function LoginButton() {
  const { t } = useTranslation();
  const handleLogin = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  return (
    <button
      onClick={handleLogin}
      className="px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200"
    >
      {t('login_with_spotify')}
    </button>
  );
}
