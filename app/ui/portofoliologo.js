import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "./fonts";
import Image from "next/image";
import profilPic from "/app/ui/aqila.png";
export default function PortofolioLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src={profilPic}
        alt="logoAqila"
        className="h-12 w-12 rotate-[15deg]"
        width="auto"
        height="auto"
      />
      <p className="text-[40px] sm:text-[30px]">Portofolio</p>
    </div>
  );
}
