import EditBakatForm from "@/app/ui/bakat/edit-form";
import Breadcrumbs from "@/app/ui/bakat/bread-crumbs";
import {
  getBakatDataById,
  fetchDataAnaks,
  getAllBakat,
  fetchDataObservers,
} from "@/app/lib/data";

export default async function Page({ params }) {
  const id = params.idBakat;
  const [bakatById, dataanaks, allJenisBakats, dataobservers] =
    await Promise.all([
      getBakatDataById(id),
      fetchDataAnaks(),
      getAllBakat(),
      fetchDataObservers(),
    ]);
  // console.log(dataanaks);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Bakat", href: "/dashboard/bakat" },
          {
            label: "Edit Bakat",
            href: `/dashboard/bakat/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditBakatForm
        bakatById={bakatById}
        dataanaks={dataanaks}
        allJenisBakats={allJenisBakats}
        dataobservers={dataobservers}
      />
    </main>
  );
}
