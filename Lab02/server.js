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

// Route to trigger 1xx status code (Informational)
app.get("/informational", (req, res) => {
  res.status(100).send("Informational response");
});

// Route to trigger 2xx status code (Success)
app.get("/success", (req, res) => {
  res.status(200).send("Success");
});

// Route to trigger 3xx status code (Redirection)
app.get("/redirection", (req, res) => {
  res.status(301).redirect("/"); // Redirect to the home page
});

// Route to trigger 4xx status code (Client error)
app.get("/client-error", (req, res) => {
  res.status(400).send("Client error");
});

// Route to trigger 5xx status code (Server error)
app.get("/server-error", (req, res) => {
  res.status(500).send("Server error");
});

// Middleware to handle different status codes
app.use((req, res, next) => {
  const status = res.statusCode;

  if (status >= 100 && status < 200) {
    res.status(status).send("Informational response");
  } else if (status >= 200 && status < 300) {
    res.status(status).send("Success");
  } else if (status >= 300 && status < 400) {
    res.status(status).send("Redirection");
  } else if (status >= 400 && status < 500) {
    res.status(status).send("Client error");
  } else if (status >= 500 && status < 600) {
    res.status(status).send("Server error");
  } else {
    next();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
