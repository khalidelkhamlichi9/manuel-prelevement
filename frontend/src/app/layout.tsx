import { Poppins } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { SearchProvider } from '@/context/SearchContext';
import { AuthProvider } from '@/context/AuthContext';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://cbw-manuel.ma'),
  title: {
    template: '%s | Manuel de Prélèvement - CBW',
    default: 'Manuel de prélèvement - CBW | Guide des Examens de Biologie',
  },
  description: 'Manuel de prélèvement du Laboratoire Centre de Biologie Al Wifak (CBW). Consultez notre catalogue d\'examens, recommandations et protocoles de prélèvement.',
  keywords: ['laboratoire', 'biologie', 'examen médical', 'prélèvement', 'CBW', 'Témara', 'Al Wifak'],
  authors: [{ name: 'CBW' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://cbw-manuel.ma',
    siteName: 'Manuel de Prélèvement CBW',
    title: 'Manuel de Prélèvement - CBW',
    description: 'Guide complet des examens de biologie médicale et recommandations de prélèvement.',
    images: [
      {
        url: '/CBW/images/LogoCBW.png',
        width: 800,
        height: 600,
        alt: 'CBW Logo',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#26AAD9',
};




const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${poppins.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <AuthProvider>
            <SearchProvider>
              <SidebarProvider>{children}</SidebarProvider>
            </SearchProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
