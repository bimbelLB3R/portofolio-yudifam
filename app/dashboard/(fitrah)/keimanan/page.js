import Pagination from "@/app/ui/keimanan/pagination";
import Search from "@/app/ui/search";
import KeimananTable from "@/app/ui/keimanan/table";
import { CreateKeimanan } from "@/app/ui/keimanan/buttons";
import { lusitana, inter } from "@/app/ui/fonts";
import { BakatsTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { getKeimananData } from "@/app/lib/dataKeimanan";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export const metadata={
  title:"Keimanan"
}

export default async function Keimanan({ searchParams }) {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getKeimananData(query);
  // console.log(totalPages);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center">
        <h1
          className={`${inter.className} text-2xl text-center font-bold text-[#c68e3f]`}
        >
          Fitrah Keimanan
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search jenis ibadah/nama..." />
        <CreateKeimanan />
      </div>
      <Suspense key={query + currentPage} fallback={<BakatsTableSkeleton />}>
        <KeimananTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
