import type { Metadata } from 'next'
import { Fira_Sans } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions'

import {
  GlobalProviders,
  HeaderSection,
  Helpers,
  MainLayout,
  PageLayout,
  ToolTip,
} from '@/components/layout-components'

import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'

// const inter = Inter({ subsets: ['latin'] })
const FiraSans = Fira_Sans({ subsets: ['latin'], weight: '400', display: 'swap' })

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
    <ViewTransitions>
      <html lang="en" className="scroll-smooth">
        <body className={`${FiraSans.className}`}>
          <GlobalProviders>
            <PageLayout>
              <HeaderSection />
              <MainLayout>{children}</MainLayout>
              <Helpers />
              <ToolTip />
            </PageLayout>
          </GlobalProviders>
        </body>
      </html>
    </ViewTransitions>
  )
}
