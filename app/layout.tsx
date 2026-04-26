import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const syne = Syne({ subsets: ['latin'], weight: ['400','600','700','800'], variable: '--font-display' })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300','400','500'], style: ['normal','italic'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'IBIZ Digital Solutions, LLC | AI · Cybersecurity · Digital Modernization',
  description: 'IBIZ Digital Solutions helps government contractors and regulated organizations adopt AI responsibly, achieve CMMC compliance, and modernize operations.',
  keywords: ['CMMC consulting','AI governance','cybersecurity compliance','digital modernization','government contracting','defense contractor','SAM.gov small business'],
  openGraph: {
    title: 'IBIZ Digital Solutions, LLC',
    description: 'AI. Cybersecurity. Digital Modernization. One integrated practice.',
    url: 'https://www.ibizdigitalsolutions.com',
    siteName: 'IBIZ Digital Solutions',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
