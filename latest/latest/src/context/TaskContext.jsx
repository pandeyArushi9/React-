import { createContext, useState, useEffect, useContext } from "react";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("premium_todo_tasks");
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: "1",
        title: "PPT Design",
        description: "Design ppt for the upcoming presentation",
        status: "ongoing",
        createdAt: new Date().toISOString(),
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("premium_todo_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).substring(2, 15),
      status: "ongoing",
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const editTask = (id, updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedTask } : t)),
    );
  };

  const completeTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "completed" } : t)),
    );
  };

  const uncompleteTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "ongoing" } : t)),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "deleted" } : t)),
    );
  };

  const restoreTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "ongoing" } : t)),
    );
  };

  const permanentDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const clearTrash = () => {
    setTasks((prev) => prev.filter((t) => t.status !== "deleted"));
  };

  const getOngoingTasks = () =>
    tasks.filter((t) => t.status === "ongoing" && !t.dueDate);
  // We define scheduled tasks as ongoing tasks that have a due date
  // A more robust implementation would check if the date is in the future
  const getScheduledTasks = () =>
    tasks.filter((t) => t.status === "ongoing" && t.dueDate);
  const getCompletedTasks = () => tasks.filter((t) => t.status === "completed");
  const getDeletedTasks = () => tasks.filter((t) => t.status === "deleted");

  const value = {
    tasks,
    addTask,
    editTask,
    completeTask,
    uncompleteTask,
    deleteTask,
    restoreTask,
    permanentDeleteTask,
    clearTrash,
    getOngoingTasks,
    getScheduledTasks,
    getCompletedTasks,
    getDeletedTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
