import express from "express";

const app = express();
const PORT = 5000;

// This is a middleware to parse json to js object and attach data to req.body
app.use(express.json());

// endpoint // API
app.get("/", (req, res) => {
  //   const data = req.body;
  //   console.log(data.name);
  res.send("Student Management SaaS Backend is running");
});

//endpoint // API
app.post("/students", (req, res) => {
  const student = req.body;
  console.log("Received Student: ", student);

  res.status(200).json({
    message: "Student created successfully.",
    data: student,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
