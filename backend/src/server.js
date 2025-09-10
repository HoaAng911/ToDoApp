import express from 'express';
import tasksRoute from './routes/tasksRoutes.js';
const app = express();
import dotenv from "dotenv";
import connectDB from './config/db.js';
import cors from 'cors'
// Middleware để đọc JSON
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5000;
// Sử dụng route
//Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())
app.use('/api/tasks', tasksRoute);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server chạy trên http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Lỗi khi khởi động server:", err.message);
  }
};

startServer();
