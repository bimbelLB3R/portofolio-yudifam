export const dynamic = 'force-dynamic';
import Form from "@/app/ui/kesehatan/create-form";
import Breadcrumbs from "@/app/ui/kesehatan/bread-crumbs";
import { fetchDataAnaks } from "@/app/lib/data";

export default async function Page() {
  const dataanaks = await fetchDataAnaks();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Kesehatan", href: "/dashboard/kesehatan" },
          {
            label: "Tambah Riwayat Kesehatan",
            href: "/dashboard/kesehatan/create",
            active: true,
          },
        ]}
      />
      <Form dataanaks={dataanaks} />
    </main>
  );
}
