import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./ui/sessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Yudi's Fams Portofolio",
  description: "Rekam jejak berdasarkan FBE",
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
