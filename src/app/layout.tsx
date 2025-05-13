import { IBM_Plex_Mono, Limelight } from 'next/font/google'
import './globals.css'

export const limelight = Limelight({
  variable: '--font-header',
  subsets: ['latin'],
  weight: '400',
})

export const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-body',
  subsets: ['latin'],
  style: 'italic',
  weight: '400',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={ibmPlexMono.className} title={'Le Club de Jazz'}>
      <body>{children}</body>
    </html>
  )
}
