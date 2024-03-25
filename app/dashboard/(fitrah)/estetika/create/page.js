import Form from "@/app/ui/estetika/create-form";
import Breadcrumbs from "@/app/ui/estetika/bread-crumbs";
import { fetchDataAnaks } from "@/app/lib/data";
// import { getAllKategoriBelajar } from "@/app/lib/dataBelajar";

export default async function Page() {
  const dataanaks = await fetchDataAnaks();
  // const datakategoris = await getAllKategoriBelajar();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Estetika", href: "/dashboard/estetika" },
          {
            label: "Tambah Data ",
            href: "/dashboard/estetika/create",
            active: true,
          },
        ]}
      />
      <Form dataanaks={dataanaks} />
    </main>
  );
}
