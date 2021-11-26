import admin from "firebase-admin";
import chalk from "chalk";
import log from "debug";

const debug = log("own:firebase");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: "own-api-2c648.appspot.com",
});

const firebase = async (req, res, next) => {
  const bucket = admin.storage().bucket();
  try {
    req.images = [];
    const getImages = req.files.map(async (image) => {
      await bucket.upload(image.path);
      await bucket.file(image.filename).makePublic();
      const fileURL = bucket.file(image.filename).publicUrl();
      return fileURL;
    });

    const images = await Promise.all(getImages);
    req.images = images;
    debug(chalk.green(`A total of ${images.length} images have been uploaded`));
    next();
  } catch (error) {
    error.code = 400;
    error.message = "There has been an error with firebase";
    next();
  }
};

export default firebase;
