export const dynamic = 'force-dynamic';
import appendToSpreadsheet, {
  delDataSheet,
  getDataSheet,
  updateDataSheet,
} from "./lib/data";
import { lusitana, inter } from "./ui/fonts";
import { Suspense } from "react";
import { CardsSkeleton } from "./ui/skeletons";
import { CardWrapper } from "./ui/dashboard/cards";

export default async function Home() {
  const newRow = {
    tanggal: "2024-03-17",
    aktivitas: "Libur di rumahkuuuu",
    cerita: "Seru sekaliiiii",
  };
  // const data = await getDataSheet();
  // await appendToSpreadsheet(newRow);
  // await delDataSheet(newRow.tanggal);
  // await updateDataSheet(newRow);
  return (
    <>
      <p className={`text-center ${inter.className}`}>HOME</p>;
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
    </>
  );
}
