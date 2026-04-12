// const ImageKit = require("imagekit");
// const multer = require("multer");

// const imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
// });

// // Memory storage — buffer milega directly
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB per image
//   fileFilter: (req, file, cb) => {
//     const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
//     if (allowed.includes(file.mimetype)) cb(null, true);
//     else cb(new Error("Only jpg, png, webp images allowed"), false);
//   },
// });

// module.exports = { imagekit, upload };


const ImageKit = require("imagekit");
const multer = require("multer");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 5MB → 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only jpg, png, webp images allowed"), false);
  },
});

module.exports = { imagekit, upload };