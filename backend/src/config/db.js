import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối CSDL thành công");
  } catch (error) {
    console.error("Kết nối CSDL thất bại vui lòng thử lại:", error.message);
    process.exit(1);
  }
};

export default connectDB;
