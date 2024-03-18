import { GoogleSpreadsheet } from "google-spreadsheet";

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID1 = process.env.NEXT_PUBLIC_SHEET_ID1;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

export async function getDataSheet() {
  try {
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID1]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    // const dataFromSheet = rows.map((item) => item.tanggal);
    // console.log(dataFromSheet);
    const tanggal = rows.map((item) => item.tanggal);
    const aktivitas = rows.map((item) => item.aktivitas);
    const cerita = rows.map((item) => item.cerita);
    return { tanggal, aktivitas, cerita };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data from sheet.");
  }
}

export async function appendToSpreadsheet(newRow) {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    // loads document properties and worksheets
    await doc.loadInfo();
    // console.log(SHEET_ID3);
    const sheet = doc.sheetsById[SHEET_ID1];
    // console.log(sheet);

    await sheet.addRow(newRow);
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Failed to append data to sheet.");
  }
}

export async function delDataSheet(tanggal) {
  try {
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID1]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    const rowToDel = rows.find((item) => item.tanggal === tanggal);
    // const rowToDelAll = rows.filter((item) => item.tanggal === tanggal); //hanya maks 2 data terhapus
    if (rowToDel) {
      await rowToDel.del();
    }
    // console.log(rowToDelAll);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to del data from sheet.");
  }
}

export async function updateDataSheet(newRow) {
  const tanggal = newRow.tanggal;
  try {
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID1]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    const rowToUpdate = rows.find((item) => item.tanggal === tanggal);
    // console.log(rowToUpdate);
    if (rowToUpdate) {
      // Update nilai setiap kolom

      rowToUpdate.tanggal = newRow.tanggal;
      rowToUpdate.aktivitas = newRow.aktivitas;
      rowToUpdate.cerita = newRow.cerita;
      await rowToUpdate.save(); // Simpan perubahan
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update data in sheet.");
  }
}

// bakat
const ITEMS_PER_PAGE = 6;
export async function getFilteredBakatData(query, currentPage) {
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

    const sheet = doc.sheetsById[SHEET_ID1]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    // let filteredRows = rows;
    if (query) {
      const lowerQuery = query.toLowerCase();
      const filteredRows = rows
        .filter(
          (item) =>
            item.nama.toLowerCase().includes(lowerQuery) ||
            item.bakat.toLowerCase().includes(lowerQuery)
        )
        .slice(offset, offset + ITEMS_PER_PAGE);

      return filteredRows;
    }
    if (!query) {
      const filteredRows = rows.slice(offset, offset + ITEMS_PER_PAGE);
      return filteredRows;
    }

    // Batasi jumlah data yang dikembalikan menjadi 6
    const bakats = filteredRows;

    return bakats;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data from bakat.");
  }
}

export async function getBakatData(query) {
  try {
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID1]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    // const dataFromSheet = rows.map((item) => item.tanggal);
    // console.log(dataFromSheet);
    const queryHrfKecil = query.toLowerCase();
    const bakat = rows.filter(
      (item) =>
        item.bakat.toLowerCase().includes(queryHrfKecil) ||
        item.nama.includes(queryHrfKecil)
    );
    const totalPages = Math.ceil(Number(bakat.length) / ITEMS_PER_PAGE);
    // console.log(totalPages);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data from bakat.");
  }
}

export async function getBakatDataById(idBakat) {
  try {
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID1]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    // const dataFromSheet = rows.map((item) => item.tanggal);
    // console.log(dataFromSheet);
    const bakatById = rows.filter((item) => item.idBakatById === idBakat);
    return { bakatById };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data from bakat.");
  }
}