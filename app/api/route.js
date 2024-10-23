import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  // Ambil sesi pengguna
  const session = await getSession({ req });

  // Jika sesi tidak ada (belum login)
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Data pengguna yang tersedia
  let users = [
    {
      email: "ikhwchemist@gmail.com",
      name: "Wahyudi",
      photos: [
        "/fotoAnak/aqila.png",
        "/fotoAnak/hasna.png",
        "/fotoAnak/uwais.png"
      ],
      spreadsheetId: "1vGyLe-AhSGpCevhk4z6Lil9VowS1p5HOlkwRj6okZg4",
      sheetIds: {
        "bakat": "0",
        "observer": "1540847039",
        "dataAnak": "565740682",
        "kesehatan": "1690017626",
        "keimanan": "1698154724",
        "belajar": "2036469445",
        "kategoriBelajar": "2009220742",
        "perkembangan": "1970363559",
        "seksualitas": "803251940",
        "estetika": "1465526114",
        "individualitas": "2115790102",
        "alquran": "299871706"
      }
    },
    {
      email: "ayoberkarya@gmail.com",
      name: "Dwi Seftina",
      photos: [
        "/fotoAnak/aqila.png",
        "/fotoAnak/hasna.png",
        "/fotoAnak/uwais.png"
      ],
      spreadsheetId: "1v40RH01aDnYcU5uE4F3_ysyIyZTEcnHE2oxW8brhjro",
      sheetIds: {
        "bakat": "0",
        "observer": "1540847039",
        "dataAnak": "565740682",
        "kesehatan": "1690017626",
        "keimanan": "1698154724",
        "belajar": "2036469445",
        "kategoriBelajar": "2009220742",
        "perkembangan": "1970363559",
        "seksualitas": "803251940",
        "estetika": "1465526114",
        "individualitas": "2115790102",
        "alquran": "299871706"
      }
    }
  ];

  // Filter pengguna berdasarkan email dari sesi
  const user = users.find(user => user.email === session.user.email);

  // Jika pengguna tidak ditemukan
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Kembalikan data pengguna yang ditemukan
  return res.status(200).json(user);
}
