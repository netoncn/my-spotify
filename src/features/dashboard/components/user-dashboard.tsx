'use client';

import { useUser } from '@/features/auth/components/user-provider';
import { useTranslation } from 'react-i18next';

export function UserDashboard() {
  const { user, isLoading, isError } = useUser();
  const { t } = useTranslation();

  if (isLoading) {
    return <div className="text-gray-700 dark:text-gray-300">{t('loading_user_data')}</div>;
  }

  if (isError) {
    return <div className="text-red-500">{t('error_loading_user_data')}</div>;
  }

  if (!user) {
    return <div className="text-gray-700 dark:text-gray-300">{t('not_logged_in')}</div>;
  }

  return (
    <div className="text-center my-4">
      <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
        {t('welcome_user', { userName: user.display_name })}
      </h2>
    </div>
  );
}