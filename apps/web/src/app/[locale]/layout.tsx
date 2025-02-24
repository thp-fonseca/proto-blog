import '@workspace/ui/globals.css'

import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

import { Inter } from "next/font/google"
import Navigation from '@/components/navigation';

const inter = Inter({ subsets: ["latin"] })

export default async function LocaleLayout({ children,
  params }: Readonly<{ children: React.ReactNode, params: {locale: string};
}>) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Navigation />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}