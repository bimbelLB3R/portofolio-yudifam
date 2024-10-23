export const dynamic = 'force-dynamic';
import { delDataSheet, getDataSheet } from "@/app/lib/data";
import { inter } from "@/app/ui/fonts";
import { Suspense } from "react";
import { CardsSkeleton } from "@/app/ui/skeletons";
import { CardWrapper } from "@/app/ui/dashboard/cards";
import { signIn, auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  // console.log(session);
  // if (!session) {
  //   redirect("/api/auth/signin");
  // }
  // export default function Page() {
  // const newRow = {
  //   tanggal: "2024-03-17",
  //   aktivitas: "Libur di rumahkuuuu",
  //   cerita: "Seru sekaliiiii",
  // };
  // const data = await getDataSheet();
  // await appendToSpreadsheet(newRow);
  // await delDataSheet(newRow.tanggal);
  // await updateDataSheet(newRow);
  return (
    <>
      {session ? (
        `Selamat Datang ${session.user.name}`
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
