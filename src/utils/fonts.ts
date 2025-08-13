import { IBM_Plex_Mono, Limelight } from 'next/font/google'

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
