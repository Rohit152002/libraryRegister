import express from "express";
import {
  getStudentDetails,
  addRegister,
  getAllData,
} from "../controller/registerController.js";
const router = express.Router();

router.get("/", getStudentDetails);
router.post("/", addRegister);
router.get("/all", getAllData);

export default router;
