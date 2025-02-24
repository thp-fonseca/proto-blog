import '@workspace/ui/globals.css'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

import { Inter } from 'next/font/google'
import Navigation from '@/components/navigation'

const inter = Inter({ subsets: ["latin"] })

import { Providers } from './providers'

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Navigation />
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
