const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator'); // Add email validation library
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 4000;
const { OAuth2Client } = require('google-auth-library'); // Import Google Auth Library
const client = new OAuth2Client('55269184028-f6oopb7bk04spr4p7ns05at5arfadl6t.apps.googleusercontent.com'); // Replace with your Google Client ID
const multer = require('multer'); 
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://sama:S123456@cluster0.28oglsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
          validator: emailValidator.validate,
          message: props => `${props.value} is not a valid email address!`
      }
  },
  password: {
      type: String,
      required: true
  },
  firstName: {
      type: String, // Adding firstName field
      required: true
  },
  lastName: {
      type: String, // Adding lastName field
      required: true
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
// mebership

const MembershipSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  fullAddress: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  socialMediaLink: {
    type: String,
    required: true
  },
  projectLocation: {
    type: String,
    required: true
  },
  projectSector: {
    type: String,
    required: true
  },
  projectSummary: {
    type: String,
    required: true
  },
  projectPictures: [String] 
});

const Membership = mongoose.model('Membership', MembershipSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const fullPath = path.join(__dirname, './uploads');
const upload = multer({ dest: fullPath, storage });

app.post('/membership', upload.array('projectPictures'), async (req, res) => {
  try {
    const membershipData = req.body;
    const projectPictures = req.files.map(file => file.path)// Ensure that req.files is properly defined    console.log("Request body:", req.body);
    console.log("Uploaded files:", req.files);
    console.log("Project pictures:", projectPictures);

    const newMembership = await Membership.create({ ...membershipData, projectPictures });
    res.status(201).json({ success: true, message: 'Membership application submitted successfully' });
  } catch (error) {
    console.error('Error submitting membership application:', error);
    res.status(500).json({ success: false, message: 'Failed to submit membership application' });
  }
});



app.post('/register', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Validate email format
  if (!emailValidator.validate(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email format' });
  }

  // Validate password strength
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character',
    });
  }
  // Ensure other fields are provided as well
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).jason({ success: false, message: 'Please provide all required fields' });
}
const hashedPassword = await bcrypt.hash(password, 10);
try {
  const newUser = await User.create({ email, password: hashedPassword, firstName, lastName });
  res.status(201).json({ success: true, message: 'User registered successfully' });
} catch (error) {
  res.status(500).json({ success: false, message: 'Failed to register user' });
}
});



app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ success: false, message: 'Incorrect password' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, '7bI$64T*5!sKv&9Lp@8Fq#3m^2Hd', { expiresIn: "1h" });

  // Send token to the client
  console.log('Generated token:', token);
 
  res.status(200).json({ success: true, message: 'Login successful', token });
  
});



const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token not provided' });
  }

  jwt.verify(token.split(' ')[1], '7bI$64T*5!sKv&9Lp@8Fq#3m^2Hd', (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

app.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

