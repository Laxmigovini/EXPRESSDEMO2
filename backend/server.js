const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model("User", userSchema);

// Routes
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({ name, email });
  await newUser.save();
  res.status(201).json(newUser);
});

// ...existing code...

// Update user
app.put("/users/:id", async (req, res) => {
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email },
    { new: true }
  );
  res.json(user);
});

// Delete user
app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// ...existing code...
// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
