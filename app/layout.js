import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./ui/sessionWrapper";
import openGraphImage from "/app/ui/timguru.jpg";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "SATT | Portofolio Keluarga",
    template: "%s - SATT Families",
  },
  description: "Rekam jejak berdasarkan FBE dan Talents Mapping",
  openGraph: {
    title: "SATT | Portofolio Keluarga",
    description: "Rekam jejak berdasarkan FBE dan Talents Mapping",
    url: "https://portofolio-yudifam.vercel.app", // ganti dengan URL situs Anda
    images: openGraphImage
  },
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionWrapper>
  );
}
