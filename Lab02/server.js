const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;

// Array to store user information
const users = [
  { email: "user1@example.com", password: "password1" },
  { email: "user2@example.com", password: "password2" },
];

const usersData = [
  {
    email: "user1@example.com",
    fullName: "John Doe",
    score: 80,
  },
  {
    email: "user2@example.com",
    fullName: "Jane Doe",
    score: 90,
  },
];

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to enable CORS
app.use(cors());

// Serve the login form HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// Route to handle login requests
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    const userData = usersData.find((u) => u.email === user.email);
    res.status(200).json({
      message: "Login successful",
      user: {
        email: userData.email,
        fullName: userData.fullName,
        score: userData.score,
      },
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
