"use server";
import { getFilteredBakatData } from "@/app/lib/data";
import Image from "next/image";
import { UpdateBakat, DeleteBakat, GrafikBakat } from "./buttons";
import BakatStatus from "./status";
import Link from "next/link";
import { gambarAnak } from "../fotoAnak/page";

export default async function BakatTable({ query, currentPage }) {
  const gambarAnakku = await gambarAnak();
  // console.log(gambarAnakku);
  const bakats = await getFilteredBakatData(query, currentPage);
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
                    <p className="text-sm text-gray-500 uppercase">
                      {bakat.bakat}
                    </p>
                  </div>
                  <BakatStatus status={bakat.status} />
                </div>
                <div className="flex justify-end gap-2 p-1">
                  <div className="flex items-center justify-center">
                    <GrafikBakat id={bakat.nama} />
                  </div>
                  <div className="flex items-center justify-center">
                    <UpdateBakat id={bakat.idBakat} />
                  </div>
                  <div className="flex items-center justify-center">
                    <DeleteBakat iddel={bakat.idBakat} />
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium uppercase">
                      {bakat.aktivitas}
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
                    {bakat.aktivitas}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{bakat.bakat}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <BakatStatus status={bakat.status} />
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
                        <DeleteBakat iddel={bakat.idBakat} />
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
