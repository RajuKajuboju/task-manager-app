import React, { useState, useEffect } from "react";
import { useTasks } from "../../Context/TaskContext";

const TaskForm = ({ initialTask, onClose }) => {
  const { addTask, updateTask } = useTasks();
  const [task, setTask] = useState(initialTask || { title: "", description: "" });
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    setTask(initialTask || { title: "", description: "" });
  }, [initialTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (task.id) {
      await updateTask(task.id, task);
    } else {
      await addTask(task);
    }

    onClose();

    setTask({ title: "", description: "" });

    setLoading(false);
  };

  const handleReset = () => {
    setTask(initialTask || { title: "", description: "" });
  };

  return (
    <div className="container d-flex justify-content-center mt-5 ">
      <div className="card p-4 shadow-lg mb-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h4 className="mb-3 text-center">{task.id ? "Update Task" : "Add Task"}</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Task Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Task Title"
              className="form-control"
              value={task.title}
              onChange={handleChange}
              required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Task Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Task Description"
              className="form-control"
              value={task.description}
              onChange={handleChange}
              required
              style={{ resize: "vertical", minHeight: "50px" }}/>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Processing..." : task.id ? "Update" : "Add"} Task
            </button>
            <button type="button" className="btn btn-warning" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
