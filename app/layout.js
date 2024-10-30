import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./ui/sessionWrapper";
import openGraph from '/app/timguru.jpg'


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:{
    default:"SATT | Portofolio Keluarga",
    template:"%s - SATT Families"
  } ,
  description: "Rekam jejak berdasarkan FBE dan Talents Mapping",
  openGraph:{
    url:{openGraph}
  }
  
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        {/* <Header/> */}
        <body className={inter.className}>{children}</body>
        {/* <Footer/> */}
      </html>
    </SessionWrapper>
  );
}
