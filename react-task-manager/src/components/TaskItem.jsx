function TaskItem({ task, index, deleteTask }) {
  return (
    <li className="task-item">
      <div className="task-info">
        <span className="task-number">{index + 1}</span>
        <span className="task-text">{task.text}</span>
      </div>

      <button className="delete-btn" onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;