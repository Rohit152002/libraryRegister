import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  registration_no: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Students", studentSchema);
export default Student;
