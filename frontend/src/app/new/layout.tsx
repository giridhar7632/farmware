import "@/styles/globals.css";

import { Roboto } from "next/font/google";
import Script from "next/script";
import { Metadata } from "next";

const roboto = Roboto({
  weight: ["400", "700", "900"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Farmware | Get to know your farm"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} min-h-screen`}>
        {children}
        <Script src="bower_components/aos/dist/aos.js" />
      </body>
    </html>
  );
}
