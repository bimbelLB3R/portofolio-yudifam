import EditKesehatanForm from "@/app/ui/kesehatan/edit-form";
import Breadcrumbs from "@/app/ui/kesehatan/bread-crumbs";
import { getKesehatanDataById } from "@/app/lib/dataKesehatan";
import { fetchDataAnaks } from "@/app/lib/data";

export default async function Page({ params }) {
  const id = params.idKesehatan;
  const [kesehatanById, dataanaks, allJenisKesehatans] = await Promise.all([
    getKesehatanDataById(id),
    fetchDataAnaks(),
  ]);
  // console.log(dataanaks);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Kesehatan", href: "/dashboard/kesehatan" },
          {
            label: "Edit Riwayat Kesehatan",
            href: `/dashboard/kesehatan/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditKesehatanForm kesehatanById={kesehatanById} dataanaks={dataanaks} />
    </main>
  );
}
