"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { UpdateKeimanan } from "../ui/keimanan/buttons";
import { AmbilSesi } from "./data";
const SHEET_ID5 = process.env.NEXT_PUBLIC_SHEET_ID_DATAKEIMANAN;


export async function createKeimanan(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idKeimanan = Date.now(); //timestamp
  const rawFormData = {
    created_at: date,
    nama: formData.get("namaAnak"),
    jenis_keimanan: formData.get("jenis_keimanan"),
    aktivitas_keimanan: formData.get("aktivitas_keimanan"),
    id_keimanan: idKeimanan,
    uraian_keimanan: formData.get("uraian_keimanan"),
    updated_at: "",
  };
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
    const sheet = doc.sheetsById[SHEET_ID5];
    // console.log(sheet);

    await sheet.addRow(rawFormData);
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal create data keimanan.");
  }
  revalidatePath("/dashboard/keimanan");
  redirect("/dashboard/keimanan");
}

// update

export async function updateKeimanan(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idKeimanan = formData.get("id_keimanan");
  const rawFormData = {
    created_at: formData.get("created_at"),
    nama: formData.get("namaAnak"),
    jenis_keimanan: formData.get("jenis_keimanan"),
    aktivitas_keimanan: formData.get("aktivitas_keimanan"),
    id_keimanan: idKeimanan,
    uraian_keimanan: formData.get("uraian_keimanan"),
    updated_at: date,
  };
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
    const sheet = doc.sheetsById[SHEET_ID5];
    const rows = await sheet.getRows();
    const rowToUpdate = rows.find((item) => item.id_keimanan === idKeimanan);
    if (rowToUpdate) {
      rowToUpdate.created_at = rawFormData.created_at;
      rowToUpdate.id_keimanan = rawFormData.id_keimanan;
      rowToUpdate.nama = rawFormData.nama;
      rowToUpdate.jenis_keimanan = rawFormData.jenis_keimanan;
      rowToUpdate.aktivitas_keimanan = rawFormData.aktivitas_keimanan;
      rowToUpdate.uraian_keimanan = rawFormData.uraian_keimanan;
      rowToUpdate.updated_at = rawFormData.updated_at;
      await rowToUpdate.save();
    }
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal Up date data keimanan");
  }
  revalidatePath("/dashboard/keimanan");
  redirect("/dashboard/keimanan");
}

// delete
export async function deleteKeimananById(formData) {
  // throw new Error("Failed to Delete Invoice");
  const idToDel = formData.get("id_keimanan");
  // console.log(`iddel=${idToDel}`);
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

    const sheet = doc.sheetsById[SHEET_ID5]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    const rowToDel = rows.find((item) => item.id_keimanan === idToDel);
    // console.log(rowToDel);
    if (rowToDel) {
      await rowToDel.del();
    }
    // console.log(rowToDelAll);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal hapus data keimanan");
  }
  revalidatePath("/dashboard/keimanan");
}
