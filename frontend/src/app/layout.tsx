import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';
import { ToastProvider } from '@/providers/ToastProvider';
import AuthProvider from '@/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'Price Drop Alert Tool',
  description: 'Track daily price changes, visualize live history, and get instant target alerts.',
  authors: [{ name: 'OpenAI Codex' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Manrope:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-screen antialiased">
        <QueryProvider>
          <ToastProvider>
            <AuthProvider>{children}</AuthProvider>
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
