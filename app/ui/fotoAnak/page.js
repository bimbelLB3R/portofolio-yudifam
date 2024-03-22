const path = require("path");
const fs = require("fs/promises"); // Untuk menggunakan fs.promises, pastikan versi Node.js Anda mendukungnya (Node.js >= 14.0.0)

const fotoDefaultPath = path.resolve(__dirname, "/app/ui/fotoAnak/default.png");

const dataanaks = await fetchDataAnaks();
const fotoanaks = dataanaks.map((item) => item.foto);

const gambarAnak1 = await Promise.all(
  fotoanaks.map(async (namaFile) => {
    const namaAnak = namaFile.replace(".png", "");
    const fotoPath = path.resolve(__dirname, `/app/ui/fotoAnak/${namaFile}`);
    try {
      const gambar = await fs.readFile(fotoPath);
      return [namaAnak, gambar];
    } catch (error) {
      // Jika foto anak tidak tersedia, gunakan foto default
      const gambar = await fs.readFile(fotoDefaultPath);
      return [namaAnak, gambar];
    }
  })
).then((gambarAnakPairs) => {
  return gambarAnakPairs.reduce((acc, [namaAnak, gambar]) => {
    acc[namaAnak] = gambar;
    return acc;
  }, {});
});

export async function gambarAnak() {
  return gambarAnak1;
}
