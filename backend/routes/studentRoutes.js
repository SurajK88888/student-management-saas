import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

import {
  createStudent,
  getStudents,
  getStudentByID,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/", authMiddleware, createStudent);
router.get("/", authMiddleware, getStudents);
router.get("/:id", authMiddleware, getStudentByID);
router.put("/:id", authMiddleware, updateStudent);
router.delete("/:id", authMiddleware, deleteStudent);

export default router;
// module.exports = router;
