import { GoogleSpreadsheet } from "google-spreadsheet";
import { auth } from "@/app/lib/auth";
// On Vercel, the maximum number of environment variables you can have per environment (like Production, Preview, or Development) is 1,000 per project. Additionally, the total size of your environment variables (including both the names and values) is limited to 64KB. This size limit applies per deployment and to any single environment variable within the project. googlesheet API,300 requests per minute per project, with a limit of 60 requests per minute per user.
export async function AmbilSesi() { //khusus ortu
  const session = await auth();
  const emailBySession = session.user.email;

  // Mapping email ke SPREADSHEET_ID
  const spreadsheetMap = {
    //email ortu
    'ikhwchemist@gmail.com': {
      role:'ortu',
      spreadsheetId:process.env.NEXT_PUBLIC_SPREADSHEET_ID
    },
    //email guru
    'bimbellb3r@gmail.com':{
      role:'guru',
      spreadsheetId:'1x2pbU-NULZ_B8-Ug2HEe4yVcogcst-oFXOuMfQ281Hc'
    },
    'yusuf.nough18@gmail.com ':{
      role:'guru',
      spreadsheetId:'1x2pbU-NULZ_B8-Ug2HEe4yVcogcst-oFXOuMfQ281Hc'
    } 
  };
  // Memeriksa apakah email pengguna ada dalam map
  const SPREADSHEET_ID = spreadsheetMap[emailBySession];

  // Jika tidak ditemukan, lempar error
  if (!SPREADSHEET_ID) {
    throw new Error(`Spreadsheet IDOrtu atau guru not found for email: ${emailBySession}`);
  }

  return SPREADSHEET_ID;
}

export async function AmbilTargetAnak(anakTarget) {;
  const emailBySession = anakTarget;

  // Mapping email ke SPREADSHEET_ID
  const spreadsheetMap = {
    'nouval': '1v40RH01aDnYcU5uE4F3_ysyIyZTEcnHE2oxW8brhjro',
    'aqila': process.env.NEXT_PUBLIC_SPREADSHEET_ID,
    'yuzarsif':'16mwB46HNp4si3PxM4_XHEn4Jy1bNnVBZjQ09FKn2jnQ',
    'yusuf':'1gekeqQ9t1tN0zEzKSvVNvxIhycNYJ_we1jVzZzvnEYA',
    'rizki':'1GoG-NkaoHqZzwady4fQtOWVt0X5LdpLF-AdNq14tJzg',
    'najma':'1yyJad1tW4b7vRi_wCX2dta6DR42sDso9eSWOt8plw3M',
    'maman':'1EccOiTstxHbG7fJZz4eVTt3bErzVZEj7F_ph5N22Nxw',
    'khairul':'1EnUOvhu6yYxj42Yf-lS5kruI9-ZFWooz4357MsHdB_k',
    'haikal':'1iRLF9RESVjplshFepQ02gJ4PkEcAKAVWlTRKnsXVD48',
    'ghazi':'1NeA4aZe2srb5MJvVuz5yn7spbA-S6qI4miVoFwcTscY',
    'acin':'1ukndPZd2tw52COc6kHIfjNfnzcWbKbOi4nf1aAk-EQ8'
  };
  let SPREADSHEET_IDTARGET = spreadsheetMap[emailBySession];
  if (!SPREADSHEET_IDTARGET) {
    // throw new Error(`Spreadsheet IDAnak not found for email: ${emailBySession}`);
    const ambilEmailDanRole = await AmbilSesi();
    SPREADSHEET_IDTARGET=ambilEmailDanRole.spreadsheetId;
  }

  return SPREADSHEET_IDTARGET;
}



const SHEET_ID1 = process.env.NEXT_PUBLIC_SHEET_ID1;
const SHEET_ID2 = process.env.NEXT_PUBLIC_SHEET_ID_DATAANAK;
const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID_DATABAKAT;
const SHEET_ID12 = process.env.NEXT_PUBLIC_SHEET_ID_DATAOBSERVER;

// const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

export async function getDataSheet() {
  try {
    const ambilEmailDanRole = await AmbilSesi();
    const SPREADSHEET_ID = ambilEmailDanRole.spreadsheetId; // Mengambil SPREADSHEET_ID dari AmbilSesi()
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
    const ambilEmailDanRole = await AmbilSesi();
    const SPREADSHEET_ID = ambilEmailDanRole.spreadsheetId; // Mengambil SPREADSHEET_ID dari AmbilSesi()
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
    const ambilEmailDanRole = await AmbilSesi();
    const SPREADSHEET_ID = ambilEmailDanRole.spreadsheetId; // Mengambil SPREADSHEET_ID dari AmbilSesi()
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
    const ambilEmailDanRole = await AmbilSesi();
    const SPREADSHEET_ID = ambilEmailDanRole.spreadsheetId; // Mengambil SPREADSHEET_ID dari AmbilSesi()
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
    const ambilEmailDanRole = await AmbilSesi();
    const SPREADSHEET_ID = ambilEmailDanRole.spreadsheetId; // Mengambil SPREADSHEET_ID dari AmbilSesi()
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
    const ambilEmailDanRole = await AmbilSesi();
    const SPREADSHEET_ID = ambilEmailDanRole.spreadsheetId; // Mengambil SPREADSHEET_ID dari AmbilSesi()
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
    const ambilEmailDanRole = await AmbilSesi();
    const SPREADSHEET_ID = ambilEmailDanRole.spreadsheetId; // Mengambil SPREADSHEET_ID dari AmbilSesi()
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
    const ambilEmailDanRole = await AmbilSesi();
    const SPREADSHEET_ID = ambilEmailDanRole.spreadsheetId; // Mengambil SPREADSHEET_ID dari AmbilSesi()
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
    const ambilEmailDanRole = await AmbilSesi();
    const SPREADSHEET_ID = ambilEmailDanRole.spreadsheetId; // Mengambil SPREADSHEET_ID dari AmbilSesi()
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
    const ambilEmailDanRole = await AmbilSesi();
    const SPREADSHEET_ID = ambilEmailDanRole.spreadsheetId; // Mengambil SPREADSHEET_ID dari AmbilSesi()
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
    const ambilEmailDanRole = await AmbilSesi();
    const SPREADSHEET_ID = ambilEmailDanRole.spreadsheetId; // Mengambil SPREADSHEET_ID dari AmbilSesi()
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
    const ambilEmailDanRole = await AmbilSesi();
    const SPREADSHEET_ID = ambilEmailDanRole.spreadsheetId; // Mengambil SPREADSHEET_ID dari AmbilSesi()
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
    const ambilEmailDanRole = await AmbilSesi();
    const SPREADSHEET_ID = ambilEmailDanRole.spreadsheetId; // Mengambil SPREADSHEET_ID dari AmbilSesi()
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
