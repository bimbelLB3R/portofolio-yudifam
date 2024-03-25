import EditIndividualitasForm from "@/app/ui/individualitas/edit-form";
import Breadcrumbs from "@/app/ui/individualitas/bread-crumbs";
import { getIndividualitasDataById } from "@/app/lib/dataIndividualitas";
import { fetchDataAnaks } from "@/app/lib/data";

export default async function Page({ params }) {
  const id = params.idIndividualitas;
  const [individualitasById, dataanaks] = await Promise.all([
    getIndividualitasDataById(id),
    fetchDataAnaks(),
  ]);
  // console.log(dataanaks);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Individualitas", href: "/dashboard/individualitas" },
          {
            label: "Edit Data ",
            href: `/dashboard/individualitas/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditIndividualitasForm
        individualitasById={individualitasById}
        dataanaks={dataanaks}
      />
    </main>
  );
}
