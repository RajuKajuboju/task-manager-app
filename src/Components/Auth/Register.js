import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const Register = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};

    
    if (!email) {
      formErrors.email = "Email address cannot be empty.";
    } else if (!emailRegex.test(email)) {
      formErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      formErrors.password = "Password cannot be empty.";
    } else if (!passwordRegex.test(password)) {
      formErrors.password = "Password must be at least 6 characters, with one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    if (!confirmPassword) {
      formErrors.confirmPassword = "Confirm password cannot be empty.";
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match!";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await register(email, password);
      setSuccessMessage(`Hi ${username}, your registration was successful!`);
      setShowModal(true);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/login");
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    let formErrors = { ...errors };

    if (id === "email") {
      if (!value) {
        formErrors.email = "Email address cannot be empty.";
      } else if (!emailRegex.test(value)) {
        formErrors.email = "Please enter a valid email address.";
      } else {
        delete formErrors.email;
      }
    }

    if (id === "password") {
      if (!value) {
        formErrors.password = "Password cannot be empty.";
      } else if (!passwordRegex.test(value)) {
        formErrors.password ="Password must be at least 6 characters, with one uppercase letter, one lowercase letter, one number, and one special character.";
      } else {
        delete formErrors.password;
      }
    }

    if (id === "confirmPassword") {
      if (!value) {
        formErrors.confirmPassword = "Confirm password cannot be empty.";
      } else if (value !== password) {
        formErrors.confirmPassword = "Passwords do not match!";
      } else {
        delete formErrors.confirmPassword;
      }
    }

    setErrors(formErrors);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center mt-4">
      <div className="row w-100 mb-2">
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center text-center ">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png"
            alt="Task Manager Illustration"
            className="mb-4"
            style={{ maxWidth: "80%", height: "auto" }}
          />
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "black" }}>
            Your productivity journey starts here.
          </h2>
          <p style={{ fontSize: "2rem", fontWeight: "bold", color: "black" }}>
            Register now!
          </p>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center mb-2">
          <div className="card p-4 shadow-lg mb-4" style={{ maxWidth: "400px", width: "100%" }}>
            <h2 className="text-center ">Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

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
                  onBlur={handleBlur}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
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
                  onBlur={handleBlur}
                />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={handleBlur}
                />

                {errors.confirmPassword && (
                  <small className="text-danger">{errors.confirmPassword}</small>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>

      
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{successMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            Go to Sign-In
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
