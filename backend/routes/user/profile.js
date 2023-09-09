const express = require("express");
const router = express.Router();

const Profile = require("../../models/profile");
const verifyToken = require("../middleware/verifyToken");
const Multer = require("multer");
const FirebaseStorage = require("multer-firebase-storage");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'files/'); // Specify the folder where files will be stored
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
//     cb(null, uniqueName); // Generate a unique filename
//   }
// });

// // Create a multer instance with the configuration
// const upload = multer({ storage: storage });
const multer = Multer({
  storage: FirebaseStorage({
    bucketName: process.env.BUCKET_NAME,
    credentials: {
      clientEmail:process.env.CLIENT_EMAIL ,
      privateKey:process.env.PRIVATE_KEY,
      projectId:process.env.PROJECT_ID ,
    },
    unique: true,
    public: true,
  }),
});

//post profile
router.post("/profile", verifyToken, async (req, res) => {
  const {
    user,
    name,
    education,
    skills,
    experience,
    linkedinURL,
    contact,
    attachments,
  } = req.body;

  //validate
  if (
    !name ||
    !name.first ||
    !name.last ||
    !education ||
    !education.university ||
    !education.degree ||
    !education.field ||
    !education.yearOfGraduation ||
    !skills ||
    !experience ||
    !linkedinURL ||
    !contact ||
    attachments.length === 0
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "Please enter all fields" });
  }

  const data = {
    user: {
      id: user.id,
      username: user.username,
    },
    name: {
      first: name.first,
      last: name.last,
    },
    education: {
      university: education.university,
      degree: education.degree,
      field: education.field,
      yearOfGraduation: education.yearOfGraduation,
    },
    skills,
    experience,
    linkedinURL: linkedinURL,
    contact: contact,
    attachments: attachments,
  };

  // Check if profile for this user already exists
  try {
    const profile = await Profile.findOne({ "user.id": user.id });

    if (profile) {
      return res.status(400).json({
        status: "error",
        message: "Profile for this user already exists",
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }

  // Create profile
  try {
    const profile = await Profile.create(data);
    return res.status(201).json({ status: "success", data: profile });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
});

// get profile after login
router.get("/profile", verifyToken, async (req, res) => {
  const { user } = req.body;

  try {
    const profile = await Profile.findOne({ "user.id": user.id });
    return res.status(200).json({ status: "success", data: profile });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error });
  }
});

router.post(
  "/upload-file",
  verifyToken,
  multer.single("file"),
  async (req, res) => {
    const fileName = req.file.publicUrl;
    res.status(200).json({ fileName });
  }
);

router.get("/:filename", async (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "../..", "files", fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error reading file" });
    }
  });
  // res.download(filePath, (err) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).json({ error: "Error sending file" });
  //   }
  // });
});

module.exports = router;
