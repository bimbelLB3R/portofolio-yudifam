import Pagination from "@/app/ui/seksualitas/pagination";
import Search from "@/app/ui/search";
import SeksualitasTable from "@/app/ui/seksualitas/table";
import { CreateSeksualitas } from "@/app/ui/seksualitas/buttons";
import { lusitana, inter } from "@/app/ui/fonts";
import { BakatsTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { getSeksualitasData } from "@/app/lib/dataSeksualitas";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export const metadata={
  title:"Seksualitas"
}

export default async function Seksualitas({ searchParams }) {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getSeksualitasData(query);
  // console.log(totalPages);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center">
        <h1
          className={`${inter.className} text-2xl text-center font-bold text-blue-600`}
        >
          Fitrah Seksualitas
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search kategori/nama..." />
        <CreateSeksualitas />
      </div>
      <Suspense key={query + currentPage} fallback={<BakatsTableSkeleton />}>
        <SeksualitasTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
