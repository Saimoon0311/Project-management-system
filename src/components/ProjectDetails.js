import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTasksAPI, toggleTaskAPI } from "../utils/mockApi";
import TaskItem from "./TaskItem";
import CreateEditModal from "./CreateEditModal";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state) =>
    state.projects.projects.find((p) => p.id === parseInt(id)),
  );
  const { tasks, loading } = useSelector((state) => state.tasks);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (project) {
      getTasksAPI(parseInt(id)).then((data) => {
        dispatch({ type: "SET_TASKS", payload: data });
      });
    }
  }, [id, project, dispatch]);

  if (!project) return <div className="loading">Project not found</div>;

  return (
    <div className="container">
      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginBottom: 20 }}
        className="btn"
      >
        ← Back to Dashboard
      </button>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>{project.name}</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowEditModal(true)}
          >
            Edit Project
          </button>
        </div>
        <p>
          <strong>Owner:</strong> {project.owner}
        </p>
        <p>
          Status:{" "}
          <span
            className={`status status-${project.status.toLowerCase().replace(" ", "")}`}
          >
            {project.status}
          </span>
        </p>
        <div style={{ background: "#eee", height: 10, borderRadius: 4 }}>
          <div
            className="progress-bar"
            style={{
              width: `${Math.min(100, Math.max(0, project.progress || 0))}%`,
            }}
          ></div>
        </div>
      </div>

      <h3 style={{ marginTop: 30 }}>Tasks</h3>
      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} projectId={parseInt(id)} />
        ))
      )}
      {tasks.length === 0 && <p>No tasks yet.</p>}

      {showEditModal && (
        <CreateEditModal
          onClose={() => setShowEditModal(false)}
          mode="edit"
          project={project}
        />
      )}
    </div>
  );
};

export default ProjectDetails;
