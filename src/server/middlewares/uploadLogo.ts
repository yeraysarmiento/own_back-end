import multer from "multer";
import path from "path";

const uploadLogo = multer({
  storage: multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
      const oldFilename = file.originalname;
      const oldFilenameExtension = path.extname(oldFilename);

      const boardName = req.body.name ? req.body.name : "";

      const newFilename = `logo-${boardName}-${Date.now()}${oldFilenameExtension}`;
      callback(null, newFilename);
    },
  }),
});

export default uploadLogo;
