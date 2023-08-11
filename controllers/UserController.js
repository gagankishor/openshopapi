const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const SECRET_KEY = 'ewfsfsadfdfdffadsfdsffdsfdf'; 
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
// const User = require('../models/User');

cloudinary.config({ 
  cloud_name: 'ds0d5t7iy', 
  api_key: '799238868729833', 
  api_secret: 'EOpVU2T645loiVXwTj96O1E9J6Y' 
});

const storage = multer.memoryStorage(); // Use memory storage to handle file uploads
const upload = multer({ storage });
module.exports = {
 async updateUserDocuments(req, res) {
  const userId = req.params.id; // Assuming the user ID is passed as a parameter in the request
  const { aadhar_front, aadhar_back, pan_card } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Upload aadhar_front image to Cloudinary and update the URL
    if (aadhar_front) {
      const aadharFrontResult = await cloudinary.uploader.upload(aadhar_front, { folder: 'user_documents' });
      user.aadhar_front = aadharFrontResult.secure_url;
    }
    
    // Upload aadhar_back image to Cloudinary and update the URL
    if (aadhar_back) {
      const aadharBackResult = await cloudinary.uploader.upload(aadhar_back, { folder: 'user_documents' });
      user.aadhar_back = aadharBackResult.secure_url;
    }

    // Upload pan_card image to Cloudinary and update the URL
    if (pan_card) {
      const panCardResult = await cloudinary.uploader.upload(pan_card, { folder: 'user_documents' });
      user.pan_card = panCardResult.secure_url;
    }

    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error updating user documents:', error);
    res.status(500).json({ error: 'Error updating user documents' });
  }
},




  async registerUser(req, res) {
    try {
      const { name, email, phone_no, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, phone_no, password: hashedPassword });

      res.status(201).json(user);
    } catch (error) {
      console.log(error)

      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1d' });
      res.json({ token });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};
