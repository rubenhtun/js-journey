import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 4000;

// Make to ensure cors requests
app.use(cors());
// Make sure JSON data is parsed
app.use(bodyParser.json());

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  // Check whether user is registered or not by using fs.readFile
  fs.readFile("user.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Server error." });
    }

    // Get every user from user.json through JSON parsing
    const users = JSON.parse(data);

    // Check user is valid or not
    const valid = users.find(
      (eachUser) =>
        eachUser.username === username && eachUser.password === password
    );

    if (!valid) {
      return res.status(400).json({ message: "Invalid username or password." });
    } else {
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
