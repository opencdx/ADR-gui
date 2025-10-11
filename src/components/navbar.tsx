'use client';

import {Key, useCallback, useState} from 'react';
import {useRouter} from 'next/navigation';
import {ChevronDown} from 'lucide-react';
import {useLocale} from 'next-intl';
import {Locale} from '@/config/locale';
import {setUserLocale} from '@/services/locale';

const localeOptions = [
  {key: 'en', label: 'English'},
  {key: 'es', label: 'Spanish'}
] as const;

export function Navbar() {
  const router = useRouter();
  const locale = useLocale();

  const handleAction = useCallback((key: string) => {
    switch (key) {
      case 'logout':
        router.push('/');
        break;
      case 'change_password':
        router.push('/password-change');
        break;
      case 'locale':
        const otherLocale = localeOptions.find(option => option.key !== locale)?.key;
        if (otherLocale) {
          setUserLocale(otherLocale);
        }
        break;
    }
  }, [router, locale]);

  return (
    <nav className="flex justify-end items-center px-6 py-3 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 rounded-tl-2xl">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">John Doe</span>
        <div className="relative group">
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="User menu"
          >
            <ChevronDown size={16} />
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <button
              onClick={() => handleAction('locale')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <span className="text-sm">{localeOptions.find(option => option.key !== locale)?.label}</span>
            </button>
            <button
              onClick={() => handleAction('change_password')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <span className="text-sm">Change Password</span>
            </button>
            <button
              onClick={() => handleAction('logout')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left rounded-b-lg"
            >
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
