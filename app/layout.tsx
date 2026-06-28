import './globals.css';

export const metadata = {
  title: 'Dequi Local',
  description: 'MVP local para gerar apresentações comerciais em PDF',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
