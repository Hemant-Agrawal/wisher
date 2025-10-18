import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Diwali Wish Creator - Create Beautiful Diwali Wishes',
  description: 'Create personalized Diwali wish pages with beautiful themes and animations. Share your heartfelt messages with loved ones.',
  keywords: 'diwali, wish, greeting, festival, celebration, india, hindu',
  authors: [{ name: 'Diwali Wish Creator' }],
  openGraph: {
    title: 'Diwali Wish Creator',
    description: 'Create personalized Diwali wish pages with beautiful themes and animations.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diwali Wish Creator',
    description: 'Create personalized Diwali wish pages with beautiful themes and animations.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
