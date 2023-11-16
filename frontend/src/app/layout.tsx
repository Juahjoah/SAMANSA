import { Metadata } from 'next';
import './globals.css';
import ReactQueryProvider from '@/utils/ReactQueryProvider';
import localFont from 'next/font/local';

const myFont = localFont({
  src: [
    {
      path: './fonts/Pretendard-Thin.woff',
      weight: '100',
    },
    {
      path: './fonts/Pretendard-ExtraLight.woff',
      weight: '200',
    },
    {
      path: './fonts/Pretendard-Light.woff',
      weight: '300',
    },
    {
      path: './fonts/Pretendard-Regular.woff',
      weight: '400',
    },
    {
      path: './fonts/Pretendard-Medium.woff',
      weight: '500',
    },
    {
      path: './fonts/Pretendard-Bold.woff',
      weight: '700',
    },
    {
      path: './fonts/Pretendard-ExtraBold.woff',
      weight: '800',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: `Samansa, 사전을 만드는 사람들`,
  icons: {
    icon: '/favicon.ico',
  },
  description:
    'This is a dictionary where users create their own definitions of words.',
  openGraph: {
    title: {
      absolute: '사만사',
    },
    description: '사용자가 만들어가는 사전, 사만사',
    url: 'https://www.https://samansa.kr/.blog/',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${myFont.className}`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
