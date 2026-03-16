import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fakeLogin } from "../utils/mockApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    dispatch({ type: "LOGIN_START" });

    try {
      const user = await fakeLogin(email, password);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      localStorage.setItem("auth", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      setError(err);
      dispatch({ type: "LOGIN_FAIL", payload: err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "100px auto",
        padding: 30,
        background: "white",
        borderRadius: 12,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <input
        className="input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={loading}
        style={{ width: "100%" }}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <p style={{ textAlign: "center", marginTop: 15, color: "#666" }}>
        Demo: any email with @ + password ≥ 4 chars
      </p>
    </div>
  );
};

export default Login;
