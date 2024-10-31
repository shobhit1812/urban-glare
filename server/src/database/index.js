import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `MONGODB connected !!! DB READYSTATE: ${connectionInstance.connection.readyState}`
    );
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED: ", error.message);
    console.log("MONGODB ERROR CODENAME: ", error.codeName);
    process.exit(1);
  }
};

export default connectDB;
