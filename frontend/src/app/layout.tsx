import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { QueryProvider, AuthProvider } from '@/components/providers';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: '전문가 시너지',
    template: '%s | 전문가 시너지',
  },
  description:
    '전문가들이 지식을 공유하고 함께 성장하는 커뮤니티 플랫폼. 멘토링, 포트폴리오, 네트워킹을 한 곳에서.',
  keywords: [
    '전문가',
    '멘토링',
    '포트폴리오',
    '커뮤니티',
    '지식공유',
    '네트워킹',
  ],
  authors: [{ name: '전문가 시너지' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: '전문가 시너지',
    title: '전문가 시너지',
    description:
      '전문가들이 지식을 공유하고 함께 성장하는 커뮤니티 플랫폼',
  },
  twitter: {
    card: 'summary_large_image',
    title: '전문가 시너지',
    description:
      '전문가들이 지식을 공유하고 함께 성장하는 커뮤니티 플랫폼',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white font-sans antialiased dark:bg-gray-950`}
      >
        <AuthProvider>
          <QueryProvider>{children}</QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
