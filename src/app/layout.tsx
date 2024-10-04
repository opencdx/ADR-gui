import 'ui-library/styles/globals.css'

import { Metadata, Viewport } from 'next';

import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import clsx from 'clsx';

import { Providers } from './providers';
import { Navbar } from '@/components/navbar';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <div className="relative flex flex-col h-screen">
          <main>

            <Providers
              themeProps={{ attribute: 'class', defaultTheme: 'light', children }}
            >
              <PrimeReactProvider>
                <NextIntlClientProvider messages={messages}>

                  <div className="flex h-screen w-screen overflow-hidden bg-neutral-900 transition-all duration-300 ease-in-out">
                    <div className="flex flex-col flex-1 bg-white">
                      <Navbar />
                      <div className="bg-white w-screen h-screen">
                        <div className="h-[calc(100vh-64px)] overflow-auto flex flex-col flex-grow  bg-[#F4F9FF] dark:bg-[#1a1a1a]">
                          {children}
                        </div>
                      </div>
                    </div>
                  </div>
                  <ToastContainer />
                </NextIntlClientProvider>
              </PrimeReactProvider>
            </Providers>
          </main>
        </div>

      </body>
    </html>
  );
}

// Can be imported from a shared config
const locales = ['en', 'es'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
