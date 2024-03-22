"use server";
import { getFilteredKeimananData } from "@/app/lib/dataKeimanan";
import Image from "next/image";
import { UpdateKeimanan, DeleteKeimanan } from "./buttons";
import { gambarAnak } from "../fotoAnak/page";

export default async function KeimananTable({ query, currentPage }) {
  const gambarAnakku = await gambarAnak();
  // console.log(currentPage);
  const keimanans = await getFilteredKeimananData(query, currentPage);
  // console.log(keimanans);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {keimanans?.map((iman) => (
              <div
                key={iman.id_keimanan}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={gambarAnakku[iman.nama]} //mengambil value gambarAnak berdasar nilai iman.nama
                        className="mr-2 rounded-full h-[28px] w-[28px]"
                        width="auto"
                        height="auto"
                        alt={`foto ${iman.nama}`}
                      />
                      <div>
                        <p className="first-letter:uppercase">{iman.nama}</p>

                        <p className="text-[8px] text-gray-500">
                          {iman.created_at}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 uppercase">
                      {iman.jenis_keimanan}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 p-1">
                    <div className="flex items-center justify-center">
                      <UpdateKeimanan id={iman.id_keimanan} />
                    </div>
                    <div className="flex items-center justify-center">
                      <DeleteKeimanan iddel={iman.id_keimanan} />
                    </div>
                  </div>
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium uppercase">AKTIVITAS</p>
                    <p className="text-sm">{iman.aktivitas_keimanan}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium uppercase">URAIAN</p>
                    <p className="text-sm">{iman.uraian_keimanan}</p>
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
                  Jenis Ibadah
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Kegiatan Aanak
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
              {keimanans?.map((iman) => (
                <tr
                  key={iman.id_keimanan}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={gambarAnakku[iman.nama]} //mengambil value gambarAnak berdasar nilai iman.nama
                        className="mr-2 rounded-full h-[28px] w-[28px]"
                        width="auto"
                        height="auto"
                        alt={`foto ${iman.nama}`}
                      />
                      <p className="first-letter:uppercase">{iman.nama}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {iman.created_at}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {iman.jenis_keimanan}
                  </td>
                  <td className="whitespace px-3 py-3">
                    {iman.aktivitas_keimanan}
                  </td>
                  <td className="whitespace px-3 py-3">
                    {/* <BakatStatus status={iman.tindakan} /> */}
                    {iman.uraian_keimanan}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <div className="flex items-center justify-center">
                        <UpdateKeimanan id={iman.id_keimanan} />
                      </div>
                      <div className="flex items-center justify-center">
                        <DeleteKeimanan iddel={iman.id_keimanan} />
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
