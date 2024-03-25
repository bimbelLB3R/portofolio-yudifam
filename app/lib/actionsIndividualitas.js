"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { UpdateIndividualitas } from "../ui/individualitas/buttons";

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID1 = process.env.NEXT_PUBLIC_SHEET_ID1;
const SHEET_ID4 = process.env.NEXT_PUBLIC_SHEET_ID_DATAKESEHATAN;
const SHEET_ID5 = process.env.NEXT_PUBLIC_SHEET_ID_DATAKEIMANAN;
const SHEET_ID6 = process.env.NEXT_PUBLIC_SHEET_ID_DATABELAJAR;
const SHEET_ID7 = process.env.NEXT_PUBLIC_SHEET_ID_DATAPERKEMBANGAN;
const SHEET_ID8 = process.env.NEXT_PUBLIC_SHEET_ID_DATASEKSUALITAS;
const SHEET_ID9 = process.env.NEXT_PUBLIC_SHEET_ID_DATAESTETIKA;
const SHEET_ID10 = process.env.NEXT_PUBLIC_SHEET_ID_DATAINDIVIDUALITAS;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

export async function createIndividualitas(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idIndividualitas = Date.now(); //timestamp
  const rawFormData = {
    created_at: date,
    nama: formData.get("namaAnak"),
    jenis_individualitas: formData.get("jenis_individualitas"),
    aktivitas_individualitas: formData.get("aktivitas_individualitas"),
    id_individualitas: idIndividualitas,
    uraian_individualitas: formData.get("uraian_individualitas"),
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
    const sheet = doc.sheetsById[SHEET_ID10];
    // console.log(sheet);

    await sheet.addRow(rawFormData);
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal create data individualitas.");
  }
  revalidatePath("/dashboard/individualitas");
  redirect("/dashboard/individualitas");
}

// update

export async function updateIndividualitas(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idIndividualitas = formData.get("id_individualitas");
  const rawFormData = {
    created_at: formData.get("created_at"),
    nama: formData.get("namaAnak"),
    jenis_individualitas: formData.get("jenis_individualitas"),
    aktivitas_individualitas: formData.get("aktivitas_individualitas"),
    id_individualitas: idIndividualitas,
    uraian_individualitas: formData.get("uraian_individualitas"),
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
    const sheet = doc.sheetsById[SHEET_ID10];
    const rows = await sheet.getRows();
    const rowToUpdate = rows.find(
      (item) => item.id_individualitas === idIndividualitas
    );
    if (rowToUpdate) {
      rowToUpdate.created_at = rawFormData.created_at;
      rowToUpdate.id_individualitas = rawFormData.id_individualitas;
      rowToUpdate.nama = rawFormData.nama;
      rowToUpdate.jenis_individualitas = rawFormData.jenis_individualitas;
      rowToUpdate.aktivitas_individualitas =
        rawFormData.aktivitas_individualitas;
      rowToUpdate.uraian_individualitas = rawFormData.uraian_individualitas;
      rowToUpdate.updated_at = rawFormData.updated_at;
      await rowToUpdate.save();
    }
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Gagal Up date data individualitas");
  }
  revalidatePath("/dashboard/individualitas");
  redirect("/dashboard/individualitas");
}

// delete
export async function deleteIndividualitasById(formData) {
  // throw new Error("Failed to Delete Invoice");
  const idToDel = formData.get("id_individualitas");
  // console.log(`iddel=${idToDel}`);
  try {
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID10]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    const rowToDel = rows.find((item) => item.id_individualitas === idToDel);
    // console.log(rowToDel);
    if (rowToDel) {
      await rowToDel.del();
    }
    // console.log(rowToDelAll);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal hapus data individualitas");
  }
  revalidatePath("/dashboard/individualitas");
}
