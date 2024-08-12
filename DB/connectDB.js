import mongoose from "mongoose";

const uri =
  "mongodb+srv://AaravAgarwal5:Aditi220305@cookie.yz94k.mongodb.net/Cookie?retryWrites=true&w=majority&appName=Cookie";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};

export default connectDB;
