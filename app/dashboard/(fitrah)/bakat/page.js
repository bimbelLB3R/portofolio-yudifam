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
import fs from 'fs/promises';
import path from 'path';

export default async function Bakat({ searchParams }) {
  const filePath = path.join(process.cwd(), 'app', 'api', 'user.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  // console.log(data.users)
  const session = await auth();
  // console.log(session)
  if (!session) {
    redirect("/api/auth/signin");
  }
  // Ambil email dari session
  const userEmail = session?.user?.email;
  // Mencari user dengan email yang cocok
  const currentUser = data.users.find(user => user.email === userEmail);
  // console.log(currentUser)
  if (!currentUser) {
    // Jika tidak ada user dengan email tersebut, redirect atau tampilkan pesan error
    // redirect("/not-found");  // Sesuaikan dengan halaman error atau penanganan lain
    console.log('User tidak ada');
    redirect("/dashboard");
  }
  const namaKeluarga=currentUser.name;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getBakatData(query,currentUser);
  // console.log(totalPages);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center">
        <h1
          className={`${inter.className} text-2xl text-center font-bold text-blue-600`}
        >
          Bakat
        </h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search bakat..." />
        <CreateBakat />
      </div>
      <Suspense key={query + currentPage} fallback={<BakatsTableSkeleton />}>
        <BakatTable query={query} currentPage={currentPage} session={session} namaKeluarga={namaKeluarga}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
