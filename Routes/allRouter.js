require('dotenv').config()
const express = require('express')
const router = express()
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const { makeUser, GetUser, AdminLogin, Makeadmin } = require('../Controllers/allcontroller')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "user-uploads",
        format: async (req, file) => {
            const supportedFormats = ["jpeg", "png", "jpg"];
            const fileFormat = file.mimetype.split("/")[1];

            return supportedFormats.includes(fileFormat) ? fileFormat : "jpeg";
        },
        public_id: (req, file) => Date.now() + "-" + file.originalname.replace(/\s+/g, "_"),
    },
});

const upload = multer({ storage })


router.post('/userForm', upload.array("images", 10), makeUser)
router.post('/adminCreate', Makeadmin)
router.post('/adminLog', AdminLogin)
router.get('/getUsers', GetUser)

module.exports = router