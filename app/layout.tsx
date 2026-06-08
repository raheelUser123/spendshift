import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'SpendShift', description: 'Find your biggest money leaks in under 2 minutes.' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
