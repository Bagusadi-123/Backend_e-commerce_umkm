import multer from "multer";
import path from "path";

const tempDir = path.resolve(process.cwd(), "storage/temp");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir);
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const name = (req.body.store? req.body.store : req.body.name).replaceAll(" ", "-");
        cb(null, `${name}_${timestamp}${ext}`);
    }
});

function fileFilter(req, file, cb) {
    const allowedMime = ["image/jpeg"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedMime.includes(file.mimetype) && (ext === ".jpg" || ext === ".jpeg")) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG/JPEG images are allowed"), false);
    }
}

export default multer({storage, fileFilter});
