import './globals.css'
import { ibmPlexMono } from '@/utils/fonts'

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
