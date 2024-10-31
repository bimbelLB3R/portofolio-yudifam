import Pagination from "@/app/ui/belajar/pagination";
import Search from "@/app/ui/search";
import BelajarTable from "@/app/ui/belajar/table";
import { CreateBelajar } from "@/app/ui/belajar/buttons";
import { lusitana, inter } from "@/app/ui/fonts";
import { BakatsTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { getBelajarData } from "@/app/lib/dataBelajar";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export const metadata={
  title:"Belajar"
}

export default async function Belajar({ searchParams }) {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getBelajarData(query);
  // console.log(totalPages);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center">
        <h1
          className={`${inter.className} text-2xl text-center font-bold text-[#c68e3f]`}
        >
          Fitrah Belajar
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search kategori/nama..." />
        <CreateBelajar />
      </div>
      <Suspense key={query + currentPage} fallback={<BakatsTableSkeleton />}>
        <BelajarTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
