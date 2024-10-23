export const dynamic = 'force-dynamic';
import Form from "@/app/ui/keimanan/create-form";
import Breadcrumbs from "@/app/ui/keimanan/bread-crumbs";
import { fetchDataAnaks } from "@/app/lib/data";

export default async function Page() {
  const dataanaks = await fetchDataAnaks();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Keimanan", href: "/dashboard/keimanan" },
          {
            label: "Tambah Data Iman",
            href: "/dashboard/keimanan/create",
            active: true,
          },
        ]}
      />
      <Form dataanaks={dataanaks} />
    </main>
  );
}
