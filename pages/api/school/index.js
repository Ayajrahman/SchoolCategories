import { db } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [rows] = await db.query("SELECT * FROM school");
      res.status(200).json(rows);
    } catch (error) {
      console.error("DB Error:", error);
      res.status(500).json({ message: "Database error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
