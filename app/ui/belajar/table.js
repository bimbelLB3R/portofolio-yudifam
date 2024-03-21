import { getFilteredBelajarData } from "@/app/lib/dataBelajar";
import Image from "next/image";
import { UpdateBelajar, DeleteBelajar } from "./buttons";

import aqila from "/app/ui/aqila.png";
import uwais from "/app/ui/uwais.png";
import hasna from "/app/ui/hasna.png";

export default async function BelajarTable({ query, currentPage }) {
  // console.log(currentPage);
  const belajars = await getFilteredBelajarData(query, currentPage);
  // console.log(belajars);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {belajars?.map((belajar) => (
              <div
                key={belajar.id_belajar}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={
                          belajar.nama === "aqila"
                            ? aqila
                            : belajar.nama === "uwais"
                            ? uwais
                            : hasna
                        }
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt="foto aqila"
                      />
                      <div>
                        <p className="first-letter:uppercase">{belajar.nama}</p>

                        <p className="text-[8px] text-gray-500">
                          {belajar.created_at}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 uppercase">
                      {belajar.jenis_belajar}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 p-1">
                    <div className="flex items-center justify-center">
                      <UpdateBelajar id={belajar.id_belajar} />
                    </div>
                    <div className="flex items-center justify-center">
                      <DeleteBelajar iddel={belajar.id_belajar} />
                    </div>
                  </div>
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium uppercase">AKTIVITAS</p>
                    <p className="text-sm">{belajar.aktivitas_belajar}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium uppercase">URAIAN</p>
                    <p className="text-sm">{belajar.uraian_belajar}</p>
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
                  Kategori
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Kegiatan Anak
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Uraian
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {belajars?.map((belajar) => (
                <tr
                  key={belajar.id_belajar}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          belajar.nama === "aqila"
                            ? aqila
                            : belajar.nama === "uwais"
                            ? uwais
                            : hasna
                        }
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt="foto aqila"
                      />
                      <p className="first-letter:uppercase">{belajar.nama}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {belajar.created_at}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {belajar.jenis_belajar}
                  </td>
                  <td className="whitespace px-3 py-3">
                    {belajar.aktivitas_belajar}
                  </td>
                  <td className="whitespace px-3 py-3">
                    {/* <BakatStatus status={belajar.tindakan} /> */}
                    {belajar.uraian_belajar}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <div className="flex items-center justify-center">
                        <UpdateBelajar id={belajar.id_belajar} />
                      </div>
                      <div className="flex items-center justify-center">
                        <DeleteBelajar iddel={belajar.id_belajar} />
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
