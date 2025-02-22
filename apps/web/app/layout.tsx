import { Inter } from 'next/font/google'
import '@workspace/ui/globals.css'
import { Button } from '@workspace/ui/components/button'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-primary text-primary-foreground p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/feed" className="text-2xl font-bold">SocialApp</Link>
            <div>
              <Button asChild variant="ghost" className="mr-2">
                <Link href="/feed">Feed</Link>
              </Button>
              <Button asChild variant="ghost" className="mr-2">
                <Link href="/profile">Profile</Link>
              </Button>              
            </div>
          </nav>
        </header>
        <main className="container mx-auto mt-8">
          {children}
        </main>
      </body>
    </html>
  )
}