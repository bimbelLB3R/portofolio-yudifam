import {
  UserCircleIcon,
  PencilSquareIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Button from "../button";
import { updateBelajar } from "@/app/lib/actionsBelajar";

export default function EditBelajarForm({
  dataanaks,
  belajarById,
  datakategoris,
}) {
  //datakategoris blm dikirim
  const idBelajarUpdate = belajarById.map((item) => item.id_belajar);
  const tanggalBelajarUpdate = belajarById.map((item) => item.created_at);
  const idBelajarToUpdate = idBelajarUpdate[0];
  const tanggalBelajarToUpdate = tanggalBelajarUpdate[0];

  const dataWillUpdate = {
    nama: belajarById.map((item) => item.nama),
    jenis_belajar: belajarById.map((item) => item.jenis_belajar),
    aktivitas_belajar: belajarById.map((item) => item.aktivitas_belajar),
    uraian_belajar: belajarById.map((item) => item.uraian_belajar),
  };
  // const updateBakatWIthId = updateBakat.bind(null, idBakatToUpdate);

  return (
    <form action={updateBelajar}>
      <input type="hidden" name="id_belajar" value={idBelajarToUpdate} />
      <input type="hidden" name="created_at" value={tanggalBelajarToUpdate} />
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
            htmlFor="jenis_belajar"
            className="mb-2 block text-sm font-medium"
          >
            Kategori
          </label>
          <div className="relative">
            <select
              id="jenis_belajar"
              name="jenis_belajar"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={dataWillUpdate.jenis_belajar[0]}
              required
            >
              <option value="" disabled>
                Pilih Kategori
              </option>
              {datakategoris.map((kategori) => (
                <option key={kategori.id_kategori} value={kategori.kategori}>
                  {kategori.kategori}
                </option>
              ))}
            </select>
            <AcademicCapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* aktivitas */}
        <div className="mb-4">
          <label
            htmlFor="aktivitas_belajar"
            className="mb-2 block text-sm font-medium"
          >
            Aktivitas
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="aktivitas_belajar"
                name="aktivitas_belajar"
                type="text"
                step="0.01"
                defaultValue={dataWillUpdate.aktivitas_belajar[0]}
                placeholder="isi aktivitas belajar"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* tindakan*/}
        <div className="mb-4">
          <label
            htmlFor="uraian_belajar"
            className="mb-2 block text-sm font-medium"
          >
            Uraian
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="uraian_belajar"
                name="uraian_belajar"
                placeholder="Ceritakan apa yang sudah dilakukan"
                defaultValue={dataWillUpdate.uraian_belajar[0]}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/belajar"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 active:bg-gray-300"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Data Belajar</Button>
      </div>
    </form>
  );
}
