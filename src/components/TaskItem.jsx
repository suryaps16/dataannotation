const STATUS_OPTIONS = ["Pending", "In Progress", "Completed"];

const STATUS_COLORS = {
  Pending: "status-pending",
  "In Progress": "status-progress",
  Completed: "status-completed",
};

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <div className={`task-item ${STATUS_COLORS[task.status]}`}>
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
        <select
          className={`status-select ${STATUS_COLORS[task.status]}`}
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
          aria-label="Change task status"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">
        <span className="task-date">Created: {formatDate(task.createdAt)}</span>
        <div className="task-actions">
          <button
            className="btn btn-icon btn-edit"
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            title="Edit"
          >
            ✏️
          </button>
          <button
            className="btn btn-icon btn-delete"
            onClick={() => onDelete(task)}
            aria-label="Delete task"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
