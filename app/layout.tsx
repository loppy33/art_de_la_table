import { Providers } from './providers'

import type { Metadata } from "next";
import "./styles/index.sass";
import Header from "./components/Header";
import Footer from "./components/Footer";


export const metadata: Metadata = {
  title: "L'Art de la Table",
  description: "Au service des hôteliers et restaurateurs d'exception",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
