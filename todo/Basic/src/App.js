import "./App.css";
import React from "react";

function App() {
  return (
    <div className="TODO">
      <div className="container">
        <h1>To Do List</h1>
        <div className="form-container">
          <form className="todo-form" onSubmit={handleClick}>
            <input type="text" name="taskName" id="taskName" />
            <button id="addTaskBtn">Add Task</button>
          </form>
        </div>
        <ul className="task-list" id="taskList"></ul>
      </div>
    </div>
  );
}

const handleClick = (e) => {
  e.preventDefault();
  // get and create elements
  let input = document.getElementById("taskName");
  let taskList = document.getElementById("taskList");
  let li = document.createElement("li");
  let removebtn = document.createElement("button");

  // get input value
  let inputValue = input.value;
  if (inputValue === "") {
    alert('Please enter a valid text');
  } else {
    // set innerText of elements
    li.innerText = inputValue;
    removebtn.innerText = "cancel";

    // append elements
    li.appendChild(removebtn);
    console.log(li);
    taskList.appendChild(li);

    // set the input value to null
    input.value = "";

    // remove button click event
    removebtn.addEventListener("click", (e, i) => {
      e.target.parentNode.remove();
    });
  }
};
export default App;
