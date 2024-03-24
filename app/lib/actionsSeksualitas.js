"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { UpdateSeksualitas } from "../ui/seksualitas/buttons";

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID1 = process.env.NEXT_PUBLIC_SHEET_ID1;
const SHEET_ID4 = process.env.NEXT_PUBLIC_SHEET_ID_DATAKESEHATAN;
const SHEET_ID5 = process.env.NEXT_PUBLIC_SHEET_ID_DATAKEIMANAN;
const SHEET_ID6 = process.env.NEXT_PUBLIC_SHEET_ID_DATABELAJAR;
const SHEET_ID7 = process.env.NEXT_PUBLIC_SHEET_ID_DATAPERKEMBANGAN;
const SHEET_ID8 = process.env.NEXT_PUBLIC_SHEET_ID_DATASEKSUALITAS;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

export async function createSeksualitas(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idSeksualitas = Date.now(); //timestamp
  const rawFormData = {
    created_at: date,
    nama: formData.get("namaAnak"),
    jenis_seksualitas: formData.get("jenis_seksualitas"),
    aktivitas_seksualitas: formData.get("aktivitas_seksualitas"),
    id_seksualitas: idSeksualitas,
    uraian_seksualitas: formData.get("uraian_seksualitas"),
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
    const sheet = doc.sheetsById[SHEET_ID8];
    // console.log(sheet);

    await sheet.addRow(rawFormData);
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal create data seksualitas.");
  }
  revalidatePath("/dashboard/seksualitas");
  redirect("/dashboard/seksualitas");
}

// update

export async function updateSeksualitas(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idSeksualitas = formData.get("id_seksualitas");
  const rawFormData = {
    created_at: formData.get("created_at"),
    nama: formData.get("namaAnak"),
    jenis_seksualitas: formData.get("jenis_seksualitas"),
    aktivitas_seksualitas: formData.get("aktivitas_seksualitas"),
    id_seksualitas: idSeksualitas,
    uraian_seksualitas: formData.get("uraian_seksualitas"),
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
    const sheet = doc.sheetsById[SHEET_ID8];
    const rows = await sheet.getRows();
    const rowToUpdate = rows.find(
      (item) => item.id_seksualitas === idSeksualitas
    );
    if (rowToUpdate) {
      rowToUpdate.created_at = rawFormData.created_at;
      rowToUpdate.id_seksualitas = rawFormData.id_seksualitas;
      rowToUpdate.nama = rawFormData.nama;
      rowToUpdate.jenis_seksualitas = rawFormData.jenis_seksualitas;
      rowToUpdate.aktivitas_seksualitas = rawFormData.aktivitas_seksualitas;
      rowToUpdate.uraian_seksualitas = rawFormData.uraian_seksualitas;
      rowToUpdate.updated_at = rawFormData.updated_at;
      await rowToUpdate.save();
    }
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal Up date data seksualitas");
  }
  revalidatePath("/dashboard/seksualitas");
  redirect("/dashboard/seksualitas");
}

// delete
export async function deleteSeksualitasById(formData) {
  // throw new Error("Failed to Delete Invoice");
  const idToDel = formData.get("id_seksualitas");
  // console.log(`iddel=${idToDel}`);
  try {
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID8]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    const rowToDel = rows.find((item) => item.id_seksualitas === idToDel);
    // console.log(rowToDel);
    if (rowToDel) {
      await rowToDel.del();
    }
    // console.log(rowToDelAll);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal hapus data seksualitas");
  }
  revalidatePath("/dashboard/seksualitas");
}
