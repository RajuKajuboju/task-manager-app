import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;

    setEmailError("");
    setPasswordError("");


    if (!email)
       {
      setEmailError("Email address cannot be empty.");
      valid = false;
      } 
    else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email address.");
        valid = false;}
    }

    if (!password) {
      setPasswordError("Password cannot be empty.");
      valid = false;
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
      if (!passwordRegex.test(password))
        {
        setPasswordError(
          "Password must be at least 6 characters, with one uppercase letter, one lowercase letter, one number, and one special character."
        );
        valid = false;
      }
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm())
       {
         return;
       }

    try {
      await login(email, password);
      navigate("/tasks");
    } catch (err) {
      alert(err.message);
    }
  };

 
  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("Email address cannot be empty.");
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
  };


  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError("Password cannot be empty.");
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
      if (!passwordRegex.test(password)) {
        setPasswordError(
          "Password must be at least 6 characters, with one uppercase letter, one lowercase letter, one number, and one special character."
        );
      } else {
        setPasswordError("");
      }
    }
  };

  return (
    <div
      className="container  d-flex align-items-center justify-content-center mt-4"
      style={{
        padding: "10px",
        
      }}
    >
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
          <h1 style={{ color: "white", fontWeight: "bold", fontSize: "3rem" }}>
            Welcome
          </h1>
          <div
            style={{
              height: "50px",
              overflow: "hidden",
              width: "100%",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <p
              style={{
                position: "absolute",
                animation: "scrollText 10s linear infinite",
                whiteSpace: "nowrap",
                fontSize: "1.2rem",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Stay organized, Stay on track. Your tasks, Your way!
            </p>
          </div>
          <div
            className="card text-white  bg-primary shadow-lg"
            style={{ maxWidth: "80%", borderRadius: "15px" }}
          >
            <div className="card-body text-center">
              <h1 className="card-title display-4">Task Manager</h1>
              <p className="card-text lead">
                Manage your tasks efficiently and effortlessly.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center mt-3 mb-3">
          <div
            className="card p-5 shadow-lg mb-2"
            style={{
              maxWidth: "90%",
              width: "400px",
              borderRadius: "15px",
            }}
          >
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleEmailBlur}
                />
                {emailError && (
                  <div className="text-danger" style={{ fontSize: "0.875rem" }}>
                    {emailError}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                />
                {passwordError && (
                  <div className="text-danger" style={{ fontSize: "0.875rem" }}>
                    {passwordError}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3">
                Login
              </button>
            </form>
            <div className="text-center mt-3">
              <p>
                Don't have an account?{" "}
                <button
                  className="btn btn-link p-0 text-wrap"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }

          @media (max-width: 768px) {
            .card { padding: 20px; margin: 0 auto; }
            h1 { font-size: 2rem; }
            p { font-size: 1rem; }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
