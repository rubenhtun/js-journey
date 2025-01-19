import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";

const app = express();
const port = 4000; // Local Server Port >>> 4000

app.use(cors()); // Available requests from different origins
app.use(bodyParser.json()); // Parse incoming JSON payload

app.post("/register", (req, res) => {
  const { name, email, phone, event, message } = req.body;

  // Firstly read the applicant-list.json file
  fs.readFile("applicant-list.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Server error" });
    }

    // Parsing json file
    let applicants = JSON.parse(data);

    // Additional check for sure
    if (!Array.isArray(applicants)) {
      applicants = [];
    }

    // Make sure whether user exists or not
    const alreadyExit = applicants.find(
      (applicant) => applicant.email === email
    );

    if (alreadyExit) {
      return res.status(400).json({
        message: "This email has already been registered!",
      });
    }

    applicants.push({ name, email, phone, event, message }); // push all data

    fs.writeFile("applicant-list.json", JSON.stringify(applicants), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to save registration" });
      }
      return res
        .status(200)
        .json({ message: "Your registration was successful!" });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}.`);
});
