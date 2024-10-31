import Link from "next/link";
import {
  UserCircleIcon,
  PencilSquareIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import Button from "../button";
import { createBelajar } from "@/app/lib/actionsBelajar";

export default function Form({ dataanaks, datakategoris,dataobservers }) {
  //datakategoris blm dikirim
  return (
    <form action={createBelajar}>
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
              defaultValue=""
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
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              ></textarea>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="observer" className="mb-2 block text-sm font-medium">
            Pilih Observer
          </label>
          <div className="relative">
            <select
              id="observer"
              name="observer"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Pilih Observer
              </option>
              {dataobservers.map((observer) => (
                <option key={observer.id} value={observer.nama}>
                  {observer.nama}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
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
        <Button type="submit">Tambah Data Belajar</Button>
      </div>
    </form>
  );
}
