import formidable from "formidable";
import fs from "fs";
import path from "path";
import { db } from "@/lib/db";

export const config = {
  api: {
    bodyParser: false, // required for file upload
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const uploadDir = path.join(process.cwd(), "public/schoolImages");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    multiples: false, // only one file per field
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Upload Error:", err);
      return res.status(500).json({ message: "File upload failed" });
    }

    try {
      const { name, address, city, state, contact, email_id } = fields;

      let image = "";
      if (files.image) {
        // For formidable v2+, the file object is directly files.image
        const file = Array.isArray(files.image) ? files.image[0] : files.image;

        const oldPath = file.filepath; // correct property in v2+
        const newFilename = `${Date.now()}_${file.originalFilename}`;
        const newPath = path.join(uploadDir, newFilename);

        fs.renameSync(oldPath, newPath);
        image = `/schoolImages/${newFilename}`;
      }

      await db.query(
        "INSERT INTO school (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, email_id, image]
      );

      return res.status(200).json({ message: "School added successfully!" });
    } catch (error) {
      console.error("DB Error:", error);
      return res.status(500).json({ message: "Database error" });
    }
  });
}
