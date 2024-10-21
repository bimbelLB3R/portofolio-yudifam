import { GoogleSpreadsheet } from "google-spreadsheet";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import fs from 'fs/promises';
import path from 'path';

const SHEET_ID3 = process.env.NEXT_PUBLIC_SHEET_ID_DATABAKAT;
export async function CurrentUserData() {
  const filePath = path.join(process.cwd(), 'app', 'api', 'user.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(fileContents);
  // console.log(data.users)
  const session = await auth();
// console.log(session)
// Ambil email dari session
  const userEmail = session?.user?.email;
// Mencari user dengan email yang cocok
  const currentUser = data.users.find(user => user.email === userEmail);
// console.log(currentUser)
  if (!currentUser) {
  // Jika tidak ada user dengan email tersebut, redirect atau tampilkan pesan error
  // redirect("/not-found");  // Sesuaikan dengan halaman error atau penanganan lain
  console.log('User tidak ada');
  redirect("/dashboard");
}
  // Ambil spreadsheetId dan sheetIds.bakat dari currentUser
  const SPREADSHEET_ID = currentUser.spreadsheetId;
  const SHEET_ID1 = currentUser.sheetIds.bakat;
  const SHEET_ID2=currentUser.sheetIds.dataAnak;
  const SHEET_ID4=currentUser.sheetIds.kesehatan;
  const SHEET_ID5=currentUser.sheetIds.keimanan;
  const SHEET_ID6=currentUser.sheetIds.belajar;
  const SHEET_ID7=currentUser.sheetIds.kategoriBelajar;
  const SHEET_ID8=currentUser.sheetIds.perkembangan;
  const SHEET_ID9=currentUser.sheetIds.seksualitas;
  const SHEET_ID10=currentUser.sheetIds.estetika;
  const SHEET_ID11=currentUser.sheetIds.individualitas;
  const SHEET_ID12=currentUser.sheetIds.observer;
  return {
    SPREADSHEET_ID,
    SHEET_ID1,
    SHEET_ID2,
    SHEET_ID4,
    SHEET_ID5,
    SHEET_ID6,
    SHEET_ID7,
    SHEET_ID8,
    SHEET_ID9,
    SHEET_ID10,
    SHEET_ID11,
    SHEET_ID12,
    currentUser
  };
}


export async function accessSpreadsheet() {
  try {
    // Panggil CurrentUserData untuk mendapatkan SPREADSHEET_ID
    const { SPREADSHEET_ID } = await CurrentUserData();  // Tunggu hingga datanya tersedia
    // console.log(SPREADSHEET_ID);
    if (!SPREADSHEET_ID) {
      console.error('Spreadsheet ID tidak ditemukan');
      return null;  // Kembalikan null jika SPREADSHEET_ID tidak ada
    }

    // Inisialisasi GoogleSpreadsheet dengan SPREADSHEET_ID
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    // Kembalikan objek doc
    return doc;

  } catch (error) {
    console.error('Error saat inisialisasi GoogleSpreadsheet:', error);
    return null;  // Kembalikan null jika terjadi error
  }
}

export async function getDataSheet() {
  try {
    const doc=await accessSpreadsheet();
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();
    const { SHEET_ID1 } = await CurrentUserData();
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
    const doc=await accessSpreadsheet();
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    // loads document properties and worksheets
    await doc.loadInfo();
    // console.log(SHEET_ID3);
    const { SHEET_ID1 } = await CurrentUserData();
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
    const doc=await accessSpreadsheet();
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();
    const { SHEET_ID1 } = await CurrentUserData();
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
    const doc=await accessSpreadsheet();
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();
    const { SHEET_ID1 } = await CurrentUserData();
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
    const doc=await accessSpreadsheet();
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();
    const { SHEET_ID1 } = await CurrentUserData();
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
  // console.log(session)
  try {
    const doc=await accessSpreadsheet();
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();
    const { SHEET_ID1 } = await CurrentUserData();
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
    const doc=await accessSpreadsheet();
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();
    const { SHEET_ID1 } = await CurrentUserData();
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
    const doc=await accessSpreadsheet();
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();
    const { SHEET_ID1 } = await CurrentUserData();
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
    const doc=await accessSpreadsheet();
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
    const doc=await accessSpreadsheet();
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();
    const { SHEET_ID2 } = await CurrentUserData();
    const sheet = doc.sheetsById[SHEET_ID2]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja

    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data from sheet 2.");
  }
}

export async function fetchDataObservers() {
  try {
    const doc=await accessSpreadsheet();
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();
    const { SHEET_ID12 } = await CurrentUserData();
    const sheet = doc.sheetsById[SHEET_ID12]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja

    return rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch data from sheet 2.");
  }
}

export async function fetchNamaBakats() {
  try {
    const doc=await accessSpreadsheet();
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
    throw new Error("Failed to fetch data from sheet 2.");
  }
}

// ambil data definisi bakat
export async function getBakatDataByDefinisi(jenisBakat) {
  try {
    const doc=await accessSpreadsheet();
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
