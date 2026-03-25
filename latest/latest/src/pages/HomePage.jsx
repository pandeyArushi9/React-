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

  const ongoing = getOngoingTasks();
  const scheduled = getScheduledTasks();
  const completed = getCompletedTasks();

  const renderTaskList = (tasks, emptyMessage) => {
    if (!tasks || tasks.length === 0) {
      return <div className="empty-state">{emptyMessage}</div>;
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
    <main className="workspace">
      <header className="workspace-header">
        <div className="workspace-title">
          <h1>Your Workspace</h1>
          <p>Manage your day with elegance and efficiency.</p>
        </div>
        <button className="btn-add" onClick={openNewTaskForm}>
          <Plus size={17} />
          <span>New Task</span>
        </button>
      </header>

      <div className="columns">
        <section className="column">
          <div className="column-header">
            <span className="column-label">Ongoing</span>
            <span className="column-count">{ongoing.length}</span>
          </div>
          <div className="task-list">
            {renderTaskList(ongoing, "No ongoing tasks.")}
          </div>
        </section>

        <section className="column">
          <div className="column-header">
            <span className="column-label">Scheduled</span>
            <span className="column-count">{scheduled.length}</span>
          </div>
          <div className="task-list">
            {renderTaskList(scheduled, "No scheduled tasks.")}
          </div>
        </section>

        <section className="column">
          <div className="column-header">
            <span className="column-label">Completed</span>
            <span className="column-count">{completed.length}</span>
          </div>
          <div className="task-list">
            {renderTaskList(completed, "No completed tasks yet.")}
          </div>
        </section>
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
      />
    </main>
  );
};

export default HomePage;
