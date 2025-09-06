import Task from "../models/tasksModels.js";

// Lấy tất cả tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Loi khi goi getAllTasks", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};

// Tạo task mới
export const createTasks = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const task = new Task({ title, status, completedAt });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Loi khi goi createTasks", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};

// Cập nhật task
export const updateTasks = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status, completedAt },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Nhiem vu khong ton tai" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Loi khi goi updateTasks", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};

// Xóa task
export const deleteTasks = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Nhiem vu khong ton tai" });
    }

    res.status(200).json({ message: "Xoa thanh cong", task: deletedTask });
  } catch (error) {
    console.error("Loi khi goi deleteTasks", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};
