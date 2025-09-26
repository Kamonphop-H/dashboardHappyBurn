/** @format */

import type { Metadata } from "next";
import { Inter, Sarabun } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sarabun = Sarabun({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-sarabun",
});

export const metadata: Metadata = {
  title: "Happy Burn Admin | โรงพยาบาลนครธน",
  description: "ระบบจัดการและตรวจสอบข้อมูล Happy Burn Challenge",
  keywords: ["admin", "dashboard", "happy burn", "นครธน", "โรงพยาบาล"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='th' className={`${inter.variable} ${sarabun.variable}`}>
      <head>
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
          crossOrigin='anonymous'
        />
      </head>
      <body className='font-sarabun antialiased bg-[var(--nkt-bg)]'>
        <Providers>
          {children}
          <Toaster
            position='top-right'
            toastOptions={{
              style: {
                fontFamily: "var(--font-sarabun)",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
