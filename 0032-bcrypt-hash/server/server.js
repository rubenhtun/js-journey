import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
const port = 4000;

// Ensure CORS is enabled
app.use(cors());

// Use body-parser middleware to handle JSON requests
app.use(bodyParser.json());

// For registration
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Password must be above 8 characters
  const checkPsw = password.length >= 8;

  if (!checkPsw) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters long." });
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const newUser = { username, email, hashPassword };

  const doFileExist = fs.existsSync("user-list.json");

  if (!doFileExist) {
    fs.writeFileSync("user-list.json", JSON.stringify([newUser]));
  } else {
    // Read inner file content
    const existingUsers = JSON.parse(
      fs.readFileSync("user-list.json", "utf-8")
    );
    existingUsers.push(newUser);
    fs.writeFileSync("user-list.json", JSON.stringify(existingUsers));
  }
  res.status(200).json({ message: "Your registration successful!" });
});

// For login
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  // Check whether user is registered or not using fs.readFile
  fs.readFile("user-list.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Server error." });
    }

    // Get every user from users.json through JSON parsing
    const users = JSON.parse(data);
    // Check if the user exists or not
    const existedUser = users.find((user) => user.username === username);

    if (!existedUser) {
      return res.status(400).json({ message: "You have not registered yet!" });
    } else {
      // compare passwords
      const isPasswordValid = bcrypt.compareSync(
        password,
        existedUser.hashPassword
      );
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Invalid username or password." });
      }

      return res
        .status(200)
        .json({ message: "You are logged in successfully!" });
    }
  });
});

// Server is listening at PORT?
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
