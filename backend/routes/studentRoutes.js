import express from "express";

import {
  createStudent,
  getStudents,
  getStudentByID,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", createStudent);
router.get("/", getStudents);
router.get("/:id", getStudentByID);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;
// module.exports = router;
