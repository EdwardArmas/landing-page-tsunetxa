import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const sans = localFont({ src: './fonts/geist.woff2', variable: '--font-geist-sans', weight: '100 900', display: 'swap' });
const mono = localFont({ src: './fonts/geist-mono.woff2', variable: '--font-geist-mono', weight: '100 900', display: 'swap' });
export const metadata: Metadata = { title: 'Tsunexa — People. Assets. Possibilities.', description: 'A connected approach to asset management, maintenance and business operations. Explore the Tsunexa platform in development.', icons: { icon: '/favicon.svg' } };
export default function RootLayout({children}: {children: React.ReactNode}) {return <html lang="en" className={`${sans.variable} ${mono.variable}`}><body>{children}</body></html>}
