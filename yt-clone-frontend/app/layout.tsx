import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBard from "./_components/navbar";
import {Toaster} from '@/components/ui/sonner';
import Footer from "./_components/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouTube Clone",
  description: "Backend Focused Youtube Clone",
  icons:{
    icon:[
      {
        url:"/youtube-logo.svg",
        href:"/youtube-logo.svg"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <NavBard />
        {children}
        <Footer />
        </body>
    </html>
  );
}
