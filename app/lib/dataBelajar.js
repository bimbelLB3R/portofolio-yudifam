import { GoogleSpreadsheet } from "google-spreadsheet";

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID1 = process.env.NEXT_PUBLIC_SHEET_ID1;
const SHEET_ID2 = process.env.NEXT_PUBLIC_SHEET_ID_DATAANAK;
const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID_DATABAKAT;
const SHEET_ID4 = process.env.NEXT_PUBLIC_SHEET_ID_DATAKESEHATAN;
const SHEET_ID5 = process.env.NEXT_PUBLIC_SHEET_ID_DATAKEIMANAN;
const SHEET_ID6 = process.env.NEXT_PUBLIC_SHEET_ID_DATABELAJAR;
const SHEET_ID7 = process.env.NEXT_PUBLIC_SHEET_ID_DATAKATEGORIBELAJAR;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const ITEMS_PER_PAGE = 6;
export async function getFilteredBelajarData(query, currentPage) {
  // console.log(`currentPAge=${currentPage}`);
  // console.log(query);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  // console.log(`offset=${offset}`);
  try {
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID6]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    // let filteredRows = rows;
    if (query) {
      const lowerQuery = query.toLowerCase();
      const filteredRows = rows
        .filter(
          (item) =>
            item.nama.toLowerCase().includes(lowerQuery) ||
            item.jenis_belajar.toLowerCase().includes(lowerQuery)
        )
        .sort((a, b) => {
          // Pastikan bahwa Anda memiliki properti yang sesuai untuk tanggal di dalam objek 'item'
          const dateA = a.id_belajar;
          const dateB = b.id_belajar;
          return dateB - dateA;
        }) // Mengurutkan idBakat terbaru ke terlama
        .slice(offset, offset + ITEMS_PER_PAGE);

      return filteredRows;
    }
    if (!query) {
      const filteredRows = rows
        .sort((a, b) => {
          // Pastikan bahwa Anda memiliki properti yang sesuai untuk idBakat di dalam objek 'item'
          const dateA = a.id_belajar;
          // console.log(`dateA=${dateA}`);
          const dateB = b.id_belajar;
          // console.log(`dateB=${dateB}`);
          return dateB - dateA;
        })
        .slice(offset, offset + ITEMS_PER_PAGE); // Mengurutkan tanggal terbaru ke terlama.slice(offset, offset + ITEMS_PER_PAGE);
      return filteredRows;
    }

    // Batasi jumlah data yang dikembalikan menjadi 6
    const belajars = filteredRows;

    return belajars;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal ambil data belajar.");
  }
}

export async function getBelajarData(query) {
  try {
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID6]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    // const dataFromSheet = rows.map((item) => item.tanggal);
    // console.log(dataFromSheet);
    const queryHrfKecil = query.toLowerCase();
    const belajar = rows.filter(
      (item) =>
        item.jenis_belajar.toLowerCase().includes(queryHrfKecil) ||
        item.nama.includes(queryHrfKecil)
    );
    const totalPages = Math.ceil(Number(belajar.length) / ITEMS_PER_PAGE);
    // console.log(totalPages);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal hitung data dari belajar.");
  }
}

export async function getBelajarDataById(idBelajarUpdate) {
  try {
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID6]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    // const dataFromSheet = rows.map((item) => item.tanggal);
    // console.log(dataFromSheet);
    const belajarById = rows.filter(
      (item) => item.id_belajar === idBelajarUpdate
    );
    return belajarById;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal ambil data belajar sesuai id");
  }
}

export async function getAllKategoriBelajar() {
  try {
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID7]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    // const dataFromSheet = rows.map((item) => item.tanggal);
    // console.log(dataFromSheet);
    const datakategoris = rows.filter((item) => item);
    return datakategoris;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data from AllKategori belajar.");
  }
}
