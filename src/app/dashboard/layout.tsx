import '@/styles/globals.css';

import { Metadata, Viewport } from 'next';

import { Navbar } from '@/components/navbar';
import TreeView from '@/components/tree-view';
import { siteConfig } from '@/config/site';
import { Divider } from '@nextui-org/react';

import { Providers } from '../providers';
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
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
      <body>
        
    <Providers
      themeProps={{ attribute: 'class', defaultTheme: 'light', children }}
    >
      <NextIntlClientProvider messages={messages}>
      <Navbar />
      <Divider />
      <div className="flex">
        {/* <SideNav /> */}
        <TreeView />
        <div className="w-full overflow-x-auto">
          <div className="sm:h-[calc(99vh-60px)] overflow-auto ">
            <div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
              <div className="w-full md:max-w-6xl">{children}</div>
            </div>
          </div>
        </div>
      </div>
      </NextIntlClientProvider>
    </Providers>

      </body>
    </html>
  );
}
