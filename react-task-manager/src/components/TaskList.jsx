import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask }) {
  return (
    <div className="task-list">
      <h2>Task List</h2>

      {tasks.length === 0 ? (
        <p className="empty-text">Your task list is empty.</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;