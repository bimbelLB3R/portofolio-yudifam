"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { UpdateBelajar } from "../ui/belajar/buttons";
import { AmbilSesi } from "./data";
import { AmbilTargetAnak } from "./data";
const SHEET_ID6 = process.env.NEXT_PUBLIC_SHEET_ID_DATABELAJAR;

export async function createBelajar(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idBelajar = Date.now(); //timestamp
  const rawFormData = {
    created_at: date,
    nama: formData.get("namaAnak"),
    jenis_belajar: formData.get("jenis_belajar"),
    aktivitas_belajar: formData.get("aktivitas_belajar"),
    id_belajar: idBelajar,
    uraian_belajar: formData.get("uraian_belajar"),
    updated_at: "",
  };
    const anakTarget=rawFormData.nama;
    const anakTertarget=await AmbilTargetAnak(anakTarget);
    const ambilEmailDanRole = await AmbilSesi();
    const spreadsheetIdB =ambilEmailDanRole.role === 'guru'
      ? anakTertarget:ambilEmailDanRole.spreadsheetId; 
    const spreadsheetIds = ambilEmailDanRole.role === 'guru'
      ? [ambilEmailDanRole.spreadsheetId, spreadsheetIdB]
      : [spreadsheetIdB]; 
      
  try {
    for (const SPREADSHEET_ID of spreadsheetIds) {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    // loads document properties and worksheets
    await doc.loadInfo();
    // console.log(SHEET_ID3);
    const sheet = doc.sheetsById[SHEET_ID6];
    // console.log(sheet);

    await sheet.addRow(rawFormData);
    }
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal create data belajar.");
  }
  revalidatePath("/dashboard/belajar");
  redirect("/dashboard/belajar");
}

// update

export async function updateBelajar(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idBelajar = formData.get("id_belajar");
  const rawFormData = {
    created_at: formData.get("created_at"),
    nama: formData.get("namaAnak"),
    jenis_belajar: formData.get("jenis_belajar"),
    aktivitas_belajar: formData.get("aktivitas_belajar"),
    id_belajar: idBelajar,
    uraian_belajar: formData.get("uraian_belajar"),
    updated_at: date,
  };
  const anakTarget=rawFormData.nama;
  const anakTertarget=await AmbilTargetAnak(anakTarget);
  const spreadsheetIdA = await AmbilSesi(); 
  const spreadsheetIdB =spreadsheetIdA.role === "guru"
  ? anakTertarget:spreadsheetIdA.spreadsheetId;
  const spreadsheetIds = spreadsheetIdA.role === "guru"
    ? [spreadsheetIdA.spreadsheetId, spreadsheetIdB] 
    : [spreadsheetIdB];
  try {
    for (const SPREADSHEET_ID of spreadsheetIds) {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    // loads document properties and worksheets
    await doc.loadInfo();
    // console.log(SHEET_ID3);
    const sheet = doc.sheetsById[SHEET_ID6];
    const rows = await sheet.getRows();
    const rowToUpdate = rows.find((item) => item.id_belajar === idBelajar);
    if (rowToUpdate) {
      rowToUpdate.created_at = rawFormData.created_at;
      rowToUpdate.id_belajar = rawFormData.id_belajar;
      rowToUpdate.nama = rawFormData.nama;
      rowToUpdate.jenis_belajar = rawFormData.jenis_belajar;
      rowToUpdate.aktivitas_belajar = rawFormData.aktivitas_belajar;
      rowToUpdate.uraian_belajar = rawFormData.uraian_belajar;
      rowToUpdate.updated_at = rawFormData.updated_at;
      await rowToUpdate.save();
    }
  }
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal Up date data belajar");
  }
  revalidatePath("/dashboard/belajar");
  redirect("/dashboard/belajar");
}

// delete
export async function deleteBelajarById(formData) {
  const idToDel = formData.get("id_belajar"); //nama
  const id= formData.get("id"); //id
  console.log(id)
  const anakTertarget=await AmbilTargetAnak(idToDel);
  const spreadsheetIdA=await AmbilSesi();
  const spreadsheetIdB =spreadsheetIdA.role === "guru"
  ? anakTertarget:spreadsheetIdA.spreadsheetId; //spreadsheet target
  const spreadsheetIds = spreadsheetIdA.role === "guru"
    ? [spreadsheetIdA.spreadsheetId, spreadsheetIdB] 
    : [spreadsheetIdB]; 
  try {
    for (const SPREADSHEET_ID of spreadsheetIds) {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID6]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    const rowToDel = rows.find((item) => item.id_belajar === id);
    // console.log(rowToDel);
    if (rowToDel) {
      await rowToDel.del();
    }
  }
    // console.log(rowToDelAll);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal hapus data belajar");
  }
  revalidatePath("/dashboard/belajar");
}
