import '@workspace/ui/globals.css'

import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import { Inter } from 'next/font/google'
import Navigation from '@/components/navigation'

const inter = Inter({ subsets: ["latin"] })

import { Providers } from './providers'
import { Sidebar } from '@/components/sidebar'

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <Navigation />
            <Sidebar />
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
