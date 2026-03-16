import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProjectsAPI } from "../utils/mockApi";
import CreateEditModal from "./CreateEditModal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, loading } = useSelector((state) => state.projects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Only load mock data if there are no saved projects yet
    if (projects.length === 0) {
      dispatch({ type: "FETCH_PROJECTS_START" });
      fetchProjectsAPI().then((data) => {
        dispatch({ type: "FETCH_PROJECTS_SUCCESS", payload: data });
      });
    }
  }, [dispatch, projects.length]);

  const filteredProjects = projects
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => statusFilter === "All" || p.status === statusFilter);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h1>Project Dashboard</h1>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
            style={{ marginRight: 10 }}
          >
            New Project
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          className="input"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%" }}
        />
        <select
          className="input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {loading && <div className="loading">Loading projects...</div>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        {filteredProjects.length === 0 && !loading && <p>No projects found.</p>}

        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/project/${project.id}`)}
          >
            <h3>{project.name}</h3>
            <p>
              <strong>Owner:</strong> {project.owner}
            </p>
            <p>
              <span
                className={`status status-${project.status.toLowerCase().replace(" ", "")}`}
              >
                {project.status}
              </span>
            </p>
            <div style={{ background: "#eee", height: 8, borderRadius: 4 }}>
              <div
                className="progress-bar"
                style={{
                  width: `${Math.min(100, Math.max(0, project.progress || 0))}%`,
                }}
              ></div>
            </div>
            <p style={{ marginTop: 10, color: "#666" }}>
              Created: {project.created}
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <CreateEditModal onClose={() => setShowModal(false)} mode="create" />
      )}
    </div>
  );
};

export default Dashboard;
