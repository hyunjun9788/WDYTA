import '@/styles/globals.css';
import { Gnb } from '@/shared/ui/Menu/Gnb';
import ClientProviders from './clientProviders';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Gnb />
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
