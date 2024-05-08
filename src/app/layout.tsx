import type { Metadata } from 'next'
import { Fira_Sans } from 'next/font/google'
import { SkeletonTheme } from 'react-loading-skeleton'

import { Tooltip } from '@/components/client-components'
import { AnimatedPageWrapper } from '@/components/containers'
import Header from '@/components/header'
import Navbar from '@/components/navbar'
import Scroll from '@/components/scroll'

import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'

// const inter = Inter({ subsets: ['latin'] })
const FiraSans = Fira_Sans({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Pokémon Database clone',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${FiraSans.className} dark`}>
        <SkeletonTheme baseColor="#2f333c" highlightColor="#444">
          <Scroll />
          <Tooltip id="my-tooltip" style={{ fontSize: '0.75rem' }} />
          <div className="min-h-screen max-w-full bg-neutral-50 text-black dark:bg-gray-800 dark:text-white">
            <Header />
            <div className="mx-0 max-w-screen-xl md:mx-8 xl:mx-auto xl:px-8">
              <Navbar />
            </div>
            <div className="mx-4 max-w-screen-xl pb-4 md:mx-8 xl:mx-auto xl:px-8">
              <AnimatedPageWrapper>{children}</AnimatedPageWrapper>
            </div>
          </div>
        </SkeletonTheme>
      </body>
    </html>
  )
}
