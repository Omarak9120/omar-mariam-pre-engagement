import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'خطبة عمر ومريم | ٢٦ أيلول ٢٠٢٦',
  description: 'بكلّ الحبّ، ندعوكم لمشاركة عمر عبدالقادر ومريم تليجة حفل خطبتهما، السبت ٢٦ أيلول ٢٠٢٦، الساعة الخامسة مساءً في عكّار العتيقة.',
  icons: { icon: '/favicon.svg' },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
