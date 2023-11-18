import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { Nunito_Sans } from 'next/font/google'
import ClientOnly from './components/ClientOnly'
import SellModal from './components/modals/SellModal';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer';
import ToastProvider from './providers/ToastProvider';
import getCurrentUser from './actions/getCurrentUser';

const font = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: 'Plate Pilot',
  description: 'Find the most related comment for your restaurant',
}

export default async function RootLayout({children}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToastProvider />
          <SellModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pt-20">{children}</div>
        <ClientOnly>
          <Footer />
        </ClientOnly>
        <Analytics />
      </body>
    </html>
  )
}
