import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";
import { Plus } from "lucide-react";

const HomePage = () => {
  const {
    getOngoingTasks,
    getScheduledTasks,
    getCompletedTasks,
    addTask,
    editTask,
    completeTask,
    uncompleteTask,
    deleteTask,
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editingTask) {
      editTask(editingTask.id, data);
    } else {
      addTask(data);
    }
  };

  const openNewTaskForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const renderTaskList = (tasks, emptyMessage) => {
    if (!tasks || tasks.length === 0) {
      return <div style={{ color: "gray" }}>{emptyMessage}</div>;
    }
    return tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        onEdit={handleEdit}
        onComplete={completeTask}
        onUncomplete={uncompleteTask}
        onDelete={deleteTask}
      />
    ));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1>Your Workspace</h1>
          <p>Manage your day with elegance and efficiency.</p>
        </div>
        <button onClick={openNewTaskForm}>
          <Plus size={20} /> Add New Task
        </button>
      </header>

      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        <section>
          <h2>Ongoing</h2>
          {renderTaskList(getOngoingTasks(), "No ongoing tasks.")}
        </section>

        <section>
          <h2>Scheduled</h2>
          {renderTaskList(getScheduledTasks(), "No scheduled tasks.")}
        </section>

        <section>
          <h2>Completed</h2>
          {renderTaskList(getCompletedTasks(), "No completed tasks yet.")}
        </section>
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
      />
    </div>
  );
};

export default HomePage;
