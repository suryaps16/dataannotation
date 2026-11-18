import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import ConfirmModal from "./components/ConfirmModal";

const STORAGE_KEY = "task-manager-tasks";

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title, description) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id, title, description) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    );
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setTaskToDelete(null);
  };

  const updateStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Task Manager</h1>
        <p className="app-subtitle">Organize your work, one task at a time</p>
      </header>

      <main className="app-main">
        <TaskForm
          onAdd={addTask}
          onUpdate={updateTask}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        <TaskFilter
          currentFilter={filter}
          onFilterChange={setFilter}
          taskCounts={{
            All: tasks.length,
            Pending: tasks.filter((t) => t.status === "Pending").length,
            "In Progress": tasks.filter((t) => t.status === "In Progress")
              .length,
            Completed: tasks.filter((t) => t.status === "Completed").length,
          }}
        />

        <TaskList
          tasks={filteredTasks}
          onEdit={setEditingTask}
          onDelete={setTaskToDelete}
          onStatusChange={updateStatus}
          filter={filter}
        />
      </main>

      {taskToDelete && (
        <ConfirmModal
          task={taskToDelete}
          onConfirm={() => deleteTask(taskToDelete.id)}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  );
}
