import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const taskCollection = collection(db, "tasks");
        const userQuery = query(taskCollection, where("userId", "==", currentUser.uid));
        const taskSnapshot = await getDocs(userQuery);
        setTasks(
          taskSnapshot.docs.map((doc) => ({...doc.data(),id: doc.id,}))
        );
      } 
      catch (error) {
        console.error("Error fetching tasks:", error);
      }
      setLoading(false);
    };

    fetchTasks();
  }, [currentUser]);

  const addTask = async (task) => {
    if (!currentUser) {
      console.error("User is not logged in!");
      return;
    }

    const newTask = { ...task, userId: currentUser.uid };
    try {
      const docRef = await addDoc(collection(db, "tasks"), newTask);
      setTasks((prevTasks) => [...prevTasks, { ...newTask, id: docRef.id }]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await updateDoc(doc(db, "tasks", id), updatedTask);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, loading }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
