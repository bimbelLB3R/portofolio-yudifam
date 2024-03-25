import EditEstetikaForm from "@/app/ui/estetika/edit-form";
import Breadcrumbs from "@/app/ui/estetika/bread-crumbs";
import { getEstetikaDataById } from "@/app/lib/dataEstetika";
import { fetchDataAnaks } from "@/app/lib/data";

export default async function Page({ params }) {
  const id = params.idEstetika;
  const [estetikaById, dataanaks] = await Promise.all([
    getEstetikaDataById(id),
    fetchDataAnaks(),
  ]);
  // console.log(dataanaks);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Estetika", href: "/dashboard/estetika" },
          {
            label: "Edit Data ",
            href: `/dashboard/estetika/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditEstetikaForm estetikaById={estetikaById} dataanaks={dataanaks} />
    </main>
  );
}
