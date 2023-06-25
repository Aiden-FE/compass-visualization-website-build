import '@/assets/styles/globals.scss';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script src="https://cdn.jsdelivr.net/npm/systemjs@6.14.1/dist/system.min.js" />
        {children}
      </body>
    </html>
  );
}