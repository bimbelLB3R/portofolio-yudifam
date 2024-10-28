import { UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Button from "../button";
import { updateIndividualitas } from "@/app/lib/actionsIndividualitas";

export default function EditIndividualitasForm({
  dataanaks,
  individualitasById,
}) {
  //datakategoris blm dikirim
  const idIndividualitasUpdate = individualitasById.map(
    (item) => item.id_individualitas
  );
  const tanggalIndividualitasUpdate = individualitasById.map(
    (item) => item.created_at
  );
  const idIndividualitasToUpdate = idIndividualitasUpdate[0];
  const tanggalIndividualitasToUpdate = tanggalIndividualitasUpdate[0];

  const dataWillUpdate = {
    nama: individualitasById.map((item) => item.nama),
    jenis_individualitas: individualitasById.map(
      (item) => item.jenis_individualitas
    ),
    aktivitas_individualitas: individualitasById.map(
      (item) => item.aktivitas_individualitas
    ),
    uraian_individualitas: individualitasById.map(
      (item) => item.uraian_individualitas
    ),
  };
  // const updateBakatWIthId = updateBakat.bind(null, idBakatToUpdate);
  console.log(dataWillUpdate);
  return (
    <form action={updateIndividualitas}>
      <input
        type="hidden"
        name="id_individualitas"
        value={idIndividualitasToUpdate}
      />
      <input
        type="hidden"
        name="created_at"
        value={tanggalIndividualitasToUpdate}
      />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="namaAnak" className="mb-2 block text-sm font-medium">
            Pilih Anak
          </label>
          <div className="relative">
            <select
              id="namaAnak"
              name="namaAnak"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={dataWillUpdate.nama[0]}
              required
            >
              <option value="" disabled>
                Pilih Anak
              </option>
              {dataanaks.map((anak) => (
                <option key={anak.id} value={anak.nama}>
                  {anak.nama}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Kategori*/}
        <div className="mb-4">
          <label
            htmlFor="jenis_individualitas"
            className="mb-2 block text-sm font-medium"
          >
            Kategori
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="jenis_individualitas"
                name="jenis_individualitas"
                type="text"
                step="0.01"
                defaultValue={dataWillUpdate.jenis_individualitas[0]}
                placeholder="isi aktivitas individualitas"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* aktivitas */}
        <div className="mb-4">
          <label
            htmlFor="aktivitas_individualitas"
            className="mb-2 block text-sm font-medium"
          >
            Aktivitas
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="aktivitas_individualitas"
                name="aktivitas_individualitas"
                type="text"
                step="0.01"
                defaultValue={dataWillUpdate.aktivitas_individualitas[0]}
                placeholder="isi aktivitas individualitas"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* tindakan*/}
        <div className="mb-4">
          <label
            htmlFor="uraian_individualitas"
            className="mb-2 block text-sm font-medium"
          >
            Uraian
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="uraian_individualitas"
                name="uraian_individualitas"
                placeholder="Ceritakan apa yang sudah dilakukan"
                defaultValue={dataWillUpdate.uraian_individualitas[0]}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/individualitas"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 "
        >
          Cancel
        </Link>
        <Button type="submit">Edit Data </Button>
      </div>
    </form>
  );
}
