import type { Metadata } from 'next'
import { Fira_Sans, Inter } from 'next/font/google'
import { AnimatePresence } from 'framer-motion'
import { SkeletonTheme } from 'react-loading-skeleton'

import AnimatedPageWrapper from '@/components/containers/AnimatedPageWrapper'
import NavBar from '@/components/NavBar'

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
      <body className={FiraSans.className}>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className="min-h-screen max-w-full bg-gray-950 text-white">
            <NavBar />
            <div className="mx-4 max-w-screen-xl pb-4 md:mx-8 xl:mx-auto">
              <AnimatedPageWrapper>{children}</AnimatedPageWrapper>
            </div>
          </div>
        </SkeletonTheme>
      </body>
    </html>
  )
}
