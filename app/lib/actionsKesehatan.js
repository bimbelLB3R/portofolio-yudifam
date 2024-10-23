"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { UpdateBakat } from "../ui/bakat/buttons";
import { AmbilSesi } from "./data";
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
    const sheet = doc.sheetsById[SHEET_ID4];
    // console.log(sheet);

    await sheet.addRow(rawFormData);
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
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal Up date data kesehatan");
  }
  revalidatePath("/dashboard/kesehatan");
  redirect("/dashboard/kesehatan");
}

// delete
export async function deleteKesehatanById(formData) {
  // throw new Error("Failed to Delete Invoice");
  const idToDel = formData.get("id_penyakit");
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

    const sheet = doc.sheetsById[SHEET_ID4]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    const rowToDel = rows.find((item) => item.id_penyakit === idToDel);
    // console.log(rowToDel);
    if (rowToDel) {
      await rowToDel.del();
    }
    // console.log(rowToDelAll);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal hapus data kesehatan");
  }
  revalidatePath("/dashboard/kesehatan");
}
