import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  registration_no: {
    type: String,
    required: true,
  },
  department:{
    type:String,
    requried:true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  in: {
    type: Date,
    default: Date.now,
  },
  out: {
    type: Date,
    default: null,
  },
});

const Register = new mongoose.model("Register", registerSchema);

export default Register;
