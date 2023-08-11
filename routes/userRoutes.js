const express = require('express');
const UserController = require('../controllers/UserController');
const multer = require('multer'); // Import Multer
const router = express.Router();

// Define your Multer storage and configurations
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the destination directory for uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Set the filename for uploaded files
  },
});

const upload = multer({ storage }); // Initialize Multer

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// Use the 'upload' middleware for handling file uploads
router.put('/:id/documents', upload.fields([
  { name: 'aadhar_front', maxCount: 1 },
  { name: 'aadhar_back', maxCount: 1 },
  { name: 'pan_card', maxCount: 1 },
]), UserController.updateUserDocuments); // Make sure UserController.updateUserDocuments is properly defined

module.exports = router;
