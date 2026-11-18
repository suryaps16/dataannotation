export default function ConfirmModal({ task, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Delete Task</h3>
        <p>
          Are you sure you want to delete <strong>"{task.title}"</strong>? This
          action cannot be undone.
        </p>
        <div className="modal-actions">
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
