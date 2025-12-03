import upload from "./uploadUtil.js";
import sharp from "sharp";
import fs from "fs";
import path from "path";

export async function processImage(type, tempPath, finalName) {
    const finalDir = path.resolve(process.cwd(), `storage/image/${type}`);

    // Ensure destination folder exists
    if (!fs.existsSync(finalDir)) {
        fs.mkdirSync(finalDir, { recursive: true });
    }

    const finalPath = path.join(finalDir, finalName);

    // Resize + crop + convert to JPEG
    await sharp(tempPath)
        .resize(500, 500, {
            fit: "cover",
            position: "centre"
        })
        .jpeg({ quality: 85 })
        .toFile(finalPath);

    // Remove original temp file
    fs.unlinkSync(tempPath);

    // Return the web path stored in DB
    return `/storage/image/${type}/${finalName}`;
}

export function uploadHandler(req, res, next) {
    upload.single("img")(req, res, function (err) {
        if (err) {
            return res.status(400).json({error: err.message});
        }
        next();
    });
}