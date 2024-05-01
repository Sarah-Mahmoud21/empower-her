const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator"); // Add email validation library
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 4000;
const { OAuth2Client } = require("google-auth-library"); // Import Google Auth Library
const client = new OAuth2Client(
  "55269184028-f6oopb7bk04spr4p7ns05at5arfadl6t.apps.googleusercontent.com"
); // Replace with your Google Client ID
const multer = require("multer");
const path = require("path");
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connect(
  "mongodb+srv://sama:S123456@cluster0.28oglsd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: emailValidator.validate,
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String, // Adding firstName field
    required: true,
  },
  lastName: {
    type: String, // Adding lastName field
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
// mebership

const MembershipSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  mobileNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  socialMediaLink: {
    type: String,
    required: true,
  },
  projectLocation: {
    type: String,
    required: true,
  },
  projectSector: {
    type: String,
    required: true,
  },
  projectSummary: {
    type: String,
    required: true,
  },
  projectPictures: [String],
});

const Membership = mongoose.model("Membership", MembershipSchema);

const OpportunitiesSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  mobileNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  cv: [String],
});
const Opportunities = mongoose.model("opportunities", OpportunitiesSchema);

const ManagerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  // Add any other fields specific to managers here
});

// Create Managers Model
const Manager = mongoose.model("Manager", ManagerSchema);

module.exports = Manager;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/membership", upload.array("projectPictures"), async (req, res) => {
  try {
    const membershipData = req.body;
    const projectPictures = req.files.map((file) => file.path);
    const newMembership = await Membership.create({
      ...membershipData,
      projectPictures,
    });
    res
      .status(201)
      .json({
        success: true,
        message: "Membership application submitted successfully",
      });
  } catch (error) {
    console.error("Error submitting membership application:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to submit membership application",
      });
  }
});

app.get("/membership", async (req, res) => {
  try {
    const members = await Membership.find();

    if (!members) {
      return res
        .status(404)
        .json({ success: false, message: "No members found" });
    }
    const membersWithPictures = members.map((member) => {
      const { projectPictures, ...rest } = member.toObject();
      const pictureUrls = projectPictures.map(
        (picture) =>
          `${req.protocol}://${req.get("host")}/uploads/${path.basename(
            picture
          )}`
      );
      return { ...rest, projectPictures: pictureUrls };
    });

    return res
      .status(200)
      .json({ success: true, members: membersWithPictures });
  } catch (error) {
    console.error("Error fetching member profiles:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});
app.delete("/membership/:id", async (req, res) => {
  const memberId = req.params.id;
  try {
    const deletedMember = await Membership.findByIdAndDelete(memberId);
    if (!deletedMember) {
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Membership application rejected" });
  } catch (error) {
    console.error("Error rejecting membership application:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to reject membership application" });
  }
});


app.post("/opportunities", upload.array("cv"), async (req, res) => {
  try {
    const oppData = req.body;
    const cv = req.files.map((file) => file.path);
    const newOpp = await Opportunities.create({ ...oppData, cv });
    res
      .status(201)
      .json({
        success: true,
        message: "opp application submitted successfully",
      });
  } catch (error) {
    console.error("Error submitting opp application:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to submit opp application" });
  }
});

app.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Validate email format
  if (!emailValidator.validate(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }

  // Validate password strength
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    });
  }
  // Ensure other fields are provided as well
  if (!email || !password || !firstName || !lastName) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    if (email === "saramahmoud@gmail.com") {
      // Create a manager document
      await Manager.create({ userId: newUser._id });
    }
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to register user" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect password" });
  }
  const token = jwt.sign({ userId: user._id }, "7bI$64T*5!sKv&9Lp@8Fq#3m^2Hd", {
    expiresIn: "1h",
  });

  // Send token to the client
  console.log("Generated token:", token);
  const manager = await Manager.findOne({ userId: user._id });
  if (manager) {
    console.log("Manager found:", manager);
    return res
      .status(200)
      .json({
        success: true,
        message: "Login successful (Manager)",
        token,
        isManager: true,
      });
  }

  return res
    .status(200)
    .json({
      success: true,
      message: "Login successful",
      token,
      isManager: false,
    });
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token not provided" });
  }

  jwt.verify(
    token.split(" ")[1],
    "7bI$64T*5!sKv&9Lp@8Fq#3m^2Hd",
    (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      }
      req.user = decoded;
      next();
    }
  );
};

app.get("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
