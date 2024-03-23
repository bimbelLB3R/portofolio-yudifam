import EditPerkembanganForm from "@/app/ui/perkembangan/edit-form";
import Breadcrumbs from "@/app/ui/perkembangan/bread-crumbs";
import {
  getAllKategoriPerkembangan,
  getPerkembanganDataById,
} from "@/app/lib/dataPerkembangan";
import { fetchDataAnaks } from "@/app/lib/data";

export default async function Page({ params }) {
  const id = params.idPerkembangan;
  const [perkembanganById, dataanaks] = await Promise.all([
    getPerkembanganDataById(id),
    fetchDataAnaks(),
  ]);
  // console.log(dataanaks);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Perkembangan", href: "/dashboard/perkembangan" },
          {
            label: "Edit Data ",
            href: `/dashboard/perkembangan/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditPerkembanganForm
        perkembanganById={perkembanganById}
        dataanaks={dataanaks}
      />
    </main>
  );
}
