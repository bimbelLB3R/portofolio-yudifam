import EditKeimananForm from "@/app/ui/keimanan/edit-form";
import Breadcrumbs from "@/app/ui/keimanan/bread-crumbs";
import { getKeimananDataById } from "@/app/lib/dataKeimanan";
import { fetchDataAnaks } from "@/app/lib/data";

export default async function Page({ params }) {
  const id = params.idKeimanan;
  const [keimananById, dataanaks, allJenisKeimanans] = await Promise.all([
    getKeimananDataById(id),
    fetchDataAnaks(),
  ]);
  // console.log(dataanaks);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Keimanan", href: "/dashboard/keimanan" },
          {
            label: "Edit Data Keimanan",
            href: `/dashboard/keimanan/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditKeimananForm keimananById={keimananById} dataanaks={dataanaks} />
    </main>
  );
}
