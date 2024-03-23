// import fotoDefault from "/app/ui/fotoAnak/default.png";
// import { fetchDataAnaks } from "@/app/lib/data";
//
// const dataanaks = await fetchDataAnaks();
// const fotoanaks = dataanaks.map((item) => item.foto); //nama foto=namaanak.png
//
// //syarat:nama foto harus sama dengan nama anak.png
// const gambarAnak1 = (
//   await Promise.all(
//     fotoanaks.map(async (namaFile) => {
//       // Ambil nama anak dari nama file (tanpa ekstensi)
//       const namaAnak = namaFile.replace(".png", "");
//       try {
//         // Import gambar anak secara dinamis
//         ("use client");
//         const gambar = await import(`/app/ui/fotoAnak/${namaFile}`);
//         // Kembalikan pasangan nama anak dan gambar
//         return [namaAnak, gambar.default];
//       } catch (error) {
//         // Jika foto anak tidak tersedia, gunakan UserCircleIcon sebagai gantinya
//         return [namaAnak, fotoDefault];
//       }
//     })
//   )
// ).reduce((acc, [namaAnak, gambar]) => {
//   // Tambahkan pasangan nama anak dan gambar ke objek akumulator
//   acc[namaAnak] = gambar;
//   return acc;
// }, {});
//
// export async function gambarAnak() {
//   return gambarAnak1;
// }

export default function Page() {
  return <>Halo</>;
}
