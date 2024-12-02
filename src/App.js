import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import TaskList from "./Components/Task/TaskList";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import { TaskProvider } from "./Context/TaskContext";
import TaskForm from "./Components/Task/TaskForm";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const NotFound = () => (
  <div
    className="d-flex justify-content-center align-items-center flex-column"
    style={{ height: "100vh", textAlign: "center" }}>
    <img
      src="https://sugugohan.com/wp-content/uploads/2023/11/404notfound.png" 
      alt="404 Page Not Found"
      style={{ width: "400px", height: "auto" }} />
    <h2 style={{ marginTop: "20px", color: "#333" }}>Oops! Page Not Found</h2>
    <p>The page you are looking for doesn't exist or has been moved.</p>
    <a href="/" style={{ marginTop: "10px", textDecoration: "underline", color: "white" }}>
      Go Back to Home
    </a>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <div
                  className="container-fluid d-flex justify-content-center"
                  style={{ height: "100vh" }}>
                  <div className="row w-100">
                    <Login />
                  </div>
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <div
                  className="container-fluid d-flex justify-content-center"
                  style={{ height: "100vh" }}>
                  <div className="row w-100">
                    <Login />
                  </div>
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div
                  className="container-fluid d-flex justify-content-center"
                  style={{ height: "100vh" }}>
                  <div className="row w-100">
                    <Register />
                  </div>
                </div>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <div
                    className="container-fluid d-flex justify-content-center"
                    style={{ height: "100vh" }}
                  >
                    <div className="row w-100">
                      <div className="col-md-6 col-12 d-flex justify-content-center align-items-center mb-4">
                        <TaskForm onClose={() => {}} />
                      </div>
                      <div
                        className="col-md-6 col-12"
                        style={{
                          height: "100vh",
                          overflowY: "auto",
                        }}
                      >
                        <TaskList />
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
