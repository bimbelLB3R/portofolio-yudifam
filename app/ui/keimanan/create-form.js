import Link from "next/link";
import { UserCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Button from "../button";
import { createKeimanan } from "@/app/lib/actionsKeimanan";

export default function Form({ dataanaks }) {
  return (
    <form action={createKeimanan}>
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
              defaultValue=""
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

        {/* Jenis Keimanan*/}
        <div className="mb-4">
          <label
            htmlFor="jenis_keimanan"
            className="mb-2 block text-sm font-medium"
          >
            Jenis Keimanan
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="jenis_keimanan"
                name="jenis_keimanan"
                type="text"
                step="0.01"
                placeholder="jenis ibadah"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <PencilSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* aktivitas */}
        <div className="mb-4">
          <label
            htmlFor="aktivitas_keimanan"
            className="mb-2 block text-sm font-medium"
          >
            Aktivitas
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="aktivitas_keimanan"
                name="aktivitas_keimanan"
                type="text"
                step="0.01"
                placeholder="Misalnya sholat dhuha"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
            </div>
          </div>
        </div>

        {/* tindakan*/}
        <div className="mb-4">
          <label
            htmlFor="uraian_keimanan"
            className="mb-2 block text-sm font-medium"
          >
            Uraian
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="uraian_keimanan"
                name="uraian_keimanan"
                placeholder="Ceritakan apa yang sudah dilakukan"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/keimanan"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 active:bg-gray-300"
        >
          Cancel
        </Link>
        <Button type="submit">Tambah Data Iman</Button>
      </div>
    </form>
  );
}
