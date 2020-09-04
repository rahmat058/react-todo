import React, { useState, useEffect } from "react";
import "./App.css";
import {
  AiFillDelete,
  AiOutlineCheckSquare,
  AiOutlineInbox,
} from "react-icons/ai";
import Tippy from "@tippyjs/react";

import EditTask from "./components/EditTask";

const todoList = [
  {
    name: "Finish UI Task",
    isCompleted: false,
  },
  {
    name: "Build Web App",
    isCompleted: false,
  },
  {
    name: "Learn Music",
    isCompleted: false,
  },
  {
    name: "Training Flutter",
    isCompleted: false,
  },
];

function App() {
  const [taskName, setTaskName] = useState("");
  const [searchTask, setSearchTask] = useState("");
  const [taskList, setTaskList] = useState(todoList);

  const addTask = () => {
    if (taskName !== "") {
      let taskData = {};
      taskData.name = taskName;

      setTaskList((oldData) => {
        return [...oldData, taskData];
      });
    } else {
      alert("Please insert a task name...");
    }

    setTaskName("");
  };

  const deleteTask = (index) => {
    const res = taskList.filter((task, i) => {
      if (i !== index) return task;
    });

    setTaskList(res);
  };

  useEffect(() => {
    const res = taskList.filter((task) => {
      return task.name.toLowerCase().indexOf(searchTask.toLowerCase()) !== -1; // returns true or false
    });

    if (searchTask !== "") {
      setTaskList(res);
    } else {
      setTaskList(todoList);
    }
  }, [searchTask]);

  const updateTask = (index, val) => {
    const newTaskList = [...taskList];
    newTaskList[index].name = val;
    setTaskList(newTaskList);
  };

  const completeTask = (index) => {
    const newTaskList = [...taskList];
    newTaskList[index].isCompleted = true;
    setTaskList(newTaskList);
  };

  return (
    <div className="container">
      <div className="row to-do-row">
        <div className="col-md-12">
          <form>
            <div className="form-row">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Task name...."
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
              <div className="col-md-9">
                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addTask}
                  >
                    Add Task
                  </button>
                  <input
                    type="text"
                    className="form-control mx-w-30"
                    placeholder="Search task...."
                    onChange={(e) => setSearchTask(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="task-list">
            {taskList.length > 0 ? (
              <ul className="list-group">
                {taskList.map((task, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span
                      className={
                        task && task.isCompleted ? "completed-task" : ""
                      }
                    >
                      {task && task.name}
                    </span>{" "}
                    <span className="d-flex">
                      <EditTask
                        task={task}
                        updateTask={updateTask}
                        index={index}
                      />
                      <Tippy content="Completed Task">
                        <span
                          className="cursor-pointer"
                          onClick={() => completeTask(index)}
                          style={{ marginRight: 10 }}
                        >
                          <AiOutlineCheckSquare size={20} color="green" />
                        </span>
                      </Tippy>

                      <Tippy content="Delete Task">
                        <span
                          className="cursor-pointer"
                          onClick={() => deleteTask(index)}
                        >
                          <AiFillDelete size={20} color="red" />
                        </span>
                      </Tippy>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-section">
                <h5>No Task Available</h5>
                <div>
                  <span>
                    <AiOutlineInbox size={100} color="#172B4D" />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
