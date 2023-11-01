import { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import ReactQueryProvider from '@/utils/react-query-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Samansa`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
