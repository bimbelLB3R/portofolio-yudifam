export const dynamic = 'force-dynamic';
import Form from "@/app/ui/bakat/create-form";
import Breadcrumbs from "@/app/ui/bakat/bread-crumbs";
import {
  fetchDataAnaks,
  fetchDataObservers,
  fetchNamaBakats,
} from "@/app/lib/data";

export default async function Page() {
  const dataanaks = await fetchDataAnaks();
  const databakats = await fetchNamaBakats();
  const dataobservers = await fetchDataObservers();

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
      <Form
        dataanaks={dataanaks}
        databakats={databakats}
        dataobservers={dataobservers}
      />
    </main>
  );
}
