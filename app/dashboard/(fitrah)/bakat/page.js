import Pagination from "@/app/ui/bakat/pagination";
import Search from "@/app/ui/search";
import BakatTable from "@/app/ui/bakat/table";
import { CreateBakat } from "@/app/ui/bakat/buttons";
import { lusitana, inter } from "@/app/ui/fonts";
import { BakatsTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { getBakatData } from "@/app/lib/data";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";


export const metadata={
  title:"Bakat"
}

export default async function Bakat({ searchParams }) {
  const session = await auth();
  // console.log(session)
  if (!session) {
    redirect("/api/auth/signin");
  }
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getBakatData(query);
  // console.log(totalPages);
   
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center">
        <h1
          className={`${inter.className} text-2xl text-center font-bold text-[#c68e3f]`}
        >
          Bakat
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search bakat..." />
        <CreateBakat />
      </div>
      <Suspense key={query + currentPage} fallback={<BakatsTableSkeleton />}>
        <BakatTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
