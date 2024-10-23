export const dynamic = 'force-dynamic';
import Form from "@/app/ui/individualitas/create-form";
import Breadcrumbs from "@/app/ui/individualitas/bread-crumbs";
import { fetchDataAnaks } from "@/app/lib/data";
// import { getAllKategoriBelajar } from "@/app/lib/dataBelajar";

export default async function Page() {
  const dataanaks = await fetchDataAnaks();
  // const datakategoris = await getAllKategoriBelajar();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Individualitas", href: "/dashboard/individualitas" },
          {
            label: "Tambah Data ",
            href: "/dashboard/individualitas/create",
            active: true,
          },
        ]}
      />
      <Form dataanaks={dataanaks} />
    </main>
  );
}
