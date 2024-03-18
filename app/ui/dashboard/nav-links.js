"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  AcademicCapIcon,
  BookOpenIcon,
  SunIcon,
  FireIcon,
  EyeDropperIcon,
  HeartIcon,
  StarIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Keimanan",
    href: "/dashboard/keimanan",
    icon: FireIcon,
  },
  {
    name: "Bakat dan Kepemimpinan",
    href: "/dashboard/bakat",
    icon: AcademicCapIcon,
  },
  { name: "Belajar", href: "/dashboard/belajar", icon: BookOpenIcon },
  {
    name: "Perkembangan",
    href: "/dashboard/perkembangan",
    icon: SunIcon,
  },
  {
    name: "Kesehatan",
    href: "/dashboard/kesehatan",
    icon: EyeDropperIcon,
  },
  {
    name: "Seksualitas dan Cinta",
    href: "/dashboard/seksualitas",
    icon: HeartIcon,
  },
  {
    name: "Estetika dan Bahasa",
    href: "/dashboard/estetika",
    icon: StarIcon,
  },
  {
    name: "Individualitas dan Sosialitas",
    href: "/dashboard/individualitas",
    icon: FaceSmileIcon,
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
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
