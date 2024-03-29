import DefinisiBakatForm from "@/app/ui/bakat/definisi-form";
import Breadcrumbs from "@/app/ui/bakat/bread-crumbs";
import { getBakatDataByDefinisi, getBakatDataByNama } from "@/app/lib/data";

export default async function Page({ params }) {
  //params berisi jenisBakat
  const jenisBakat = params.idBakat;
  const bakatByDefinisi = await getBakatDataByDefinisi(jenisBakat); //bakat berdasar nama
  //   const detailBakatByDefinisi1 = bakatByDefinisi.map((item) => item.definisi1);
  //   const detailBakatByDefinisi2 = bakatByDefinisi.map((item) => item.definisi2);
  //   const detailBakatByDefinisi3 = bakatByDefinisi.map((item) => item.definisi3);
  const detailBakatByDefinisi = bakatByDefinisi.map((item) => [
    item.definisi1,
    item.definisi2,
    item.definisi3,
    item.jenisBakat,
  ]);

  //   console.log(dataanaks);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Bakat", href: "/dashboard/bakat" },
          {
            label: "Definisi",
            href: `/dashboard/bakat/${jenisBakat}/definisi`,
            active: true,
          },
        ]}
      />
      <DefinisiBakatForm detailBakatByDefinisi={detailBakatByDefinisi} />
    </main>
  );
}
