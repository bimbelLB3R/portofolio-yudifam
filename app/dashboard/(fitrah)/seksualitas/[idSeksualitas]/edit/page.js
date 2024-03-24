import EditSeksualitasForm from "@/app/ui/seksualitas/edit-form";
import Breadcrumbs from "@/app/ui/seksualitas/bread-crumbs";
import { getSeksualitasDataById } from "@/app/lib/dataSeksualitas";
import { fetchDataAnaks } from "@/app/lib/data";

export default async function Page({ params }) {
  const id = params.idSeksualitas;
  const [seksualitasById, dataanaks] = await Promise.all([
    getSeksualitasDataById(id),
    fetchDataAnaks(),
  ]);
  // console.log(dataanaks);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Seksualitas", href: "/dashboard/seksualitas" },
          {
            label: "Edit Data ",
            href: `/dashboard/seksualitas/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditSeksualitasForm
        seksualitasById={seksualitasById}
        dataanaks={dataanaks}
      />
    </main>
  );
}
