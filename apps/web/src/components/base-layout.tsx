import {Inter} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {ReactNode} from 'react';
import { cn } from "@workspace/ui/lib/utils"
import Navigation from '@/components/navigation';

const inter = Inter({subsets: ['latin']});

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({children, locale}: Readonly<Props>) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale}>
      <body className={cn(inter.className, 'flex h-full flex-col')}>
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
