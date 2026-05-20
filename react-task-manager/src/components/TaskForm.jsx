import { useState } from "react";

function TaskForm({ addTask }) {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim() === "") {
      setError("Task cannot be empty.");
      return;
    }

    if (task.trim().length < 3) {
      setError("Task must contain at least 3 characters.");
      return;
    }

    addTask(task);
    setTask("");
    setError("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter  queue task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default TaskForm;