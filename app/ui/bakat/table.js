"use server";
import { getFilteredBakatData } from "@/app/lib/data";
import Image from "next/image";
import {
  UpdateBakat,
  DeleteBakat,
  GrafikBakat,
  DefinisiBakat,
} from "./buttons";
import BakatStatus from "./status";
import Link from "next/link";
// import { gambarAnak } from "../fotoAnak/page";

import fotoDefault from "/app/ui/fotoAnak/default.png";
import { fetchDataAnaks } from "@/app/lib/data";
import BakatDominan from "./dominan";
import {cache} from 'react';

const getDataTable=cache(async(query,currentPage)=>{
  const data= await getFilteredBakatData(query,currentPage);
  return data
})

export default async function BakatTable({ query, currentPage }) {
  const dataanaks = await fetchDataAnaks();
  const fotoanaks = dataanaks.map((item) => item.foto);
  const gambarAnakku = (
    await Promise.all(
      fotoanaks.map(async (namaFile) => {
        // Ambil nama anak dari nama file (tanpa ekstensi)
        const namaAnak = namaFile.replace(".png", "");
        try {
          // Import gambar anak secara dinamis

          const gambar = await import(`/app/ui/fotoAnak/${namaFile}`);
          // Kembalikan pasangan nama anak dan gambar
          return [namaAnak, gambar.default];
        } catch (error) {
          // Jika foto anak tidak tersedia, gunakan UserCircleIcon sebagai gantinya
          return [namaAnak, fotoDefault];
        }
      })
    )
  ).reduce((acc, [namaAnak, gambar]) => {
    // Tambahkan pasangan nama anak dan gambar ke objek akumulator
    acc[namaAnak] = gambar;
    return acc;
  }, {});

  // const gambarAnakku = await gambarAnak();
  // const bakats = await getFilteredBakatData(query, currentPage);
  const bakats = await getDataTable(query, currentPage);
  const namaNama=bakats.map((nama)=>nama.nama);
  // console.log(bakats);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {bakats?.map((bakat) => (
              <div
                key={bakat.idBakat}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Link href={`/dashboard/bakat/${bakat.nama}/grafik`}>
                        <Image
                          src={gambarAnakku[bakat.nama]} //mengambil value gambarAnakku berdasar nilai bakat.nama
                          className="mr-2 rounded-full w-[28px] h-[28px]"
                          width="auto"
                          height="auto"
                          alt={`foto ${bakat.nama}`}
                        />
                        {/* {console.log(gambarAnakku[bakat.nama])} */}
                      </Link>
                      <div>
                        <p className="first-letter:uppercase">{bakat.nama}</p>

                        <p className="text-[8px] text-gray-500">
                          {bakat.tanggal}
                        </p>
                      </div>
                    </div>
                    {/* <p className="text-sm text-gray-500 uppercase">
                      {bakat.bakat}
                    </p> */}
                    <div className="flex items-center justify-center">
                      <DefinisiBakat id={bakat.bakat} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 space-y-1">
                    <BakatStatus status={bakat.status} />
                    <BakatDominan dominan={bakat.dominan} />
                  </div>
                </div>
                <div className="flex justify-end gap-2 p-1">
                  <div className="flex items-center justify-center">
                    <GrafikBakat id={bakat.nama} />
                  </div>
                  <div className="flex items-center justify-center">
                    <UpdateBakat id={bakat.idBakat} />
                  </div>
                  <div className="flex items-center justify-center">
                    <DeleteBakat iddel={bakat.nama} id={bakat.idBakat} />
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium uppercase">
                      {bakat.aktivitas}
                    </p>
                    <p className="text-xs text-gray-400">
                      Observed by {bakat.observer}
                    </p>
                    <p className="text-sm">{bakat.cerita}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nama
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tanggal
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Aktivitas
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Jenis Bakat
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {bakats?.map((bakat) => (
                <tr
                  key={bakat.idBakat}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/dashboard/bakat/${bakat.nama}/grafik`}>
                        <Image
                          src={gambarAnakku[bakat.nama]}
                          className="mr-2 rounded-full w-[28px] h-[28px]"
                          width="auto"
                          height="auto"
                          alt={`foto ${bakat.nama}`}
                        />
                      </Link>
                      <p className="first-letter:uppercase">{bakat.nama}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {bakat.tanggal}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="grid grid-cols-1 space-y-1">
                      <p>{bakat.aktivitas}</p>
                      <p className="text-xs text-gray-400">
                        by {bakat.observer}
                      </p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link
                      href={`/dashboard/bakat/${bakat.bakat}/definisi`}
                      className="rounded-md border p-2 hover:bg-gray-100"
                    >
                      {bakat.bakat}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p className="grid grid-cols-1 space-y-1">
                      <BakatStatus status={bakat.status} />
                      <BakatDominan dominan={bakat.dominan} />
                    </p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <div className="flex items-center justify-center">
                        <GrafikBakat id={bakat.nama} />
                      </div>
                      <div className="flex items-center justify-center">
                        <UpdateBakat id={bakat.idBakat} />
                      </div>
                      <div className="flex items-center justify-center">
                        <DeleteBakat iddel={bakat.nama} id={bakat.idBakat} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
