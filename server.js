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
  profilePicture:String // Add profilePicture field
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
  email: {
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
  email: {
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
const InternshipSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
  },
  employeeId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'members', // Reference to the Manager model
  },
  
});

const Internship = mongoose.model("Internship", InternshipSchema);

const MemberSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
  },
  projectSummary: {
    type: String,
    required: true,
  },
});

const Member = mongoose.model("Member", MemberSchema);

const TaskSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member", // Reference to the Member model
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  progress: {
    type: String,
    required: false,
    default: '0%', 
  },
  status:{
    type :String,
    required:false,
    default: 'in progress'
  }
});

const Task = mongoose.model("Task", TaskSchema);
const ProductSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "members",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required:true,
  },
  quantity:{
    type: Number,
    required:true,
  },
  images: [String],
});

const Product = mongoose.model("Product", ProductSchema);

const CustomersSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true 
  },
  quantity: { 
    type: Number,
    required: true 
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, 
  },
});

const Customers = mongoose.model("Customers", CustomersSchema);

const SalesSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true 
  },
  quantity: { 
    type: Number,
    required: true 
  }
});
const Sales = mongoose.model("Sales", SalesSchema);






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
// Add this code to your Express backend, typically in your server.js or index.js file

// Fetch volunteer/internship opportunities
app.get("/opportunities", async (req, res) => {
  try {
    // Fetch all opportunities from the database
    const opportunities = await Opportunities.find();

    // Check if opportunities exist
    if (!opportunities) {
      return res.status(404).json({ success: false, message: "No opportunities found" });
    }

    // If opportunities exist, send them to the client
    return res.status(200).json({ success: true, opportunities });
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/opportunities/:id", async (req, res) => {
  const internId = req.params.id;
  try {
    const deletedIntern = await Opportunities.findByIdAndDelete(internId);
    if (!deletedIntern) {
      return res
        .status(404)
        .json({ success: false, message: "intern not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "internship application rejected" });
  } catch (error) {
    console.error("Error rejecting internship application:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to reject internship application" });
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
    expiresIn: "24h",
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
// Add this code after the "/profile" endpoint

app.post("/upload-photo", verifyToken, upload.single("photo"), async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update the user's profile picture with the path of the uploaded photo
    user.profilePicture = req.file.path;
    await user.save();

    return res.status(200).json({ success: true, message: "Photo uploaded successfully" });
  } catch (error) {
    console.error("Error uploading photo:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});
// Add this code after the "/upload-photo" endpoint

app.post("/change-password", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the current password matches the user's stored password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect current password" });
    }

    // Validate the new password
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Send success response
    return res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/internships/:id", async (req, res) => {
  const opportunityId = req.params.id;
  try {
    const opportunity = await Opportunities.findById(opportunityId);
    if (!opportunity) {
      return res
        .status(404)
        .json({ success: false, message: "Opportunity not found" });
    }
    // Move the opportunity to the Internship table
    const newInternship = await Internship.create({
      fullName: opportunity.fullName,
      address: opportunity.address,
      mobileNumber: opportunity.mobileNumber,
      email: opportunity.email,
    });
    // Delete the opportunity from the Opportunities table
    await Opportunities.findByIdAndDelete(opportunityId);
    res
      .status(201)
      .json({
        success: true,
        message: "Internship opportunity approved successfully",
        internship: newInternship,
      });
  } catch (error) {
    console.error("Error approving internship opportunity:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to approve internship opportunity" });
  }
});

app.post("/members/:id", async (req, res) => {
  const memberId = req.params.id;
  try {
    const member = await Membership.findById(memberId);
    if (!member) {
      return res
        .status(404)
        .json({ success: false, message: "Membership not found" });
    }
    // Move the member to the Members table
    await Member.create({
      fullName: member.fullName,
      address: member.address,
      mobileNumber: member.mobileNumber,
      email: member.email,
      projectSummary: member.projectSummary,
    });
    // Delete the member from the Membership table
    await Membership.findByIdAndDelete(memberId);
    res
      .status(201)
      .json({
        success: true,
        message: "Membership application approved successfully",
      });
  } catch (error) {
    console.error("Error approving membership application:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to approve membership application" });
  }
});
app.get("/Member", async (req, res) => {
  try {
    const members = await Member.find();
    if (!members) {
      return res.status(404).json({ success: false, message: "No members found" });
    }
    return res.status(200).json({ success: true, members });
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/Internship", async (req, res) => {
  try {
    const interns = await Internship.find();
    if (!interns) {
      return res.status(404).json({ success: false, message: "No interns found" });
    }
    return res.status(200).json({ success: true, interns });
  } catch (error) {
    console.error("Error fetching interns:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// In your Express backend
app.post("/tasks", async (req, res) => {
  try {
    const { memberId, description, deadline } = req.body;
    const newTask = await Task.create({
      memberId,
      description,
      deadline,
      progress: '0%', // Set default progress
    });
    res.status(201).json({ success: true, task: newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ success: false, message: "Failed to create task" });
  }
});
app.get("/tasks/:id", async (req, res) => {
  try {
    const memberId = req.params.id;
    // Find all tasks associated with the given member ID
    const tasks = await Task.find({ memberId });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ success: false, message: "No tasks found for this member" });
    }

    // Return the tasks associated with the member ID
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.get('/members/:email', async (req, res) => {
  try {
    const { email } = req.params; // Extract email from request parameters

    const member = await Member.findOne({ email });

    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json({ memberId: member._id });
  } catch (error) {
    console.error('Error fetching member ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Endpoint to update task progress
app.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { progress } = req.body;

    // Update task progress
    const updatedTask = await Task.findByIdAndUpdate(taskId, { progress }, { new: true });

    // Update status field based on progress and deadline
    let status;
    if (progress === '100%') {
      status = 'completed';
    } else if (new Date(updatedTask.deadline) < new Date() && progress !== '100%') {
      status = 'unaccomplished';
    } else {
      status = 'in progresss'; // Optional: You can set a default status if needed
    }

    // Update status field in the database
    await Task.findByIdAndUpdate(taskId, { status });

    res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    console.error("Error updating task progress:", error);
    res.status(500).json({ success: false, message: "Failed to update task progress" });
  }
});

// Endpoint to delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Failed to delete task" });
  }
});

app.put("/Internship/:internshipId", async (req, res) => {
  try {
    const { internshipId } = req.params;
    const { employeeId } = req.body;
    console.log(employeeId);

    // Update the Internship document with the provided employeeId
    const updatedInternship = await Internship.findByIdAndUpdate(
      internshipId,
      { $set: { employeeId } }, // Use $set to update the specific field
      { new: true }
    );

    // Return the updated Internship document
    res.status(200).json({ success: true, internship: updatedInternship });
  } catch (error) {
    console.error("Error assigning employee to internship:", error);
    res.status(500).json({ success: false, message: "Failed to assign employee to internship" });
  }
});

app.delete("/Internship/:id", async (req, res) => {
  try {
    const internId = req.params.id;
    const deletedIntern = await Internship.findByIdAndDelete(internId);
    if (!deletedIntern) {
      return res.status(404).json({ success: false, message: "intern not found" });
    }
    res.status(200).json({ success: true, message: "intern deleted successfully" });
  } catch (error) {
    console.error("Error deleting intern:", error);
    res.status(500).json({ success: false, message: "Failed to delete intern" });
  }
});
// Products Endpoints

// Create a new product
app.post("/products", upload.array("images"), async (req, res) => {
  try {
    const productData = req.body;
    const images = req.files.map((file) => file.path);
    const newProduct = await Product.create({ ...productData, images });
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add product",
    });
  }
});


// // Update a product by ID
app.put("/products/:id", upload.array("images"), async (req, res) => {
  try {
    const productData = req.body;
    let update = { ...productData };

    if (req.files && req.files.length > 0) {
      const pictures = req.files.map((file) => file.path);
      update.images = pictures;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, update, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
});

// // Delete a product by ID
// app.delete("/products/:id", async (req, res) => {
//   try {
//     const deletedProduct = await Product.findByIdAndDelete(req.params.id);
//     if (!deletedProduct) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }
//     res.status(200).json({ success: true, message: "Product deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete product",
//     });
//   }
// });

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }
    const productsWithPictures = products.map((product) => {
      const { images, ...rest } = product.toObject();
      const pictureUrls = images.map(
        (picture) =>
          `${req.protocol}://${req.get("host")}/uploads/${path.basename(
            picture
          )}`
      );
      return { ...rest, images: pictureUrls };
    });

    return res
      .status(200)
      .json({ success: true, products: productsWithPictures });
  } catch (error) {
    console.error("Error fetching products :", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/products/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const filteredProducts = await Product.find({ category: title });

    if (filteredProducts.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }

    const productsWithPictures = filteredProducts.map((product) => {
      const { images, ...rest } = product.toObject();
      const pictureUrls = images.map(
        (picture) =>
          `${req.protocol}://${req.get("host")}/uploads/${path.basename(
            picture
          )}`
      );
      return { ...rest, images: pictureUrls };
    });

    return res
      .status(200)
      .json({ success: true, products: productsWithPictures });
  } catch (error) {
    console.error("Error fetching products :", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "No product found" });
    }

    const { images, ...rest } = product.toObject();
    const pictureUrls = images.map(
      (picture) =>
        `${req.protocol}://${req.get("host")}/uploads/${path.basename(
          picture
        )}`
    );

    return res
      .status(200)
      .json({ success: true, product: { ...rest, images: pictureUrls } });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});
app.post('/Customers', async (req, res) => {
  console.log('Received data:', req.body);  // Add this line for debugging

  const { cartItems, country, city, street, mobileNumber, totalAmount } = req.body;

  try {
    if (!country || !city || !street || !mobileNumber || !cartItems || !Array.isArray(cartItems)) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    for (const item of cartItems) {
      const customerEntry = new Customers({
        productId: item._id,
        quantity: item.quantity,
        country: country,
        city: city,
        street: street,
        mobileNumber: mobileNumber,
        totalAmount: totalAmount,
        date: new Date()
      });
      await customerEntry.save();
    }
    res.json({ success: true, message: 'Customer details saved successfully' });
  } catch (error) {
    console.error('Error saving customer data:', error);
    res.status(500).json({ success: false, message: 'Failed to process customer details' });
  }
});

app.post('/sales', async (req, res) => {
  console.log("hi sales");  // Add this line for debugging

  const { productId, quantity } = req.body;

  try {
    let sale = await Sales.findOne({ productId });

    if (sale) {
      // Update existing sale
      sale.quantity += quantity;
      await sale.save();
    } else {
      // Create new sale entry
      sale = new Sales({
        productId: productId,
        quantity: quantity
      });
      await sale.save();
    }

    res.json({ success: true, message: 'Sales data saved successfully' });
  } catch (error) {
    console.error('Error saving sales data:', error);
    res.status(500).json({ success: false, message: 'Failed to process sales data' });
  }
});