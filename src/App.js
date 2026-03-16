import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProjectDetails from "./components/ProjectDetails";
import PrivateRoute from "./PrivateRoute";
import { loginSuccess } from "./store/authSlice"; // we'll add action creators

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading: authLoading } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    if (savedAuth) {
      dispatch(loginSuccess(JSON.parse(savedAuth)));
    }
  }, [dispatch]);

  // if (authLoading) {
  //   return <div className="loading">Checking authentication...</div>;
  // }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/project/:id"
        element={
          <PrivateRoute>
            <ProjectDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={
          <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
        }
      />
    </Routes>
  );
}

export default App;
