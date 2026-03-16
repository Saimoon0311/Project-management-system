import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProjectAPI, updateProjectAPI } from "../utils/mockApi";

const CreateEditModal = ({ onClose, mode, project }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: project?.name || "",
    owner: project?.owner || "",
    status: project?.status || "In Progress",
    progress: Math.min(100, Math.max(0, project?.progress || 0)), // ← safe clamp
    created: project?.created || new Date().toISOString().slice(0, 10),
  });

  const [submitting, setSubmitting] = useState(false);

  // Clamp progress value while typing (0-100)
  const handleProgressChange = (e) => {
    let value = parseInt(e.target.value) || 0;
    value = Math.min(100, Math.max(0, value)); // ← instant clamp
    setForm({ ...form, progress: value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.owner) {
      alert("Project Name and Owner are required");
      return;
    }

    setSubmitting(true);

    try {
      const projectData = {
        ...form,
        progress: Math.min(100, Math.max(0, form.progress)),
      };

      if (mode === "create") {
        const newProject = await createProjectAPI(projectData);
        dispatch({ type: "ADD_PROJECT", payload: newProject });
      } else {
        const updated = await updateProjectAPI({ ...project, ...projectData });
        dispatch({ type: "UPDATE_PROJECT", payload: updated });
      }
      onClose();
    } catch (err) {
      alert("Failed to save project");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
      }}
    >
      <div className="card" style={{ width: 500 }}>
        <h2>{mode === "create" ? "Create New Project" : "Edit Project"}</h2>

        <input
          className="input"
          placeholder="Project Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="input"
          placeholder="Owner"
          value={form.owner}
          onChange={(e) => setForm({ ...form, owner: e.target.value })}
        />

        <select
          className="input"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* FIXED PROGRESS INPUT */}
        <input
          className="input"
          type="number"
          placeholder="Progress % (0-100)"
          value={form.progress}
          onChange={handleProgressChange}
          min="0"
          max="100"
        />

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : mode === "create"
                ? "Create Project"
                : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEditModal;
