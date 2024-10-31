export const dynamic = 'force-dynamic';
import { inter } from "@/app/ui/fonts";
import { Suspense } from "react";
import { BakatsTableSkeleton, CardsSkeleton } from "@/app/ui/skeletons";
import { CardWrapper } from "@/app/ui/dashboard/cards";
import { signIn, auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/bakat/pagination";
import { getAktivitasData } from "@/app/lib/dataAktivitas";
import AktivitasTable from "@/app/ui/aktivitas/table";

export default async function Page({ searchParams }) {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getAktivitasData(query);

  return (
    <>
      {session ? (
        <div>
          <p>Selamat Datang Keluarga <span className="font bold text-orange-600">{`${session.user.name}`}</span></p>
          <div className="flex w-full items-center justify-center">
            <h1
              className={`${inter.className} text-2xl text-center font-bold text-blue-600`}
            >
              AKTIVITAS ANAK
            </h1>
          </div>
          {/* <Search placeholder='cari aktivitas ...'/> */}
          <Suspense key={query + currentPage} fallback={<BakatsTableSkeleton />}>
            <AktivitasTable query={query} currentPage={currentPage}/>
          </Suspense>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      ) : (
        <Link
          href={"/api/auth/signin"}
          className={`text-center ${inter.className}`}
        >
          Login With Google
        </Link>
      )}
      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div> */}
    </>
  );
}
