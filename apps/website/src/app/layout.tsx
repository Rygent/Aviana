import * as React from 'react';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { fontHeading, geistMono, geistSans } from '@/styles/fonts.ts';
import { siteConfig } from '@/config';
import { cn } from '@elvia/utils';
import '@elvia/ui/styles/shared-globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.global.name,
    template: `%s | ${siteConfig.global.name}`
  },
  description: siteConfig.global.description,
  creator: siteConfig.global.creator,
  icons: {
    icon: '/favicon.ico'
    // shortcut: '/favicon-16x16.png',
    // apple: '/apple-touch-icon.png'
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ]
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(`font-sans antialiased`, geistSans.variable, geistMono.variable, fontHeading.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}