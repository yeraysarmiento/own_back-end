import multer from "multer";
import path from "path";

const uploadImages = multer({
  storage: multer.diskStorage({
    destination: "images",

    filename: (req, file, callback) => {
      const oldFilename = file.originalname;
      const oldFilenameExtension = path.extname(oldFilename);

      const imageName = req.body.title ? req.body.title : req.body.name;
      const plainImageName = imageName.replace(/ /g, "");

      const headerName = req.body.title ? "paper" : "logo";

      const newFilename = `${headerName}-${plainImageName}-${Date.now()}${oldFilenameExtension}`;
      callback(null, newFilename);
    },
  }),
  limits: { fileSize: 3e6 },
});

export default uploadImages;
