import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  let [input, setInput] = useState("");
  let [tasks, setTasks] = useState([]);


  useEffect(() => {
    const tasklist = JSON.parse(localStorage.getItem("tasks"));
    if(tasklist){
      setTasks(tasklist);
    }
  }, []);
  

  const handleClick = (e) => {
    e.preventDefault();
    if(input){ 
      let newTasks = [...tasks, input];
      setTasks(newTasks);
      
    let string = JSON.stringify(newTasks);
    localStorage.setItem("tasks", string);
    setInput("");
    }else{
      alert('Please enter a valid value');
    }
  };

  const removeTask = (e)=>{
    let li = e.target.parentNode;
    let index = li.getAttribute('data-target');
    let taskCopy = [...tasks];
    taskCopy.splice(index, 1);
    setTasks(taskCopy);
    localStorage.setItem('tasks', JSON.stringify(taskCopy));
  }
  return (
    <div className="TODO">
      <div className="container">
        <h1>To Do List</h1>
        <div className="form-container">
          <form className="todo-form" onSubmit={handleClick}>
            <input
              type="text"
              name="taskName"
              id="taskName"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button id="addTaskBtn">Add Task</button>
          </form>
        </div>
        <ul className="task-list" id="taskList">
          {tasks.map((task,index)=><li key={index} data-target={index}>{task}<button onClick={removeTask}>Remove</button></li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
