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
        url: "https://scontent.fbpn4-1.fna.fbcdn.net/v/t39.30808-6/404791741_815725437230546_6533993106923009372_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFWFhzNFSyH8nGgJedVWEEeZJ0WooSvSvlknRaihK9K-Qe0PAPeRoWaerg_heETxgS4Jui-LG23VySvOIlpbtGQ&_nc_ohc=V279QCE1zSEQ7kNvgHWEi2I&_nc_zt=23&_nc_ht=scontent.fbpn4-1.fna&_nc_gid=AilWj5_nGsrEc-aOJgGdZTr&oh=00_AYCdvZigVKB4Ry5v264aDeavvCFY_uZGOE1vqx9cQN83Xw&oe=67257A64",
        width: 800,
        height: 600,
        alt: "Tim Guru",
      },
    ],
  },
  icons: {
    icon: "https://iss-satt.id/web/image/747-12fa8b55/SATT.png", // Path ke favicon Anda
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
