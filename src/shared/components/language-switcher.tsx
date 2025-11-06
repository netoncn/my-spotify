'use client';

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lng = event.target.value;
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  useEffect(() => {
    const storedLng = localStorage.getItem('i18nextLng');
    if (storedLng && storedLng !== i18n.language) {
      i18n.changeLanguage(storedLng);
    }
  }, [i18n]);

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="language-select" className="sr-only">{t('language')}</label>
      <select
        id="language-select"
        onChange={changeLanguage}
        value={i18n.language}
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md
                   bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-none"
      >
        <option value="en">{t('english')}</option>
        <option value="pt-BR">{t('brazilian_portuguese')}</option>
        <option value="es">{t('spanish')}</option>
      </select>
    </div>
  );
}
