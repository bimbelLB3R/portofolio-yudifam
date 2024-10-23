export const dynamic = 'force-dynamic';
import Form from "@/app/ui/perkembangan/create-form";
import Breadcrumbs from "@/app/ui/perkembangan/bread-crumbs";
import { fetchDataAnaks } from "@/app/lib/data";
// import { getAllKategoriBelajar } from "@/app/lib/dataBelajar";

export default async function Page() {
  const dataanaks = await fetchDataAnaks();
  // const datakategoris = await getAllKategoriBelajar();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Perkembangan", href: "/dashboard/perkembangan" },
          {
            label: "Tambah Data ",
            href: "/dashboard/perkembangan/create",
            active: true,
          },
        ]}
      />
      <Form dataanaks={dataanaks} />
    </main>
  );
}
