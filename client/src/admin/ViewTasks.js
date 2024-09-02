import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ViewTask() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/Admin/viewtask")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTasks(result.tasklist);
      })
      .catch((error) => console.error("Error fetching task data:", error));
  }, []);

  const deleteTask = (iD) => {
    let delId = {
      id: iD,
    };
    fetch("http://localhost:5000/Admin/deletetask", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(delId),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTasks(tasks.filter((task) => task._id !== iD));
      });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="col-sm-12 col-xl-8">
        <div className="rounded h-100 p-4">
          <h6 className="mb-2">ASSIGNED TASKS</h6>
          <div className="table-responsive">
            {tasks.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Task</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Mode of task</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.client.userid.name}</td>
                      <td>{data.task}</td>
                      <td>{formatDate(data.deadline)}</td>
                      <td>{data.priority}</td>
                      <td>
                        <Link to="/viewsingletask" state={{ id: data._id }}>
                          <button
                            className="btn btn-primary me-1"
                            type="button"
                          >
                            View
                          </button>
                        </Link>
                        <Link to="/updatetask" state={{ id: data._id }}>
                          <button
                            className="btn btn-success me-1"
                            type="button"
                          >
                            Edit
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteTask(data._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center">No tasks assigned</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewTask;
