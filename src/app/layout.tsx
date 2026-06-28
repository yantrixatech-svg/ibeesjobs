import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IBees Jobs - Connecting Talent with Opportunities | Recruitment Agency Kerala',
  description: 'IBees Jobs is a premier recruitment agency in Thiruvananthapuram, Kerala. Find the best job opportunities across IT, Healthcare, Finance, Engineering, and 40+ categories. Your career journey starts here.',
  keywords: 'jobs in Kerala, recruitment agency Thiruvananthapuram, job placement Kerala, IBees Jobs, career opportunities Kerala, IT jobs Kerala, healthcare jobs, engineering jobs',
  openGraph: {
    title: 'IBees Jobs - Connecting Talent with Opportunities',
    description: 'Find your dream job with IBees Jobs, Kerala\'s trusted recruitment agency.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'IBees Jobs',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main className="min-h-screen pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
