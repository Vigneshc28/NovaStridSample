import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { addTask, deleteTask, setTasks, toggleTask } from "./redux/taskSlice";
import axios from "axios";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5").then((res) => {
      dispatch(setTasks(res.data.map((task: any) => ({ id: task.id, title: task.title, completed: task.completed }))));
    });
  }, [dispatch]);

  const handleAddTask = () => {
    if (taskInput.trim()) {
      dispatch(addTask(taskInput));
      setTaskInput("");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "completed" ? task.completed : filter === "pending" ? !task.completed : true
  );

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Task Manager</h2>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={handleAddTask}>Add</button>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.completed} onChange={() => dispatch(toggleTask(task.id))} />
            {task.tittle}
            <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;