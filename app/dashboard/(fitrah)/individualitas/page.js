import Pagination from "@/app/ui/individualitas/pagination";
import Search from "@/app/ui/search";
import IndividualitasTable from "@/app/ui/individualitas/table";
import { CreateIndividualitas } from "@/app/ui/individualitas/buttons";
import { lusitana, inter } from "@/app/ui/fonts";
import { BakatsTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { getIndividualitasData } from "@/app/lib/dataIndividualitas";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { CurrentUserData } from "@/app/lib/data";

export default async function Individualitas({ searchParams }) {
  const session = await auth();
  const currentUser=await CurrentUserData();
  if (!session) {
    redirect("/api/auth/signin");
  }
  
  if(!currentUser){
    redirect("/dashboard");
  }
  const namaKeluarga=currentUser.currentUser.name;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getIndividualitasData(query);
    // console.log(totalPages);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center">
        <h1
          className={`${inter.className} text-2xl text-center font-bold text-blue-600`}
        >
          Fitrah Individualitas
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search kategori/nama..." />
        <CreateIndividualitas />
      </div>
      <Suspense key={query + currentPage} fallback={<BakatsTableSkeleton />}>
        <IndividualitasTable query={query} currentPage={currentPage} namaKeluarga={namaKeluarga}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
