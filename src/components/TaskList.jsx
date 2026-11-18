import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onEdit, onDelete, onStatusChange, filter }) {
  if (tasks.length === 0) {
    const message =
      filter === "All"
        ? "No tasks yet. Add one above to get started!"
        : `No ${filter.toLowerCase()} tasks found.`;

    return (
      <div className="task-list-empty">
        <span className="empty-icon">📭</span>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
