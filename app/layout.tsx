import { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "@radix-ui/themes/styles.css";
import { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import { Urbanist } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const font = Urbanist({ subsets: ["latin"] });
export const revalidate = 3600;
export const apiLink = process.env.NEXT_PUBLIC_API_URL;
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className={`${font.className} `}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        storageKey="admin-theme"
      >
        <body
          suppressHydrationWarning
          className="  min-h-screen dark:bg-[url(/assets/magicdark.svg)] transition-all 
        p-6 bg-cover bg-no-repeat   bg-[url(/assets/light-bg.svg)] pt-[calc(100px_+_2rem)]  dark:bg-transparent bg-[#3e3e3efc]
        
      "
        >
          <Toaster richColors position="top-center" />

          <NavBar />

          {children}
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
