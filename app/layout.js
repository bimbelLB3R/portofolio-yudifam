import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./ui/sessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SATT | Portofolio Keluarga",
  description: "Rekam jejak berdasarkan FBE dan Talents Mapping",
  openGraph: {
    images: [
      {
        url: "/app/ui/timguru.jpg",
        width: 800,
        height: 600,
        alt: "Tim Guru",
      },
    ],
  },
  icons: {
    icon: "/ui/logosattsd.png", // Path ke favicon Anda
  }
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
