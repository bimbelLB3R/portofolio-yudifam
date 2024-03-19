import Form from "@/app/ui/bakat/create-form";
import Breadcrumbs from "@/app/ui/bakat/bread-crumbs";
import { fetchDataAnaks, fetchNamaBakats } from "@/app/lib/data";

export default async function Page() {
  const dataanaks = await fetchDataAnaks();
  const databakats = await fetchNamaBakats();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Bakat", href: "/dashboard/bakat" },
          {
            label: "Tambah Bakat",
            href: "/dashboard/bakat/create",
            active: true,
          },
        ]}
      />
      <Form dataanaks={dataanaks} databakats={databakats} />
    </main>
  );
}
