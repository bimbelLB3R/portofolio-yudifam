"use server";
import { getFilteredKesehatanData } from "@/app/lib/dataKesehatan";
import Image from "next/image";
import { UpdateKesehatan, DeleteKesehatan } from "./buttons";
// import { gambarAnak } from "../fotoAnak/page";
import fotoDefault from "/app/ui/fotoAnak/default.png";
import { fetchDataAnaks } from "@/app/lib/data";

export default async function KesehatanTable({ query, currentPage }) {
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

  // console.log(currentPage);
  // const gambarAnakku = await gambarAnak();
  const kesehatans = await getFilteredKesehatanData(query, currentPage);
  // console.log(kesehatans);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {kesehatans?.map((sehat) => (
              <div
                key={sehat.id_penyakit}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={gambarAnakku[sehat.nama]} //mengambil value gambarAnak berdasar nilai sehat.nama
                        className="mr-2 rounded-full h-[28px] w-[28px]"
                        width="auto"
                        height="auto"
                        alt={`foto ${sehat.nama}`}
                      />
                      <div>
                        <p className="first-letter:uppercase">{sehat.nama}</p>

                        <p className="text-[8px] text-gray-500">
                          {sehat.tgl_created}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 uppercase">
                      {sehat.jenis_penyakit}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 p-1">
                    <div className="flex items-center justify-center">
                      <UpdateKesehatan id={sehat.id_penyakit} />
                    </div>
                    <div className="flex items-center justify-center">
                      <DeleteKesehatan iddel={sehat.nama} id={sehat.id_penyakit} />
                    </div>
                  </div>
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium uppercase">
                      KONDISI DAN PENYEBAB
                    </p>
                    <p className="text-sm">{sehat.penyebab}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium uppercase">
                      TINDAKAN dan HASIL
                    </p>
                    <p className="text-sm">{sehat.tindakan}</p>
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
                  Jenis Penyakit
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Penyebab & Kondisi
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tindakan & Hasil
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {kesehatans?.map((sehat) => (
                <tr
                  key={sehat.id_penyakit}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={gambarAnakku[sehat.nama]} //mengambil value gambarAnak berdasar nilai sehat.nama
                        className="mr-2 rounded-full h-[28px] w-[28px]"
                        width="auto"
                        height="auto"
                        alt={`foto ${sehat.nama}`}
                      />
                      <p className="first-letter:uppercase">{sehat.nama}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sehat.tgl_created}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sehat.jenis_penyakit}
                  </td>
                  <td className="whitespace px-3 py-3">{sehat.penyebab}</td>
                  <td className="whitespace px-3 py-3">
                    {/* <BakatStatus status={sehat.tindakan} /> */}
                    {sehat.tindakan}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <div className="flex items-center justify-center">
                        <UpdateKesehatan id={sehat.id_penyakit} />
                      </div>
                      <div className="flex items-center justify-center">
                        <DeleteKesehatan iddel={sehat.nama} id={sehat.id_penyakit} />
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
