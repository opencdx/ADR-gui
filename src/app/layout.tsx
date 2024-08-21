import '@/styles/globals.css';

import { Metadata, Viewport } from 'next';

import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import clsx from 'clsx';

import { Providers } from './providers';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/open-logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html suppressHydrationWarning lang={locale}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      </head>
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >

        <Providers
          themeProps={{ attribute: 'class', defaultTheme: 'light', children }}
        >
          <PrimeReactProvider>
            <div className="relative flex flex-col h-screen">
              <main>
                <NextIntlClientProvider messages={messages}>
                  {children}
                </NextIntlClientProvider>
              </main>
            </div>
          </PrimeReactProvider>
        </Providers>

      </body>
    </html>
  );
}

// Can be imported from a shared config
const locales = ['en', 'es'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

