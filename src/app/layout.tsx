import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import Head from "next/head";
// import { usePathname } from "next/navigation";

import NextAuthProvider from "@/providers/NextAuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Paw Match App",
  description: "Find the right match for your pet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();
  // const noNavbarRoutes = ["/auth/login", "/auth/register", "/other-page"];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
