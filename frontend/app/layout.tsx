import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import { Metadata } from "next";
export const metadata :Metadata={
  title:"ProCounsel",
  description:"ProCounsel platform for students to connect with counsellors in the neighborhood."
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Header/>
      <body>{children}</body>
      <Footer/>
    </html>
  );
}
