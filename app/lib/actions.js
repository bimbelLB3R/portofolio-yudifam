"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { UpdateBakat } from "../ui/bakat/buttons";
import { AmbilSesi, AmbilSesiGuru, AmbilTargetAnak } from "./data";
import { auth } from "@/app/lib/auth";


// const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
// const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
const SHEET_ID1 = process.env.NEXT_PUBLIC_SHEET_ID1;

export async function createInvoice(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idBakat = Date.now(); //timestamp
  const rawFormData = {
    tanggal: date,
    nama: formData.get("namaAnak"),
    aktivitas: formData.get("aktivitas"),
    cerita: formData.get("cerita"),
    bakat: formData.get("bakat"),
    idBakat: idBakat,
    status: formData.get("status"),
    tgl_update: "",
    dominan: formData.get("dominan"),
    observer: formData.get("observer"),
  };
  // Spreadsheet IDs
  const anakTarget=rawFormData.nama;
  const anakTertarget=await AmbilTargetAnak(anakTarget);
  // console.log(anakTertarget);
  // cek guru atau ortu
  const ambilEmailDanRole = await AmbilSesi(); 
  const spreadsheetIdB =ambilEmailDanRole.role === 'guru'
  ? anakTertarget:ambilEmailDanRole.spreadsheetId; //spreadsheet target
  // Logika untuk menentukan spreadsheet yang akan digunakan
  const spreadsheetIds = ambilEmailDanRole.role === 'guru'
    ? [ambilEmailDanRole.spreadsheetId, spreadsheetIdB] // Jika email adalah bimbellb3r@gmail.com
    : [spreadsheetIdB]; // Selain itu, kirim hanya ke spreadsheetId A
  try {
    for (const SPREADSHEET_ID of spreadsheetIds) {
    // const SPREADSHEET_ID = await AmbilSesi(); // Mengambil SPREADSHEET_ID dari AmbilSesi()
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

    await sheet.addRow(rawFormData);
  }
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Failed to append data from tambah bakat.");
  }
  revalidatePath("/dashboard/bakat");
  redirect("/dashboard/bakat");

}

// update

export async function updateBakat(formData) {
  const date = new Date().toISOString().split("T")[0];
  const id_Bakat = formData.get("id_bakat");
  const rawFormData = {
    tanggal: formData.get("tanggal"),
    nama: formData.get("namaAnak"),
    aktivitas: formData.get("aktivitas"),
    cerita: formData.get("cerita"),
    bakat: formData.get("bakat"),
    idBakat: id_Bakat,
    status: formData.get("status"),
    tgl_update: date,
    dominan: formData.get("dominan"),
    observer: formData.get("observer"),
  };
  // Spreadsheet IDs
  const anakTarget=rawFormData.nama;
  console.log(anakTarget)
  const anakTertarget=await AmbilTargetAnak(anakTarget);
  const spreadsheetIdA = await AmbilSesi(); //spreaadsheet berdasar sesi
  const spreadsheetIdB =spreadsheetIdA.role === "guru"
  ? anakTertarget:spreadsheetIdA.spreadsheetId; //spreadsheet target
  // Logika untuk menentukan spreadsheet yang akan digunakan
  const spreadsheetIds = spreadsheetIdA.role === "guru"
    ? [spreadsheetIdA.spreadsheetId, spreadsheetIdB] // Jika email adalah bimbellb3r@gmail.com
    : [spreadsheetIdB]; // Selain itu, kirim hanya ke spreadsheetId A
  try {
    for (const SPREADSHEET_ID of spreadsheetIds) {
     // Mengambil SPREADSHEET_ID dari AmbilSesi()
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    // loads document properties and worksheets
    await doc.loadInfo();
    // console.log(SHEET_ID3);
    const sheet = doc.sheetsById[SHEET_ID1];
    const rows = await sheet.getRows();
    const rowToUpdate = rows.find((item) => item.idBakat === id_Bakat);
    if (rowToUpdate) {
      rowToUpdate.tanggal = rawFormData.tanggal;
      rowToUpdate.nama = rawFormData.nama;
      rowToUpdate.aktivitas = rawFormData.aktivitas;
      rowToUpdate.cerita = rawFormData.cerita;
      rowToUpdate.bakat = rawFormData.bakat;
      rowToUpdate.idBakat = rawFormData.idBakat;
      rowToUpdate.status = rawFormData.status;
      rowToUpdate.tgl_update = rawFormData.tgl_update;
      rowToUpdate.dominan = rawFormData.dominan;
      rowToUpdate.observer = rawFormData.observer;
      await rowToUpdate.save();
    }
  }
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Failed to update data .");
  }
  revalidatePath("/dashboard/bakat");
  redirect("/dashboard/bakat");
}

// delete
export async function deleteBakatById(formData) {
  const idToDel = formData.get("id_bakat");
  const id= formData.get("id");
  console.log(idToDel);
  // console.log(id);
  const anakTertarget=await AmbilTargetAnak(idToDel);
  // console.log(anakTertarget);
  const session = await auth();
  const spreadsheetIdA=await AmbilSesi();
  const spreadsheetIdB =spreadsheetIdA.role === "guru"
  ? anakTertarget:spreadsheetIdA.spreadsheetId; //spreadsheet target
  const spreadsheetIds = spreadsheetIdA.role === "guru"
    ? [spreadsheetIdA.spreadsheetId, spreadsheetIdB] // Jika email adalah bimbellb3r@gmail.com
    : [spreadsheetIdB]; // Selain itu, kirim hanya ke spreadsheetId A
  // jika sesi adalah guru maka ambil spreadsheet guru+spreadsheed anak, selain itu sesuai sesi.
  try {
    for (const SPREADSHEET_ID of spreadsheetIds) {
    // const SPREADSHEET_ID = await AmbilSesi(); // Mengambil SPREADSHEET_ID dari AmbilSesi()
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
    // console.log(rows);
    const rowToDel = rows.find((item) => item.idBakat === id);
    // console.log(rowToDel);
    if (rowToDel) {
      await rowToDel.del();
    }
  }
    // console.log(rowToDelAll);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to del data from sheet.");
  }
  revalidatePath("/dashboard/bakat");
}
