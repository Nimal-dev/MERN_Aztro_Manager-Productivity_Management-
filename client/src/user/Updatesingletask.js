import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import AdminHeader from "../admin/AdminHeader";
import UserFeedback from "./UserFeedback";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
// Import the graph component
import TaskCompletionGraph from './TaskCompletionGraph';

function Updatesingletask() {
  const location = useLocation();
  const [task, setTask] = useState({});
  const [completion, setCompletion] = useState(0);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    let param = { id: location.state.id };
    fetch("http://127.0.0.1:5000/user/getsingletask", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        setTask(result);
        setCompletion(result.status);
      });
  }, [location.state.id]);

  const updateCompletion = (value) => {
    setCompletion(value);
    let params = { id: location.state.id, completion: value };
    fetch("http://localhost:5000/Admin/updateTaskCompletion", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        setTask(result);
        setIsUpdated(true);
        console.log(isUpdated);
      });
  };

  const completeTask = () => {
    updateCompletion(100);
  };

  return (
    <>
      <AdminSidebar />
      <div className="content">
        <AdminHeader />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-12">
              <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-2">Task Update</h6>
                <div className="table-responsive">
                  <p className="card-text">Task name: {task.task}</p>
                  <p className="card-text">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                  <p className="card-text">Priority: {task.priority}</p>
                  <p className="card-text"style={{width:"50px"}}>
                    Completion: {completion}%
                  </p>
                  <Slider
                    min={0}
                    max={100}
                    value={completion}
                    onChange={updateCompletion}
                    disabled={completion === 100}
                  />
                  <button
                    className="btn btn-primary mt-3"
                    onClick={completeTask}
                    disabled={completion === 100}
                  >
                    {completion === 100 ? "Task Completed" : "Complete this task"}
                  </button>
                  <TaskCompletionGraph taskId={location.state.id} deadline={task.deadline} />
                </div>
              </div>
            </div>
            <UserFeedback />
          </div>
        </div>
      </div>
    </>
  );
}

export default Updatesingletask;
