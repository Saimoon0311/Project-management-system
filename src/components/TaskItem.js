import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTaskAPI } from "../utils/mockApi";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks); // ← this was missing
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggle = async () => {
    const originalTasks = [...tasks]; // save current state for revert
    dispatch({ type: "TOGGLE_TASK_OPTIMISTIC", payload: task.id });
    setIsUpdating(true);

    try {
      await toggleTaskAPI(task);
      // Success → optimistic update stays (exactly as required)
    } catch (err) {
      dispatch({ type: "TOGGLE_TASK_FAIL", payload: originalTasks }); // revert on failure
      alert("Failed to update task");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className="card"
      style={{
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 15,
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        disabled={isUpdating}
      />
      <div style={{ flex: 1 }}>
        <strong>{task.title}</strong>
        <br />
        <small>Assignee: {task.assignee}</small>
      </div>
      <span
        style={{
          padding: "4px 12px",
          background: task.priority === "High" ? "#ffebee" : "#e8f5e9",
          color: task.priority === "High" ? "#c62828" : "#2e7d32",
          borderRadius: 20,
          fontSize: 13,
        }}
      >
        {task.priority}
      </span>
    </div>
  );
};

export default TaskItem;
