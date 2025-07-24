import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "./page.module.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className={styles.footer}>
        © {new Date().getFullYear()} Berounský rybníček
      </footer>
      </body>
    </html>
  );
}
