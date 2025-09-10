import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import AddTask from "@/components/AddTask";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import api from "@/lib/axios";
const Homepage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completeTasksCount, setCompleteTasksCount] = useState(0);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    fetchTask();
  }, []);

  //Lay data tasks tu backend
  const fetchTask = async () => {
    try {
      const res = await api.get("/tasks");
      setTaskBuffer(res.data.tasks);
      setActiveTasksCount(res.data.activeCount);
      setCompleteTasksCount(res.data.completeCount);

      console.log("Tasks:", res.data.tasks);
      console.log("Active:", res.data.activeCount);
      console.log("Completed:", res.data.completeCount);
    } catch (error) {
      console.error("Loi xay ra khi truy xuat tasks: ", error);
      toast.error("Loi xay ra khi truy xuat tasks");
    }
  };
  //loc danh sach nhiem vu theo trang thai
  const filteredTasks = taskBuffer.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "complete":
        return task.status === "complete";
      default:
        return true;
    }
  });
  const handleTaskChanged = () => {
    fetchTask();
  };

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative">
      {/* Dreamy Sky Pink Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container relative z-10 pt-8 mx-auto">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Header */}
          <Header />
          {/* Tao nhiem vu */}
          <AddTask handleNewTaskAdded={handleTaskChanged} />
          {/* Thong ke va bo loc */}
          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTasksCount}
            completedTasksCount={completeTasksCount}
          />
          {/* Danh sach nhiem vu */}
          <TaskList filteredTasks={filteredTasks} filter={filter} handleTaskChanged={handleTaskChanged}/>
          {/* Phan trang va loc theo Date */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination />
            <DateTimeFilter />
          </div>
          {/* Footer */}
          <Footer
            activeTasksCount={activeTasksCount}
            completedTasksCount={completeTasksCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
