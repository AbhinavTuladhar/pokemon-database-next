import type { Metadata } from 'next'
import { Fira_Sans } from 'next/font/google'
import { SkeletonTheme } from 'react-loading-skeleton'

import AnimatedPageWrapper from '@/components/containers/AnimatedPageWrapper'
import Header from '@/components/Header'
import Navbar from '@/components/navbar'

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
        <SkeletonTheme baseColor="#2f333c" highlightColor="#444">
          <div className="min-h-screen max-w-full bg-gray-800 text-white">
            <Header />
            <div className="mx-0 max-w-screen-xl md:mx-8 xl:mx-auto">
              <Navbar />
            </div>
            <div className="mx-4 max-w-screen-xl pb-4 md:mx-8 xl:mx-auto">
              <AnimatedPageWrapper>{children}</AnimatedPageWrapper>
            </div>
          </div>
        </SkeletonTheme>
      </body>
    </html>
  )
}
