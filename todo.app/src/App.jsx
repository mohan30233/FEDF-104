import { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([])  
  const [taskText, setTaskText] = useState("")
  const [taskDate, setTaskDate] = useState("")
  const [taskTime, setTaskTime] = useState("")

  useEffect(() => {
    const raw = localStorage.getItem("tasks");
    const saved = raw ? JSON.parse(raw) : [];
    setTasks(saved);
  },[]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (
      taskText.trim() === "" ||
      taskDate.trim() === "" ||
      taskTime.trim() === ""
    ) {
      return;
    }
    const newTask = {
      id: Date.now(),
      task: taskText,
      date: taskDate,
      time: taskTime,
      completed: false,
    };
    setTasks([...tasks, newTask]); // fixed setter name
    setTaskText("");
    setTaskDate("");
    setTaskTime("");
  }

  return (
    <div>
      <h1>To-Do Tasks List</h1>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Enter the new task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <input
          type="date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        <input
          type="time"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  )    
}



export default App;