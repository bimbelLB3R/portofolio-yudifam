"use server";
import { getFilteredBelajarData } from "@/app/lib/dataBelajar";
import Image from "next/image";
import { UpdateBelajar, DeleteBelajar } from "./buttons";
// import { gambarAnak } from "../fotoAnak/page";
import fotoDefault from "/app/ui/fotoAnak/default.png";
import { fetchDataAnaks } from "@/app/lib/data";

export default async function BelajarTable({ query, currentPage }) {
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
                        src={gambarAnakku[belajar.nama]} //mengambil value gambarAnak berdasar nilai belajar.nama
                        className="mr-2 rounded-full h-[28px] w-[28px]"
                        width="auto"
                        height="auto"
                        alt={`foto ${belajar.nama}`}
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
                      <DeleteBelajar  iddel={belajar.nama} id={belajar.id_belajar}/>
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
                        src={gambarAnakku[belajar.nama]} //mengambil value gambarAnak berdasar nilai belajar.nama
                        className="mr-2 rounded-full h-[28px] w-[28px]"
                        width="auto"
                        height="auto"
                        alt={`foto ${belajar.nama}`}
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
                        <DeleteBelajar iddel={belajar.nama} id={belajar.id_belajar} />
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
