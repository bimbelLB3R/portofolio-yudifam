import Pagination from "@/app/ui/kesehatan/pagination";
import Search from "@/app/ui/search";
import KesehatanTable from "@/app/ui/kesehatan/table";
import { CreateKesehatan } from "@/app/ui/kesehatan/buttons";
import { lusitana, inter } from "@/app/ui/fonts";
import { BakatsTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { getKesehatanData } from "@/app/lib/dataKesehatan";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export const metadata={
  title:"Kesehatan"
}

export default async function Kesehatan({ searchParams }) {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getKesehatanData(query);
  // console.log(totalPages);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center">
        <h1
          className={`${inter.className} text-2xl text-center font-bold text-[#c68e3f]`}
        >
          Riwayat Kesehatan
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search jenis penyakit/nama..." />
        <CreateKesehatan />
      </div>
      <Suspense key={query + currentPage} fallback={<BakatsTableSkeleton />}>
        <KesehatanTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
