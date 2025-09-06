import express from 'express';
import tasksRoute from './routes/tasksRoutes.js';
const app = express();
import dotenv from "dotenv";
import connectDB from './config/db.js';
// Middleware để đọc JSON
app.use(express.json());
dotenv.config();
connectDB()
// Sử dụng route
app.use('/api/tasks', tasksRoute);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server chạy trên http://localhost:${PORT}`);
});
