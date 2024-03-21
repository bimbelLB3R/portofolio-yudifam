import Link from "next/link";
import { UserCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Button from "../button";
import { createKesehatan } from "@/app/lib/actionsKesehatan";

export default function Form({ dataanaks }) {
  return (
    <form action={createKesehatan}>
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

        {/* Jenis Penyakit*/}
        <div className="mb-4">
          <label
            htmlFor="jenis_penyakit"
            className="mb-2 block text-sm font-medium"
          >
            Jenis Penyakit
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="jenis_penyakit"
                name="jenis_penyakit"
                type="text"
                step="0.01"
                placeholder="Tulis nama jenis_penyakit"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <PencilSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* cerita */}
        <div className="mb-4">
          <label htmlFor="penyebab" className="mb-2 block text-sm font-medium">
            Kondisi dan Penyebab
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="penyebab"
                name="penyebab"
                placeholder="Ceritakan apa yang terjadi"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* tindakan*/}
        <div className="mb-4">
          <label htmlFor="tindakan" className="mb-2 block text-sm font-medium">
            Tindakan dan Hasil
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="tindakan"
                name="tindakan"
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
          href="/dashboard/kesehatan"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Tambah Data Riwayat</Button>
      </div>
    </form>
  );
}
