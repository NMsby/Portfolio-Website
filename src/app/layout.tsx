import type { Metadata } from "next";
import "../styles/globals.css";
import { Inter, Open_Sans } from "next/font/google";
import React from "react";

// Font Setup
const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans',
    display: 'swap',
});

export const metadata: Metadata = {
  title: "Nelson Masbayi Muyodi - Portfolio",
  description: "Software Engineer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}
