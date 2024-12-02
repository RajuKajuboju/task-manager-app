import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useTasks } from "../../Context/TaskContext";

const TaskList = () => {
  const { tasks, deleteTask, updateTask, loading } = useTasks();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const tasksPerPage = 5;


  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

 
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

 
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditedTask(task);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await updateTask(editingTaskId, editedTask);
    setEditingTaskId(null);
  };

  const handleCancel = () => {
    setEditingTaskId(null);
  };

 
  const handleDeleteClick = (taskId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (isConfirmed) {
      deleteTask(taskId);
    }
  };

  if (loading) {
    return (
      <div className="container d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container d-flex flex-column align-items-center mt-5">
      <div
        className="card p-4 shadow-lg mb-3"
        style={{
          maxWidth: "100%",
          width: "100%",
          height: "750px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4 className="mb-3 text-center">Task List</h4>

        {tasks.length > 0 && (
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title or description"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        )}

        {currentTasks.length > 0 ? (
          <div
            className="list-group"
            style={{
              overflowY: "auto",
              flex: 1,
            }}
          >
            {currentTasks.map((task) => (
              <div
                key={task.id}
                className="list-group-item justify-content-between align-items-center mb-3 shadow-sm"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#f9f9f9",
                  overflow: "visible",
                  padding: "10px",
                }}
              >
                {editingTaskId === task.id ? (
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      name="title"
                      className="form-control mb-2"
                      value={editedTask.title}
                      onChange={handleInputChange}
                      placeholder="Edit Title"
                    />
                    <textarea
                      name="description"
                      className="form-control mb-2"
                      value={editedTask.description}
                      onChange={handleInputChange}
                      placeholder="Edit Description"
                      style={{
                        minHeight: "50px",
                        maxHeight: "150px",
                        overflowY: "auto",
                      }}
                    />
                    <div className="d-flex justify-content-end">
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={handleSave}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ flex: 1 }}>
                    <h5 className="mb-1">{task.title}</h5>
                    <p
                      className="mb-1"
                      style={{
                        wordWrap: "break-word",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {task.description}
                    </p>
                  </div>
                )}

              
                {editingTaskId !== task.id && (
                  <div className="btn-group flex-column flex-sm-row">
                    <button
                      className="btn btn-outline-primary btn-sm me-2 mb-2 mb-sm-0 d-flex align-items-center rounded"
                      onClick={() => handleEditClick(task)}
                      style={{ gap: "5px", width: "80px" }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      <span>Edit</span>
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm d-flex align-items-center rounded"
                      onClick={() => handleDeleteClick(task.id)}
                      style={{ gap: "5px", width: "80px" }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          
          <div className="d-flex justify-content-center align-items-center h-100" >
          <p className="text-center" >No tasks available</p>
          </div>
        )}

        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-outline-primary btn-sm me-2"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`btn btn-outline-primary btn-sm me-2 ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-outline-primary btn-sm me-2"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
