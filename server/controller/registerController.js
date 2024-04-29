import asyncHandler from "express-async-handler";
import Student from "../model/student.js";
import Register from "../model/register.js";

export const addRegister = asyncHandler(async (req, res) => {
  const { name, registration_no, department, semester } = req.body;
  const student = await Student.findOne({ registration_no });
  console.log(student);
  if (!student) {
    res.status(404);
    throw new Error("No student found in the registration");
  }
  const register = await Register.find({ registration_no });
  if (register.length > 0) {
    const studentInButNotOut = register.filter(
      (student) => student.out === null
    );
    if (studentInButNotOut.length > 0) {
      await Register.findByIdAndUpdate(studentInButNotOut[0]._id, {
        name: name,
        registration_no: registration_no,
        department,
        semester: semester,
        in: studentInButNotOut[0].in,
        out: Date.now(),
      });
      return res.status(200).json({ success: true, checkIn: false });
    }
  }

  await Register.create({
    name: student.name,
    registration_no: student.registration_no,
    department: student.department,
    semester: student.semester,
  });
  return res.status(200).json({ success: true, checkIn: true });
});

export const getStudentDetails = asyncHandler(async (req, res) => {
  if (!req.query) {
    return res
      .status(404)
      .json({ success: false, message: "Please Enter a registration" });
  }
  const { registration_no } = req.query;
  const student = await Student.findOne({ registration_no });
  if (!student) {
    res.status(404);
    throw new Error("No student found in the registration");
  }
  return res.status(200).json({ success: true, message: student });
});

export const getAllData = asyncHandler(async (req, res) => {
  const data = await Register.find();
  return res.status(200).json({ success: true, message: data });
});
