export const dynamic = 'force-dynamic';
import Form from "@/app/ui/seksualitas/create-form";
import Breadcrumbs from "@/app/ui/seksualitas/bread-crumbs";
import { fetchDataAnaks } from "@/app/lib/data";
// import { getAllKategoriBelajar } from "@/app/lib/dataBelajar";

export default async function Page() {
  const dataanaks = await fetchDataAnaks();
  // const datakategoris = await getAllKategoriBelajar();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Seksualitas", href: "/dashboard/seksualitas" },
          {
            label: "Tambah Data ",
            href: "/dashboard/seksualitas/create",
            active: true,
          },
        ]}
      />
      <Form dataanaks={dataanaks} />
    </main>
  );
}
