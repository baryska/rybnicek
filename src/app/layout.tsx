import type { Metadata } from "next";
import styles from "./page.module.css";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import "./globals.css";
import Menu from "@/components/Menu";


export const metadata: Metadata = {
  title: "Berounský rybníček",
  description: "Dění v Berouně a okolí",
  icons: {
    icon: "/logo_orange.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>
        <Menu />
        {children}
        <footer className={styles.footer}>
          © 2025 Berounský rybníček
        </footer>
      </body>
    </html>
  );
}
