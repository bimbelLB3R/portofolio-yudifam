"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { UpdateBakat } from "../ui/bakat/buttons";
import { AmbilSesi } from "./data";
import { AmbilTargetAnak } from "./data";
const SHEET_ID4 = process.env.NEXT_PUBLIC_SHEET_ID_DATAKESEHATAN;


export async function createKesehatan(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idKesehatan = Date.now(); //timestamp
  const rawFormData = {
    tgl_created: date,
    nama: formData.get("namaAnak"),
    jenis_penyakit: formData.get("jenis_penyakit"),
    penyebab: formData.get("penyebab"),
    id_penyakit: idKesehatan,
    tindakan: formData.get("tindakan"),
    tgl_update: "",
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
    const sheet = doc.sheetsById[SHEET_ID4];
    // console.log(sheet);

    await sheet.addRow(rawFormData);
  }
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal create data kesehatan.");
  }
  revalidatePath("/dashboard/kesehatan");
  redirect("/dashboard/kesehatan");
}

// update

export async function updateKesehatan(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idPenyakit = formData.get("id_penyakit");
  const rawFormData = {
    tgl_created: formData.get("tgl_created"),
    nama: formData.get("namaAnak"),
    jenis_penyakit: formData.get("jenis_penyakit"),
    penyebab: formData.get("penyebab"),
    id_penyakit: idPenyakit,
    tindakan: formData.get("tindakan"),
    tgl_update: date,
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
    const sheet = doc.sheetsById[SHEET_ID4];
    const rows = await sheet.getRows();
    const rowToUpdate = rows.find((item) => item.id_penyakit === idPenyakit);
    if (rowToUpdate) {
      rowToUpdate.tgl_created = rawFormData.tgl_created;
      rowToUpdate.nama = rawFormData.nama;
      rowToUpdate.jenis_penyakit = rawFormData.jenis_penyakit;
      rowToUpdate.penyebab = rawFormData.penyebab;
      rowToUpdate.id_penyakit = rawFormData.id_penyakit;
      rowToUpdate.tindakan = rawFormData.tindakan;
      rowToUpdate.tgl_update = rawFormData.tgl_update;
      await rowToUpdate.save();
    }
  }
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal Up date data kesehatan");
  }
  revalidatePath("/dashboard/kesehatan");
  redirect("/dashboard/kesehatan");
}

// delete
export async function deleteKesehatanById(formData) {
  const idToDel = formData.get("id_kesehatan"); //nama
  const id= formData.get("id"); //id
  // console.log(id)
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

    const sheet = doc.sheetsById[SHEET_ID4]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    const rowToDel = rows.find((item) => item.id_penyakit === id);
    // console.log(rowToDel);
    if (rowToDel) {
      await rowToDel.del();
    }
  }
    // console.log(rowToDelAll);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal hapus data kesehatan");
  }
  revalidatePath("/dashboard/kesehatan");
}
