import multer from "multer";
import path from "path";

const uploadImages = multer({
  storage: multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
      const oldFilename = file.originalname;
      const oldFilenameExtension = path.extname(oldFilename);

      const paperName = req.body.title ? req.body.title : "";
      const plainPaperName = paperName.replace(/ /g, "");

      const newFilename = `paper-${plainPaperName}-${Date.now()}${oldFilenameExtension}`;
      callback(null, newFilename);
    },
  }),
});

export default uploadImages;
