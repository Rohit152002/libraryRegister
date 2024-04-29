import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
