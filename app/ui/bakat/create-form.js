import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  AcademicCapIcon,
  PencilSquareIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import Button from "../button";
import { createInvoice } from "@/app/lib/actions";

export default function Form({ dataanaks, databakats, dataobservers }) {
  return (
    <form action={createInvoice}>
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

        {/* Aktivitas */}
        <div className="mb-4">
          <label htmlFor="aktivitas" className="mb-2 block text-sm font-medium">
            Aktivitas Anak
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="aktivitas"
                name="aktivitas"
                type="text"
                step="0.01"
                placeholder="Tulis nama aktivitas"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <PencilSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* cerita */}
        <div className="mb-4">
          <label htmlFor="cerita" className="mb-2 block text-sm font-medium">
            Ceritakan apa yang terjadi
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="cerita"
                name="cerita"
                placeholder="Ceritakan apa yang terjadi"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* jenis bakat */}
        <div className="mb-4">
          <label htmlFor="bakat" className="mb-2 block text-sm font-medium">
            Pilih Jenis Bakat
          </label>
          <div className="relative">
            <select
              id="bakat"
              name="bakat"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Pilih Bakat
              </option>
              {databakats.map((bakat) => (
                <option key={bakat.idBakat} value={bakat.jenisBakat}>
                  {bakat.jenisBakat}
                </option>
              ))}
            </select>
            <AcademicCapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Apakah yakin dengan pilihan bakat?
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Belum <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="terkonfirmasi"
                  name="status"
                  type="radio"
                  value="terkonfirmasi"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="terkonfirmasi"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Sudah <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
        {/* dominan */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Apakah bakat ini kekuatan atau kelemahan anak?
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="kelemahan"
                  name="dominan"
                  type="radio"
                  value="kelemahan"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="kelemahan"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Kelemahan <HandThumbDownIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="kekuatan"
                  name="dominan"
                  type="radio"
                  value="kekuatan"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="kekuatan"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Kekuatan <HandThumbUpIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
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
          href="/dashboard/bakat"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200 active:bg-gray-300"
        >
          Cancel
        </Link>
        <Button  type="submit" className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-600">
            Tambah Data
          </Button>
      </div>
    </form>
  );
}
