import { useState, useEffect, useRef } from "react";

export default function TaskForm({ onAdd, onUpdate, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setError("");
      titleRef.current?.focus();
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Task title is required.");
      titleRef.current?.focus();
      return;
    }

    if (editingTask) {
      onUpdate(editingTask.id, trimmedTitle, description.trim());
    } else {
      onAdd(trimmedTitle, description.trim());
    }

    setTitle("");
    setDescription("");
    setError("");
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setError("");
    onCancelEdit();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>

      <div className="form-group">
        <label htmlFor="task-title">
          Title <span className="required">*</span>
        </label>
        <input
          ref={titleRef}
          id="task-title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          className={error ? "input-error" : ""}
        />
        {error && <span className="error-message">{error}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          placeholder="Add details (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTask ? "Save Changes" : "Add Task"}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
