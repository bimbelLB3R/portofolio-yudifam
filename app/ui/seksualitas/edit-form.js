import {
  UserCircleIcon,
  PencilSquareIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Button from "../button";
import { updateSeksualitas } from "@/app/lib/actionsSeksualitas";

export default function EditSeksualitasForm({ dataanaks, seksualitasById }) {
  //datakategoris blm dikirim
  const idSeksualitasUpdate = seksualitasById.map(
    (item) => item.id_seksualitas
  );
  const tanggalSeksualitasUpdate = seksualitasById.map(
    (item) => item.created_at
  );
  const idSeksualitasToUpdate = idSeksualitasUpdate[0];
  const tanggalSeksualitasToUpdate = tanggalSeksualitasUpdate[0];

  const dataWillUpdate = {
    nama: seksualitasById.map((item) => item.nama),
    jenis_seksualitas: seksualitasById.map((item) => item.jenis_seksualitas),
    aktivitas_seksualitas: seksualitasById.map(
      (item) => item.aktivitas_seksualitas
    ),
    uraian_seksualitas: seksualitasById.map((item) => item.uraian_seksualitas),
  };
  // const updateBakatWIthId = updateBakat.bind(null, idBakatToUpdate);

  return (
    <form action={updateSeksualitas}>
      <input
        type="hidden"
        name="id_seksualitas"
        value={idSeksualitasToUpdate}
      />
      <input
        type="hidden"
        name="created_at"
        value={tanggalSeksualitasToUpdate}
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
              defaultValue={dataWillUpdate.nama}
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
            htmlFor="jenis_seksualitas"
            className="mb-2 block text-sm font-medium"
          >
            Kategori
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="jenis_seksualitas"
                name="jenis_seksualitas"
                type="text"
                step="0.01"
                defaultValue={dataWillUpdate.jenis_seksualitas}
                placeholder="isi aktivitas seksualitas"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* aktivitas */}
        <div className="mb-4">
          <label
            htmlFor="aktivitas_seksualitas"
            className="mb-2 block text-sm font-medium"
          >
            Aktivitas
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="aktivitas_seksualitas"
                name="aktivitas_seksualitas"
                type="text"
                step="0.01"
                defaultValue={dataWillUpdate.aktivitas_seksualitas}
                placeholder="isi aktivitas seksualitas"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* tindakan*/}
        <div className="mb-4">
          <label
            htmlFor="uraian_seksualitas"
            className="mb-2 block text-sm font-medium"
          >
            Uraian
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="uraian_seksualitas"
                name="uraian_seksualitas"
                placeholder="Ceritakan apa yang sudah dilakukan"
                defaultValue={dataWillUpdate.uraian_seksualitas}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/seksualitas"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Data </Button>
      </div>
    </form>
  );
}
