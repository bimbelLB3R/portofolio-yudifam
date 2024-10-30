"use server";
import { getFilteredEstetikaData } from "@/app/lib/dataEstetika";
import Image from "next/image";
import { UpdateEstetika, DeleteEstetika } from "./buttons";
// import { gambarAnak } from "../fotoAnak/page";
import fotoDefault from "/app/ui/fotoAnak/default.png";
import { fetchDataAnaks } from "@/app/lib/data";
import {cache} from 'react';


const getDataTable=cache(async(query,currentPage)=>{
  const data= await getFilteredEstetikaData(query,currentPage);
  return data
})
// Fungsi untuk menghitung usia dari tanggal lahir
function hitungUsia(tanggalLahir) {
  const hariIni = new Date();
  const lahir = new Date(tanggalLahir);

  let tahun = hariIni.getFullYear() - lahir.getFullYear();
  let bulan = hariIni.getMonth() - lahir.getMonth();
  let hari = hariIni.getDate() - lahir.getDate();

  // Koreksi jika bulan atau hari hasil pengurangan negatif
  if (bulan < 0 || (bulan === 0 && hari < 0)) {
    tahun--;
    bulan += 12;
    // Menghitung jumlah hari dalam bulan lalu
    const bulanLalu = hariIni.getMonth() === 0 ? 11 : hariIni.getMonth() - 1;
    const hariBulanLalu = new Date(
      hariIni.getFullYear(),
      bulanLalu + 1,
      0
    ).getDate();
    hari += hariBulanLalu;
  }

  // Periksa jika jumlah hari lebih dari jumlah hari dalam bulan
  const bulanIni = hariIni.getMonth();
  const hariIniBulan = new Date(
    hariIni.getFullYear(),
    bulanIni + 1,
    0
  ).getDate();
  if (hari > hariIniBulan) {
    hari -= hariIniBulan;
    bulan++;
  }

  return { tahun, bulan, hari };
}

export default async function EstetikaTable({ query, currentPage }) {
  const dataanaks = await fetchDataAnaks();
  const fotoanaks = dataanaks.map((item) => item.foto);
  const tanggal_lahir_array = dataanaks.map((item) => item.tanggal_lahir);
  const tanggal_lahir = tanggal_lahir_array.reduce((acc, curr, index) => {
    acc[dataanaks[index].nama] = curr;
    return acc;
  }, {});
  // console.log(tanggal_lahir);

  // Objek untuk menyimpan usia setiap anak
  const usia_anak = {};

  // Menghitung usia setiap anak
  for (const [nama, tanggal] of Object.entries(tanggal_lahir)) {
    usia_anak[nama] = hitungUsia(tanggal);
  }

  // Fungsi untuk menampilkan usia dalam format lengkap
  function formatUsia(usia) {
    return `${usia.tahun} tahun, ${usia.bulan} bulan, dan ${usia.hari} hari`;
  }

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
  const estetikas = await getDataTable(query, currentPage);
  // console.log(belajars);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {estetikas?.map((estetika) => (
              <div
                key={estetika.id_estetika}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={gambarAnakku[estetika.nama]} //mengambil value gambarAnak berdasar nilai estetika.nama
                        className="mr-2 rounded-full h-[28px] w-[28px]"
                        width="auto"
                        height="auto"
                        alt={`foto ${estetika.nama}`}
                      />
                      <div>
                        <p className="first-letter:uppercase">
                          {estetika.nama}
                        </p>

                        <p className="text-[8px] text-gray-500">
                          {estetika.created_at}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 uppercase">
                      {estetika.jenis_estetika}
                    </p>
                    <p className="text-[8px] text-gray-500 lowercase">
                      Usia Anak ({formatUsia(usia_anak[estetika.nama])})
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 p-1">
                    <div className="flex items-center justify-center">
                      <UpdateEstetika id={estetika.id_estetika} />
                    </div>
                    <div className="flex items-center justify-center">
                      <DeleteEstetika iddel={estetika.nama} id={estetika.id_estetika} />
                    </div>
                  </div>
                </div>

                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium uppercase">AKTIVITAS</p>
                    <p className="text-sm">{estetika.aktivitas_estetika}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium uppercase">URAIAN</p>
                    <p className="text-sm">{estetika.uraian_estetika}</p>
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
              {estetikas?.map((estetika) => (
                <tr
                  key={estetika.id_estetika}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={gambarAnakku[estetika.nama]} //mengambil value gambarAnak berdasar nilai estetika.nama
                        className="mr-2 rounded-full h-[28px] w-[28px]"
                        width="auto"
                        height="auto"
                        alt={`foto ${estetika.nama}`}
                      />
                      <p className="first-letter:uppercase">{estetika.nama}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {estetika.created_at}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {estetika.jenis_estetika}
                  </td>
                  <td className="whitespace px-3 py-3">
                    {estetika.aktivitas_estetika}
                  </td>
                  <td className="whitespace px-3 py-3">
                    {/* <BakatStatus status={estetika.tindakan} /> */}
                    {estetika.uraian_estetika}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <div className="flex items-center justify-center">
                        <UpdateEstetika id={estetika.id_estetika} />
                      </div>
                      <div className="flex items-center justify-center">
                        <DeleteEstetika iddel={estetika.nama} id={estetika.id_estetika} />
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
