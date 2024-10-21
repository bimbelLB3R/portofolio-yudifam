import Pagination from "@/app/ui/perkembangan/pagination";
import Search from "@/app/ui/search";
import PerkembanganTable from "@/app/ui/perkembangan/table";
import { CreatePerkembangan } from "@/app/ui/perkembangan/buttons";
import { lusitana, inter } from "@/app/ui/fonts";
import { BakatsTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { getPerkembanganData } from "@/app/lib/dataPerkembangan";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { CurrentUserData } from "@/app/lib/data";

export default async function Perkembangan({ searchParams }) {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getPerkembanganData(query);
  const currentUser=await CurrentUserData();
  const namaKeluarga=currentUser.currentUser.name;
  // console.log(totalPages);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center">
        <h1
          className={`${inter.className} text-2xl text-center font-bold text-blue-600`}
        >
          Fitrah Perkembangan
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search kategori/nama..." />
        <CreatePerkembangan />
      </div>
      <Suspense key={query + currentPage} fallback={<BakatsTableSkeleton />}>
        <PerkembanganTable query={query} currentPage={currentPage} namaKeluarga={namaKeluarga}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
