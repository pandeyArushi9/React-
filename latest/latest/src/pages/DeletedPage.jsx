import { useTasks } from "../context/TaskContext";
import TaskItem from "../components/TaskItem";
import { Trash } from "lucide-react";

const DeletedPage = () => {
  const { getDeletedTasks, restoreTask, permanentDeleteTask, clearTrash } =
    useTasks();
  const deletedTasks = getDeletedTasks();

  return (
    <div className="page-container animate-slide-up">
      <header className="page-header">
        <div>
          <h1>Trash</h1>
          <p className="subtitle">
            Restore deleted tasks or remove them permanently.
          </p>
        </div>
        {deletedTasks.length > 0 && (
          <button className="btn btn-danger" onClick={clearTrash}>
            <Trash size={20} /> Empty Trash
          </button>
        )}
      </header>

      <div className="task-list deleted-list">
        {deletedTasks.length === 0 ? (
          <div className="empty-state trash-empty">Your trash is empty.</div>
        ) : (
          deletedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onRestore={restoreTask}
              onPermanentDelete={permanentDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default DeletedPage;
