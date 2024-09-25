import mongoose from "mongoose";

export async function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URI!);

    let connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Db has been connected");
    });
    connection.on("error", (error) => {
      console.log("Connection error", error);
      process.exit();
    });
    
  } catch (error) {
    console.log("connection problem", error);
  }
}
