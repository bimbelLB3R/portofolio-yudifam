import { AmbilSesi } from "./data";
import { GoogleSpreadsheet } from "google-spreadsheet";

const SHEET_ID1 = process.env.NEXT_PUBLIC_SHEET_ID_DATAAKTIVITAS;
const SHEET_IDUSULAKTIVITAS=process.env.NEXT_PUBLIC_SHEET_ID_DATAUSULAKTIVITAS;
const SHEET_IDHASILUSUL=process.env.NEXT_PUBLIC_SHEET_ID_DATAHASILUSUL;
const ITEMS_PER_PAGE = 6;
export async function getAktivitasData(query) {
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
      const aktivitas = rows.filter(
        (item) =>
          item.nama_aktivitas.includes(queryHrfKecil)
      );
      const totalPages = Math.ceil(Number(aktivitas.length) / ITEMS_PER_PAGE);
      // console.log(totalPages);
      return totalPages;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch data from aktivitas.");
    }
  }

  export async function getFilteredAktivitasData(query, currentPage) {
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
              item.nama_aktivitas.toLowerCase().includes(lowerQuery) 
          )
          .sort((a, b) => {
            // Pastikan bahwa Anda memiliki properti yang sesuai untuk tanggal di dalam objek 'item'
            const dateA = a.id_aktivitas;
            const dateB = b.id_aktivitas;
            return dateB - dateA;
          }) // Mengurutkan id_aktivitas terbaru ke terlama
          .slice(offset, offset + ITEMS_PER_PAGE);
        
  
        return filteredRows;
      }
      if (!query) {
        const filteredRows = rows
          .sort((a, b) => {
            // Pastikan bahwa Anda memiliki properti yang sesuai untuk id_aktivitas di dalam objek 'item'
            const dateA = a.id_aktivitas;
            // console.log(`dateA=${dateA}`);
            const dateB = b.id_aktivitas;
            // console.log(`dateB=${dateB}`);
            return dateB - dateA;
          })
          .slice(offset, offset + ITEMS_PER_PAGE); // Mengurutkan tanggal terbaru ke terlama.slice(offset, offset + ITEMS_PER_PAGE);
        return filteredRows;
      }
  
      // Batasi jumlah data yang dikembalikan menjadi 6
      const aktivitases = filteredRows;
  
      return aktivitases;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch data from filteredAktivitas.");
    }
  }


  export async function getFilteredUsulAktivitasData(query, currentPage) {
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
  
      const sheet = doc.sheetsById[SHEET_IDUSULAKTIVITAS]; // Misalnya, mengambil lembar kerja pertama
      const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
      // let filteredRows = rows;
      if (query) {
        const lowerQuery = query.toLowerCase();
        const filteredRows = rows
          .filter(
            (item) =>
              item.nama_anak.toLowerCase().includes(lowerQuery) 
          )
          .sort((a, b) => {
            // Pastikan bahwa Anda memiliki properti yang sesuai untuk tanggal di dalam objek 'item'
            const dateA = a.id_aktivitas;
            const dateB = b.id_aktivitas;
            return dateB - dateA;
          }) // Mengurutkan id_aktivitas terbaru ke terlama
          .slice(offset, offset + ITEMS_PER_PAGE);
        
  
        return filteredRows;
      }
      if (!query) {
        const filteredRows = rows
          .sort((a, b) => {
            // Pastikan bahwa Anda memiliki properti yang sesuai untuk id_aktivitas di dalam objek 'item'
            const dateA = a.id_aktivitas;
            // console.log(`dateA=${dateA}`);
            const dateB = b.id_aktivitas;
            // console.log(`dateB=${dateB}`);
            return dateB - dateA;
          })
          .slice(offset, offset + ITEMS_PER_PAGE); // Mengurutkan tanggal terbaru ke terlama.slice(offset, offset + ITEMS_PER_PAGE);
        return filteredRows;
      }
  
      // Batasi jumlah data yang dikembalikan menjadi 6
      const aktivitases = filteredRows;
  
      return aktivitases;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch data from filteredUsulAktivitas.");
    }
  }

  export async function getHasilUsulan(query, currentPage) {
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
  
      const sheet = doc.sheetsById[SHEET_IDHASILUSUL]; // Misalnya, mengambil lembar kerja pertama
      const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
      // let filteredRows = rows;
      if (query) {
        const lowerQuery = query.toLowerCase();
        const filteredRows = rows
          .filter(
            (item) =>
              item.id_usulan.toLowerCase().includes(lowerQuery) 
          )
          .sort((a, b) => {
            // Pastikan bahwa Anda memiliki properti yang sesuai untuk tanggal di dalam objek 'item'
            const dateA = a.id_usulan;
            const dateB = b.id_usulan;
            return dateB - dateA;
          }) // Mengurutkan id_aktivitas terbaru ke terlama
          .slice(offset, offset + ITEMS_PER_PAGE);
        
  
        return filteredRows;
      }
      if (!query) {
        const filteredRows = rows
          .sort((a, b) => {
            // Pastikan bahwa Anda memiliki properti yang sesuai untuk id_aktivitas di dalam objek 'item'
            const dateA = a.id_usulan;
            // console.log(`dateA=${dateA}`);
            const dateB = b.id_usulan;
            // console.log(`dateB=${dateB}`);
            return dateB - dateA;
          })
          .slice(offset, offset + ITEMS_PER_PAGE); // Mengurutkan tanggal terbaru ke terlama.slice(offset, offset + ITEMS_PER_PAGE);
        return filteredRows;
      }
  
      // Batasi jumlah data yang dikembalikan menjadi 6
      const usulans = filteredRows;
  
      return usulans;
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Failed to fetch data from Hasil Usulan.");
    }
  }