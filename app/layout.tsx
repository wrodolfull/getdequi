import './globals.css';

export const metadata = {
  title: 'Get Dequi',
  description: 'Painel para criar, organizar e compartilhar apresentações comerciais Dequi',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
