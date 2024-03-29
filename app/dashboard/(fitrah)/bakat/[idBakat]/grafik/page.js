import Breadcrumbs from "@/app/ui/bakat/bread-crumbs";
import { getBakatDataByNama } from "@/app/lib/data";
import GrafikBakatFormKelemahan from "@/app/ui/bakat/grafik-formKelemahan";
import GrafikBakatForm from "@/app/ui/bakat/grafik-form";
import GrafikBakatFormKlusterBakat from "@/app/ui/bakat/grafik-formKlusterBakat";

export default async function Page({ params }) {
  const namaAnak = params.idBakat;
  const bakatByNama = await getBakatDataByNama(namaAnak); //bakat berdasar nama
  const bakatKekuatan = bakatByNama.kekuatan;
  const bakatKelemahan = bakatByNama.kelemahan;
  const klusterBakat = bakatByNama.klusterBakat;
  const detailBakatByNama = bakatKekuatan.map((item) => item.bakat);
  const detailBakatByNamaKelemahan = bakatKelemahan.map((item) => item.bakat);
  // console.log(detailBakatByNamaKelemahan);
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
      <p className="text-center font-bold text-gray-500">7 BAKAT DOMINAN</p>
      <GrafikBakatForm detailBakatByNama={detailBakatByNama} />
      <p className="text-center font-bold text-gray-500 mt-6">
        7 BAKAT TIDAK DOMINAN
      </p>
      <GrafikBakatFormKelemahan
        detailBakatByNamaKelemahan={detailBakatByNamaKelemahan}
      />
      <p className="text-center font-bold text-gray-500 mt-6">KLUSTER BAKAT</p>
      <GrafikBakatFormKlusterBakat klusterBakat={klusterBakat} />
    </main>
  );
}
