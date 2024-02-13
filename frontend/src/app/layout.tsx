import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { Navbar } from "./_components/Navbar";
import Script from "next/script";
import { AOSInit } from "./_components/aos";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AOSInit />
      <body className={`font-sans ${inter.variable}`}>
        <header>
          <Navbar />
        </header>
        {children}
        <Script src="bower_components/aos/dist/aos.js" />
      </body>
    </html>
  );
}
