import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
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
