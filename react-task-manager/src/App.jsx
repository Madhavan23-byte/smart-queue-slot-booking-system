import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("No tasks added yet.");

  useEffect(() => {
    if (tasks.length === 0) {
      setMessage("No tasks added yet.");
    } else {
      setMessage(`You have ${tasks.length} task(s) pending.`);
    }
  }, [tasks]);

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <div className="task-container">
        <h1>Smart Queue Admin Task Manager</h1>
<p className="subtitle">
  Manage queue-related admin tasks using React Hooks
</p>

        <TaskForm addTask={addTask} />

        <div className="status-box">
          <p>{message}</p>
        </div>

        <TaskList tasks={tasks} deleteTask={deleteTask} />
      </div>
    </div>
  );
}

export default App;