import { ThemeProvider } from "@/components/ui/theme-provider";

import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import { Urbanist } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import getCurrentUser from "@/actions/getCurrentUser";

const font = Urbanist({ subsets: ["latin"] });
export const apiLink = process.env.NEXT_PUBLIC_API_URL;
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html suppressHydrationWarning lang="en" className={`${font.className} `}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="admin-theme"
        >
          <div
            suppressHydrationWarning
            className="  min-h-screen dark:bg-[url(/assets/magicdark.svg)] transition-all 
    p-6 pb-0 bg-cover bg-no-repeat bg-fixed   bg-[url(/assets/light-bg.svg)] pt-[calc(100px_+_2rem)]  dark:bg-transparent bg-[#3e3e3efc]
    
  "
          >
            <Analytics />
            <Toaster richColors position="top-center" />
            <NavBar userData={user} />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
