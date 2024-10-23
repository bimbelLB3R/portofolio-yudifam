import { GoogleSpreadsheet } from "google-spreadsheet";
import { auth } from "@/app/lib/auth";
// export async function AmbilSesi() {
//   const session = await auth();
//   // console.log(session.user.email)
//   const emailBySession=session.user.email;
//   if(emailBySession==='ayoberkarya@gmail.com'){
//     const SPREADSHEET_ID='1v40RH01aDnYcU5uE4F3_ysyIyZTEcnHE2oxW8brhjro';
//     return SPREADSHEET_ID
//   }else{
//     const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
//     return SPREADSHEET_ID
//   }
// }
export async function AmbilSesi() {
  const session = await auth();
  const emailBySession = session.user.email;

  // Mapping email ke SPREADSHEET_ID
  const spreadsheetMap = {
    'ayoberkarya@gmail.com': '1v40RH01aDnYcU5uE4F3_ysyIyZTEcnHE2oxW8brhjro',
    'ikhwchemist@gmail.com': process.env.NEXT_PUBLIC_SPREADSHEET_ID
  };

  // Memeriksa apakah email pengguna ada dalam map
  const SPREADSHEET_ID = spreadsheetMap[emailBySession];

  // Jika tidak ditemukan, lempar error
  if (!SPREADSHEET_ID) {
    throw new Error(`Spreadsheet ID not found for email: ${emailBySession}`);
  }

  return SPREADSHEET_ID;
}

const SHEET_ID1 = process.env.NEXT_PUBLIC_SHEET_ID1;
const SHEET_ID2 = process.env.NEXT_PUBLIC_SHEET_ID_DATAANAK;
const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID_DATABAKAT;
const SHEET_ID12 = process.env.NEXT_PUBLIC_SHEET_ID_DATAOBSERVER;

// const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

export async function getDataSheet() {
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
    const SPREADSHEET_ID = await AmbilSesi(); // Mengambil SPREADSHEET_ID dari AmbilSesi()
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
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
    const SPREADSHEET_ID = await AmbilSesi(); // Mengambil SPREADSHEET_ID dari AmbilSesi()
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
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
    const SPREADSHEET_ID = await AmbilSesi(); // Mengambil SPREADSHEET_ID dari AmbilSesi()
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
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
    const SPREADSHEET_ID = await AmbilSesi(); // Mengambil SPREADSHEET_ID dari AmbilSesi()
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
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
        .sort((a, b) => {
          // Pastikan bahwa Anda memiliki properti yang sesuai untuk tanggal di dalam objek 'item'
          const dateA = a.idBakat;
          const dateB = b.idBakat;
          return dateB - dateA;
        }) // Mengurutkan idBakat terbaru ke terlama
        .slice(offset, offset + ITEMS_PER_PAGE);

      return filteredRows;
    }
    if (!query) {
      const filteredRows = rows
        .sort((a, b) => {
          // Pastikan bahwa Anda memiliki properti yang sesuai untuk idBakat di dalam objek 'item'
          const dateA = a.idBakat;
          // console.log(`dateA=${dateA}`);
          const dateB = b.idBakat;
          // console.log(`dateB=${dateB}`);
          return dateB - dateA;
        })
        .slice(offset, offset + ITEMS_PER_PAGE); // Mengurutkan tanggal terbaru ke terlama.slice(offset, offset + ITEMS_PER_PAGE);
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
    const SPREADSHEET_ID = await AmbilSesi(); // Mengambil SPREADSHEET_ID dari AmbilSesi()
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
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

export async function getBakatDataById(idBakatUpdate) {
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

    const sheet = doc.sheetsById[SHEET_ID1]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    // const dataFromSheet = rows.map((item) => item.tanggal);
    // console.log(dataFromSheet);
    const bakatById = rows.filter((item) => item.idBakat === idBakatUpdate);
    return bakatById;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data from bakat.");
  }
}

export async function getBakatDataByNama(namaAnak) {
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

    const sheet = doc.sheetsById[SHEET_ID1]; // Misalnya, mengambil lembar kerja pertama
    const sheet2 = doc.sheetsById[SHEET_ID3]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    const rows2 = await sheet2.getRows(); // Mendapatkan semua baris dari lembar kerja
    // const dataFromSheet = rows.map((item) => item.tanggal);
    // console.log(dataFromSheet);
    const bakatByNama = rows.filter(
      (item) => item.nama === namaAnak && item.dominan === "kekuatan"
    );
    const bakatByNamaLemah = rows.filter(
      (item) => item.nama === namaAnak && item.dominan === "kelemahan"
    );

    const dataAnak = rows.filter(
      (item) => item.nama === namaAnak && item.dominan === "kekuatan"
    );
    const dataRows = dataAnak.map((item) => item.bakat);
    console.log(dataRows);
    const dataRows2 = rows2.map((item) => [
      { jenisBakat: item.jenisBakat, kelompok: item.kelompok },
    ]);
    // Membuat objek untuk memetakan jenisBakat dengan kelompoknya
    const mappingJenisBakat = {};
    dataRows2.forEach((item) => {
      const jenisBakat = item[0].jenisBakat;
      const kelompok = item[0].kelompok;
      mappingJenisBakat[jenisBakat] = kelompok;
    });

    // Mendapatkan kelompok untuk setiap bakat dari rows
    const kelompokBakat = dataRows.map((bakat) => {
      return mappingJenisBakat[bakat] || "";
    });

    // console.log(kelompokBakat);

    return {
      kekuatan: bakatByNama,
      kelemahan: bakatByNamaLemah,
      klusterBakat: kelompokBakat,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data from bakat by name.");
  }
}

export async function getAllBakat() {
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

    const sheet = doc.sheetsById[SHEET_ID3]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    // const dataFromSheet = rows.map((item) => item.tanggal);
    // console.log(dataFromSheet);
    const allBakats = rows.filter((item) => item);
    return allBakats;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data from Allbakat.");
  }
}

export async function fetchDataAnaks() {
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

    const sheet = doc.sheetsById[SHEET_ID2]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja

    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data from Data Anak.");
  }
}

export async function fetchDataObservers() {
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

    const sheet = doc.sheetsById[SHEET_ID12]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja

    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data from Data Observer.");
  }
}

export async function fetchNamaBakats() {
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

    const sheet = doc.sheetsById[SHEET_ID3]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja

    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data from Nama Bakat.");
  }
}

// ambil data definisi bakat
export async function getBakatDataByDefinisi(jenisBakat) {
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

    const sheet = doc.sheetsById[SHEET_ID3]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    // const dataFromSheet = rows.map((item) => item.tanggal);
    // console.log(dataFromSheet);
    const bakatByDefinisi = rows.filter(
      (item) => item.jenisBakat === jenisBakat
    );
    return bakatByDefinisi;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data from bakat by definisi.");
  }
}
