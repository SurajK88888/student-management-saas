import express from "express";

const app = express()
const PORT = 5000;

app.get("/",(req,res)=>{
    res.send("Student Management SaaS Backend is running");
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
