"use client";
import { fetchDataAnaks } from "@/app/lib/data";
import fotoDefault from "/app/ui/fotoAnak/default.png";

const dataanaks = await fetchDataAnaks();
const fotoanaks = dataanaks.map((item) => item.foto); //nama foto=namaanak.png

//syarat:nama foto harus sama dengan nama anak.png
export const gambarAnak = await Promise.all(
  fotoanaks.map(async (namaFile) => {
    // Ambil nama anak dari nama file (tanpa ekstensi)
    const namaAnak = namaFile.replace(".png", "");
    try {
      // Import gambar anak secara dinamis
      const gambar = await import(`/app/ui/fotoAnak/${namaFile}`);
      // Kembalikan pasangan nama anak dan gambar
      return [namaAnak, gambar.default];
    } catch (error) {
      // Jika terjadi kesalahan saat mengimpor gambar anak, gunakan foto default
      return [namaAnak, fotoDefault];
    }
  })
).then((gambarAnakArray) => {
  // Mengonversi array menjadi objek gambarAnak
  return gambarAnakArray.reduce((acc, [namaAnak, gambar]) => {
    acc[namaAnak] = gambar;
    return acc;
  }, {});
});
