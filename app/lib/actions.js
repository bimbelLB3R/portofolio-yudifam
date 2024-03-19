"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GoogleSpreadsheet } from "google-spreadsheet";

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID1 = process.env.NEXT_PUBLIC_SHEET_ID1;
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

export async function createInvoice(formData) {
  const date = new Date().toISOString().split("T")[0];
  const idBakat = Date.now(); //timestamp
  const rawFormData = {
    tanggal: date,
    nama: formData.get("namaAnak"),
    aktivitas: formData.get("aktivitas"),
    cerita: formData.get("cerita"),
    bakat: formData.get("bakat"),
    idBakat: idBakat,
    status: formData.get("status"),
  };
  // Test it out:
  //   console.log(rawFormData);
  // kirim data
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    // loads document properties and worksheets
    await doc.loadInfo();
    // console.log(SHEET_ID3);
    const sheet = doc.sheetsById[SHEET_ID1];
    // console.log(sheet);

    await sheet.addRow(rawFormData);
  } catch (error) {
    console.error("Append Error:", error);
    throw new Error("Failed to append data from tambah bakat.");
  }
  revalidatePath("/dashboard/bakat");
  redirect("/dashboard/bakat");
}
