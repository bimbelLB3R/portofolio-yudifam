"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { UpdateBelajar } from "../ui/belajar/buttons";

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID1 = process.env.NEXT_PUBLIC_SHEET_ID1;
const SHEET_ID4 = process.env.NEXT_PUBLIC_SHEET_ID_DATAKESEHATAN;
const SHEET_ID5 = process.env.NEXT_PUBLIC_SHEET_ID_DATAKEIMANAN;
const SHEET_ID6 = process.env.NEXT_PUBLIC_SHEET_ID_DATABELAJAR;
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

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
  try {
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
  try {
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
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal Up date data belajar");
  }
  revalidatePath("/dashboard/belajar");
  redirect("/dashboard/belajar");
}

// delete
export async function deleteBelajarById(formData) {
  // throw new Error("Failed to Delete Invoice");
  const idToDel = formData.get("id_belajar");
  // console.log(`iddel=${idToDel}`);
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
    const rowToDel = rows.find((item) => item.id_belajar === idToDel);
    // console.log(rowToDel);
    if (rowToDel) {
      await rowToDel.del();
    }
    // console.log(rowToDelAll);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal hapus data belajar");
  }
  revalidatePath("/dashboard/belajar");
}
