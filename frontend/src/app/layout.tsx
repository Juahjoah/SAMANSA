import { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import ReactQueryProvider from '@/utils/react-query-provider';
import Header from '@/components/Header/index';
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
        <Header />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
