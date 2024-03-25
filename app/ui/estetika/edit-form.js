import {
  UserCircleIcon,
  PencilSquareIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Button from "../button";
import { updateEstetika } from "@/app/lib/actionsEstetika";

export default function EditEstetikaForm({ dataanaks, estetikaById }) {
  //datakategoris blm dikirim
  const idEstetikaUpdate = estetikaById.map((item) => item.id_estetika);
  const tanggalEstetikaUpdate = estetikaById.map((item) => item.created_at);
  const idEstetikaToUpdate = idEstetikaUpdate[0];
  const tanggalEstetikaToUpdate = tanggalEstetikaUpdate[0];

  const dataWillUpdate = {
    nama: estetikaById.map((item) => item.nama),
    jenis_estetika: estetikaById.map((item) => item.jenis_estetika),
    aktivitas_estetika: estetikaById.map((item) => item.aktivitas_estetika),
    uraian_estetika: estetikaById.map((item) => item.uraian_estetika),
  };
  // const updateBakatWIthId = updateBakat.bind(null, idBakatToUpdate);

  return (
    <form action={updateEstetika}>
      <input type="hidden" name="id_estetika" value={idEstetikaToUpdate} />
      <input type="hidden" name="created_at" value={tanggalEstetikaToUpdate} />
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
            htmlFor="jenis_estetika"
            className="mb-2 block text-sm font-medium"
          >
            Kategori
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="jenis_estetika"
                name="jenis_estetika"
                type="text"
                step="0.01"
                defaultValue={dataWillUpdate.jenis_estetika}
                placeholder="isi aktivitas estetika"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* aktivitas */}
        <div className="mb-4">
          <label
            htmlFor="aktivitas_estetika"
            className="mb-2 block text-sm font-medium"
          >
            Aktivitas
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="aktivitas_estetika"
                name="aktivitas_estetika"
                type="text"
                step="0.01"
                defaultValue={dataWillUpdate.aktivitas_estetika}
                placeholder="isi aktivitas estetika"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* tindakan*/}
        <div className="mb-4">
          <label
            htmlFor="uraian_estetika"
            className="mb-2 block text-sm font-medium"
          >
            Uraian
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="uraian_estetika"
                name="uraian_estetika"
                placeholder="Ceritakan apa yang sudah dilakukan"
                defaultValue={dataWillUpdate.uraian_estetika}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/estetika"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Data </Button>
      </div>
    </form>
  );
}
