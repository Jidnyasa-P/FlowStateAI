import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { Navbar } from '@/components/navbar'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FlowState — AI Productivity Optimization',
  description: 'Monitor your energy levels and get intelligent recommendations to optimize productivity while preventing burnout.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
