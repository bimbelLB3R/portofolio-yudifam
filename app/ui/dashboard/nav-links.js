"use client";

import {
  GenderMale,
  GraphUpArrow,
  SignpostSplit,
  ThermometerHalf,
  Ubuntu,
  HeartPulse,
  Book,
  BatteryCharging,
  HouseDoor,
} from "react-bootstrap-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HouseDoor },
  {
    name: "Keimanan",
    href: "/dashboard/keimanan",
    icon: BatteryCharging,
  },
  {
    name: "Bakat dan Kepemimpinan",
    href: "/dashboard/bakat",
    icon: SignpostSplit,
  },
  { name: "Belajar", href: "/dashboard/belajar", icon: Book },
  {
    name: "Perkembangan",
    href: "/dashboard/perkembangan",
    icon: GraphUpArrow,
  },
  {
    name: "Kesehatan",
    href: "/dashboard/kesehatan",
    icon: ThermometerHalf,
  },
  {
    name: "Seksualitas dan Cinta",
    href: "/dashboard/seksualitas",
    icon: GenderMale,
  },
  {
    name: "Estetika dan Bahasa",
    href: "/dashboard/estetika",
    icon: HeartPulse,
  },
  {
    name: "Individualitas dan Sosialitas",
    href: "/dashboard/individualitas",
    icon: Ubuntu,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-stone-50 p-3 text-sm font-medium hover:bg-[#c68e3f]/50 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-[#c68e3f]/50 text-green-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6 text-xl" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
