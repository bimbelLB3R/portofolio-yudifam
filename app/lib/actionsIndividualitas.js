"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { accessSpreadsheet } from "./data";
import { CurrentUserData } from "./data";

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
    const doc=await accessSpreadsheet();
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    // loads document properties and worksheets
    await doc.loadInfo();
    const { SHEET_ID11 } = await CurrentUserData();
    // console.log(SHEET_ID3);
    const sheet = doc.sheetsById[SHEET_ID11];
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
    const doc=await accessSpreadsheet();
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    // loads document properties and worksheets
    await doc.loadInfo();
    const { SHEET_ID11 } = await CurrentUserData();
    // console.log(SHEET_ID3);
    const sheet = doc.sheetsById[SHEET_ID11];
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
    const doc=await accessSpreadsheet();
    // Autentikasi dengan kredensial
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });

    // Load informasi lembar kerja
    await doc.loadInfo();
    const { SHEET_ID11 } = await CurrentUserData();

    const sheet = doc.sheetsById[SHEET_ID11]; // Misalnya, mengambil lembar kerja pertama
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
