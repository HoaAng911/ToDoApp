import Task from "../models/tasksModels.js";

// Lấy tất cả tasks
export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date()
  let startDate
  switch (filter) {
    case 'today': {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())//11-9-2025
      break
    }
    case 'week': {
      const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0)
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate)
      break
    }
    case 'month': {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      break
    }
    case 'all': {
      startDate = null
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {}
  try {
    const result = await Task.aggregate([{ $match: query }, { $facet: { tasks: [{ $sort: { createdAt: -1 } }], activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }], completeCount: [{ $match: { status: 'complete' } }, { $count: 'count' }] } }])

    const tasks = result[0].tasks
    const activeCount = result[0].activeCount[0]?.count || 0
    const completeCount = result[0].completeCount[0]?.count || 0
    res.status(200).json({ tasks, activeCount, completeCount });
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
