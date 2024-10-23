"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { UpdateEstetika } from "../ui/estetika/buttons";
import { AmbilSesi } from "./data";

const SHEET_ID9 = process.env.NEXT_PUBLIC_SHEET_ID_DATAESTETIKA;


export async function createEstetika(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idEstetika = Date.now(); //timestamp
  const rawFormData = {
    created_at: date,
    nama: formData.get("namaAnak"),
    jenis_estetika: formData.get("jenis_estetika"),
    aktivitas_estetika: formData.get("aktivitas_estetika"),
    id_estetika: idEstetika,
    uraian_estetika: formData.get("uraian_estetika"),
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
    const sheet = doc.sheetsById[SHEET_ID9];
    // console.log(sheet);

    await sheet.addRow(rawFormData);
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal create data estetika.");
  }
  revalidatePath("/dashboard/estetika");
  redirect("/dashboard/estetika");
}

// update

export async function updateEstetika(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idEstetika = formData.get("id_estetika");
  const rawFormData = {
    created_at: formData.get("created_at"),
    nama: formData.get("namaAnak"),
    jenis_estetika: formData.get("jenis_estetika"),
    aktivitas_estetika: formData.get("aktivitas_estetika"),
    id_estetika: idEstetika,
    uraian_estetika: formData.get("uraian_estetika"),
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
    const sheet = doc.sheetsById[SHEET_ID9];
    const rows = await sheet.getRows();
    const rowToUpdate = rows.find((item) => item.id_estetika === idEstetika);
    if (rowToUpdate) {
      rowToUpdate.created_at = rawFormData.created_at;
      rowToUpdate.id_estetika = rawFormData.id_estetika;
      rowToUpdate.nama = rawFormData.nama;
      rowToUpdate.jenis_estetika = rawFormData.jenis_estetika;
      rowToUpdate.aktivitas_estetika = rawFormData.aktivitas_estetika;
      rowToUpdate.uraian_estetika = rawFormData.uraian_estetika;
      rowToUpdate.updated_at = rawFormData.updated_at;
      await rowToUpdate.save();
    }
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal Up date data estetika");
  }
  revalidatePath("/dashboard/estetika");
  redirect("/dashboard/estetika");
}

// delete
export async function deleteEstetikaById(formData) {
  // throw new Error("Failed to Delete Invoice");
  const idToDel = formData.get("id_estetika");
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

    const sheet = doc.sheetsById[SHEET_ID9]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    const rowToDel = rows.find((item) => item.id_estetika === idToDel);
    // console.log(rowToDel);
    if (rowToDel) {
      await rowToDel.del();
    }
    // console.log(rowToDelAll);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal hapus data estetika");
  }
  revalidatePath("/dashboard/estetika");
}
