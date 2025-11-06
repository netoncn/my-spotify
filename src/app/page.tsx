'use client';

import { LoginButton } from "@/features/auth/components/login-button";
import { ThemeToggle } from "@/shared/components/theme-toggle";
import { LanguageSwitcher } from "@/shared/components/language-switcher";
import { useTranslation } from 'react-i18next';
import { useUser } from '@/features/auth/components/user-provider';
import { UserDashboard } from '@/features/dashboard/components/user-dashboard';
import { UserPlaylists } from '@/features/dashboard/components/user-playlists';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function HomeContent() {
  const { t } = useTranslation();
  const { user, isLoading } = useUser();
  const searchParams = useSearchParams();
  const authError = searchParams.get('error');

  return (
    <>
      <div className="absolute top-4 right-4 flex space-x-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <main className="flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-6">
          {t('welcome')}
        </h1>
        {authError === 'authentication_failed' && (
          <p className="text-red-500 mb-4">{t('authentication_failed_message')}</p>
        )}
        {isLoading ? (
          <div className="text-gray-700 dark:text-gray-300">{t('loading_user_data')}</div>
        ) : user ? (
          <>
            <UserDashboard />
            <UserPlaylists />
          </>
        ) : (
          <LoginButton />
        )}
      </main>
    </>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <HomeContent />
      </Suspense>
    </div>
  );
}
