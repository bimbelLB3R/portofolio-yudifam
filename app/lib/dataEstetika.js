import { GoogleSpreadsheet } from "google-spreadsheet";
import { AmbilSesi } from "./data";
const SHEET_ID10 = process.env.NEXT_PUBLIC_SHEET_ID_DATAESTETIKA;


const ITEMS_PER_PAGE = 6;
export async function getFilteredEstetikaData(query, currentPage) {
  // console.log(`currentPAge=${currentPage}`);
  // console.log(query);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  // console.log(`offset=${offset}`);
  try {
    const SPREADSHEET_ID = await AmbilSesi(); // Mengambil SPREADSHEET_ID dari AmbilSesi()
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID10]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    // let filteredRows = rows;
    if (query) {
      const lowerQuery = query.toLowerCase();
      const filteredRows = rows
        .filter(
          (item) =>
            item.nama.toLowerCase().includes(lowerQuery) ||
            item.jenis_estetika.toLowerCase().includes(lowerQuery)
        )
        .sort((a, b) => {
          // Pastikan bahwa Anda memiliki properti yang sesuai untuk tanggal di dalam objek 'item'
          const dateA = a.id_estetika;
          const dateB = b.id_estetika;
          return dateB - dateA;
        }) // Mengurutkan idBakat terbaru ke terlama
        .slice(offset, offset + ITEMS_PER_PAGE);

      return filteredRows;
    }
    if (!query) {
      const filteredRows = rows
        .sort((a, b) => {
          // Pastikan bahwa Anda memiliki properti yang sesuai untuk idBakat di dalam objek 'item'
          const dateA = a.id_estetika;
          // console.log(`dateA=${dateA}`);
          const dateB = b.id_estetika;
          // console.log(`dateB=${dateB}`);
          return dateB - dateA;
        })
        .slice(offset, offset + ITEMS_PER_PAGE); // Mengurutkan tanggal terbaru ke terlama.slice(offset, offset + ITEMS_PER_PAGE);
      return filteredRows;
    }

    // Batasi jumlah data yang dikembalikan menjadi 6
    const estetikas = filteredRows;

    return estetikas;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal ambil data estetika.");
  }
}

export async function getEstetikaData(query) {
  try {
    const SPREADSHEET_ID = await AmbilSesi(); // Mengambil SPREADSHEET_ID dari AmbilSesi()
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID10]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    // const dataFromSheet = rows.map((item) => item.tanggal);
    // console.log(dataFromSheet);
    const queryHrfKecil = query.toLowerCase();
    const estetika = rows.filter(
      (item) =>
        item.jenis_estetika.toLowerCase().includes(queryHrfKecil) ||
        item.nama.includes(queryHrfKecil)
    );
    const totalPages = Math.ceil(Number(estetika.length) / ITEMS_PER_PAGE);
    // console.log(totalPages);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal hitung data dari estetika.");
  }
}

export async function getEstetikaDataById(idEstetikaUpdate) {
  try {
    const SPREADSHEET_ID = await AmbilSesi(); // Mengambil SPREADSHEET_ID dari AmbilSesi()
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID10]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    // const dataFromSheet = rows.map((item) => item.tanggal);
    // console.log(dataFromSheet);
    const estetikaById = rows.filter(
      (item) => item.id_estetika === idEstetikaUpdate
    );
    return estetikaById;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal ambil data estetika sesuai id");
  }
}
