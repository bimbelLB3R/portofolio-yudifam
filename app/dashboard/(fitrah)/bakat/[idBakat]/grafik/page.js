import GrafikBakatForm from "@/app/ui/bakat/grafik-form";
import Breadcrumbs from "@/app/ui/bakat/bread-crumbs";
import { getBakatDataByNama } from "@/app/lib/data";

export default async function Page({ params }) {
  const namaAnak = params.idBakat;
  const bakatByNama = await getBakatDataByNama(namaAnak); //bakat berdasar nama
  const detailBakatByNama = bakatByNama.map((item) => item.bakat);

  //   console.log(dataanaks);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Bakat", href: "/dashboard/bakat" },
          {
            label: "Grafik",
            href: `/dashboard/bakat/${namaAnak}/grafik`,
            active: true,
          },
        ]}
      />
      <GrafikBakatForm detailBakatByNama={detailBakatByNama} />
    </main>
  );
}
