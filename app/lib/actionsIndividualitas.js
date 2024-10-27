"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { UpdateIndividualitas } from "../ui/individualitas/buttons";
import { AmbilSesi } from "./data";
import { AmbilTargetAnak } from "./data";

const SHEET_ID10 = process.env.NEXT_PUBLIC_SHEET_ID_DATAINDIVIDUALITAS;


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
    const sheet = doc.sheetsById[SHEET_ID10];
    // console.log(sheet);

    await sheet.addRow(rawFormData);
    }
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
  const idToDel = formData.get("id_individualitas"); //nama
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

    const sheet = doc.sheetsById[SHEET_ID10]; // Misalnya, mengambil lembar kerja pertama
    const rows = await sheet.getRows(); // Mendapatkan semua baris dari lembar kerja
    const rowToDel = rows.find((item) => item.id_individualitas === id);
    // console.log(rowToDel);
    if (rowToDel) {
      await rowToDel.del();
    }
  }
    // console.log(rowToDelAll);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Gagal hapus data individualitas");
  }
  revalidatePath("/dashboard/individualitas");
}
