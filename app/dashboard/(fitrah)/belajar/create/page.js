import Form from "@/app/ui/belajar/create-form";
import Breadcrumbs from "@/app/ui/belajar/bread-crumbs";
import { fetchDataAnaks } from "@/app/lib/data";
import { getAllKategoriBelajar } from "@/app/lib/dataBelajar";

export default async function Page() {
  const dataanaks = await fetchDataAnaks();
  const datakategoris = await getAllKategoriBelajar();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Belajar", href: "/dashboard/belajar" },
          {
            label: "Tambah Data Belajar",
            href: "/dashboard/belajar/create",
            active: true,
          },
        ]}
      />
      <Form dataanaks={dataanaks} datakategoris={datakategoris} />
    </main>
  );
}
