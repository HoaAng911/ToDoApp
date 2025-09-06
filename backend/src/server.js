import express from 'express';
import tasksRoute from './routes/tasksRoutes.js';
const app = express();
const PORT = 5001;

// Middleware để đọc JSON
app.use(express.json());

// Sử dụng route
app.use('/api/tasks', tasksRoute);

app.listen(PORT, () => {
  console.log(`Server chạy trên http://localhost:${PORT}`);
});
