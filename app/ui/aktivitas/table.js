"use server";
import { cache } from 'react';
import { getFilteredAktivitasData, getFilteredUsulAktivitasData, getHasilUsulan } from "@/app/lib/dataAktivitas";
import { fetchDataAnaks } from '@/app/lib/data';
import Image from 'next/image';
import fotoDefault from "/app/ui/fotoAnak/default.png";
import { BeriTanggapan, CreateAktivitas, UpdateAktivitas } from './buttons';
import rebahanFoto from "/app/ui/rebahan.png";
import { AmbilSesi } from '@/app/lib/data';

// cek apakah guru


const getDataTable = cache(async (query, currentPage) => {
  const data = await getFilteredAktivitasData(query, currentPage);
  return data;
});

const getDataTable2 = cache(async (query, currentPage) => {
  const data = await getFilteredUsulAktivitasData(query, currentPage);
  return data;
});

const getDataTable3 = cache(async (query, currentPage) => {
  const data = await getHasilUsulan(query, currentPage);
  return data;
});

export default async function AktivitasTable({ query, currentPage }) {
  const cekPeran=await AmbilSesi();
  const peranGuru=cekPeran.role;
  // console.log(peranGuru);


  const aktivitases = await getDataTable(query, currentPage);
  const usulaktivitases = await getDataTable2(query, currentPage);
  const hasilusulan = await getDataTable3(query, currentPage);

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

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle ">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {aktivitases?.map((aktivitas) => {
              // Filter usulaktivitases to get matching id_aktivitas for each aktivitas
              const relatedUsulAktivitases = usulaktivitases.filter(
                (usul) => usul.id_aktivitas === aktivitas.id_aktivitas
              );

              return (
                <div
                  key={aktivitas.id_aktivitas}
                  className=" mb-4 w-full rounded-md bg-white p-4 shadow-lg "
                >
                  {/* Display main aktivitas details */}
                    <div className='flex items-center justify-between bg-green-100 p-2 w-full rounded-md'>
                      <div className=''>
                        <p className="text-sm font-semibold text-gray-900 ">
                          {aktivitas.nama_aktivitas}
                        </p>
                        <p className="text-[10px] text-gray-400">{aktivitas.tanggal}</p>
                        <p className="text-[10px] text-gray-400">bersama {aktivitas.pendamping}</p>
                        <p className="text-gray-700 mb-4 text-sm">{aktivitas.deskripsi}</p>
                      </div>
                      <div className="flex justify-end gap-3">
                        <div className="flex items-center justify-center">
                          <UpdateAktivitas id={aktivitas.id_aktivitas} />
                        </div>
                        <div className="flex items-center justify-center">
                          <CreateAktivitas id={aktivitas.id_aktivitas} />
                        </div>
                      </div>
                    </div>
                      {/* Display related usulaktivitases and hasilusulan */}
                      {relatedUsulAktivitases.length > 0 ? (
                        <div className="mt-2">
                          {relatedUsulAktivitases.map((usul) => {
                            // Filter hasilusulan to get matching id_usulan for each usul
                            const relatedHasilUsulan = hasilusulan.find(
                              (hasil) => hasil.id_usulan === usul.id_usulan
                            );

                            return (
                              <div
                                key={usul.id_usulan}
                                className="ml-4 mt-2 p-2 rounded bg-gray-100"
                              >
                                  <div className='flex items-center'>
                                    <Image
                                    src={gambarAnakku[usul.nama_anak]} //mengambil value gambarAnakku berdasar nilai usul.nama_anak
                                    className="mr-2 rounded-full w-[28px] h-[28px]"
                                    width="auto"
                                    height="auto"
                                    alt={`foto ${usul.nama_anak}`}
                                  />                      
                                  <p className="text-gray-900 text-sm">{usul.nama_anak}</p>
                                </div>
                                <div className=" mt-1 text-sm">
                                    <p className='text-gray-800 font-medium'>Usulan Kegiatan:</p>
                                    <p className='text-gray-700'>{usul.usul_kegiatan}</p>
                                     
                                  </div>
                                {/* Display hasil usulan if available */}
                                {relatedHasilUsulan ? (
                                  <div className=" mt-1 text-sm">
                                    <p className='text-gray-800 font-medium'>Hasil Pengamatan:</p>
                                    <p className='text-gray-700'>{relatedHasilUsulan.hasil_pengamatan}</p>
                                  </div>
                                ) : (
                                  <div>
                                    <p className="mt-1 text-xs italic text-red-600">(Belum Ada Hasil Pengamatan.)</p>
                                    {peranGuru==='guru'?
                                    <div className='flex items-center justify-end m-2'>
                                      <BeriTanggapan/>
                                    </div>:''}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className='flex items-center justify-center p-4'>
                        <div>
                          <Image
                                    src={rebahanFoto} //mengambil value gambarAnakku berdasar nilai usul.nama_anak
                                    className="w-[100px] h-[100px]"
                                    width="auto"
                                    height="auto"
                                    alt='Rebahan'
                                  />
                          <p className="mt-1 text-xs italic text-red-600">Tidak ada usulan kegiatan.</p>
                        </div>
                        </div>
                      )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
