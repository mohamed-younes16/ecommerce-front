
import { ReactNode } from "react";
import Footer from "@/components/Footer";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {


  return (
    <>
      {children}
      <Footer />
    </>
  );
}
