import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "./fonts";
import Image from "next/image";
import profilPic from "/app/ui/logosattsd.png";
export default function PortofolioLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white space-x-2`}
    >
      <Image
        src={profilPic}
        alt="logoAqila"
        className="h-12 w-12"
        width="auto"
        height="auto"
      />
      <p className="text-[40px] sm:text-[30px] text-green-800">Portofolio</p>
    </div>
  );
}
