"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { UpdatePerkembangan } from "../ui/perkembangan/buttons";
import { AmbilSesi } from "./data";
const SHEET_ID7 = process.env.NEXT_PUBLIC_SHEET_ID_DATAPERKEMBANGAN;



export async function createPerkembangan(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idPerkembangan = Date.now(); //timestamp
  const rawFormData = {
    created_at: date,
    nama: formData.get("namaAnak"),
    jenis_perkembangan: formData.get("jenis_perkembangan"),
    aktivitas_perkembangan: formData.get("aktivitas_perkembangan"),
    id_perkembangan: idPerkembangan,
    uraian_perkembangan: formData.get("uraian_perkembangan"),
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
    const sheet = doc.sheetsById[SHEET_ID7];
    // console.log(sheet);

    await sheet.addRow(rawFormData);
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal create data perkembangan.");
  }
  revalidatePath("/dashboard/perkembangan");
  redirect("/dashboard/perkembangan");
}

// update

export async function updatePerkembangan(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idPerkembangan = formData.get("id_perkembangan");
  const rawFormData = {
    created_at: formData.get("created_at"),
    nama: formData.get("namaAnak"),
    jenis_perkembangan: formData.get("jenis_perkembangan"),
    aktivitas_perkembangan: formData.get("aktivitas_perkembangan"),
    id_perkembangan: idPerkembangan,
    uraian_perkembangan: formData.get("uraian_perkembangan"),
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
    const sheet = doc.sheetsById[SHEET_ID7];
    const rows = await sheet.getRows();
    const rowToUpdate = rows.find(
      (item) => item.id_perkembangan === idPerkembangan
    );
    if (rowToUpdate) {
      rowToUpdate.created_at = rawFormData.created_at;
      rowToUpdate.id_perkembangan = rawFormData.id_perkembangan;
      rowToUpdate.nama = rawFormData.nama;
      rowToUpdate.jenis_perkembangan = rawFormData.jenis_perkembangan;
      rowToUpdate.aktivitas_perkembangan = rawFormData.aktivitas_perkembangan;
      rowToUpdate.uraian_perkembangan = rawFormData.uraian_perkembangan;
      rowToUpdate.updated_at = rawFormData.updated_at;
      await rowToUpdate.save();
    }
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal Up date data perkembangan");
  }
  revalidatePath("/dashboard/perkembangan");
  redirect("/dashboard/perkembangan");
}

// delete
export async function deletePerkembanganById(formData) {
  // throw new Error("Failed to Delete Invoice");
  const idToDel = formData.get("id_perkembangan");
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

    const sheet = doc.sheetsById[SHEET_ID7]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    const rowToDel = rows.find((item) => item.id_perkembangan === idToDel);
    // console.log(rowToDel);
    if (rowToDel) {
      await rowToDel.del();
    }
    // console.log(rowToDelAll);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal hapus data perkembangan");
  }
  revalidatePath("/dashboard/perkembangan");
}
