import EditBelajarForm from "@/app/ui/belajar/edit-form";
import Breadcrumbs from "@/app/ui/belajar/bread-crumbs";
import {
  getAllKategoriBelajar,
  getBelajarDataById,
} from "@/app/lib/dataBelajar";
import { fetchDataAnaks } from "@/app/lib/data";

export default async function Page({ params }) {
  const id = params.idBelajar;
  const [belajarById, dataanaks, datakategoris] = await Promise.all([
    getBelajarDataById(id),
    fetchDataAnaks(),
    getAllKategoriBelajar(),
  ]);
  // console.log(dataanaks);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Belajar", href: "/dashboard/belajar" },
          {
            label: "Edit Data Belajar",
            href: `/dashboard/belajar/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditBelajarForm
        belajarById={belajarById}
        dataanaks={dataanaks}
        datakategoris={datakategoris}
      />
    </main>
  );
}
