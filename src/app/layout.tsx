
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Noto_Serif_Bengali } from "next/font/google";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="light">
      <body
        className={`${notoSerifBengali.className} min-h-screen flex flex-col bg-emerald-50 text-slate-900`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}