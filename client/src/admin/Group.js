import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Group() {
  const [users, setUsers] = useState([]);
  const [grouptask, setGrouptask] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/Admin/viewallusers")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/Admin/viewgrouptask")
      .then((res) => res.json())
      .then((result) => {
        setGrouptask(result);
      })
      .catch((error) => console.error("Error fetching group task data:", error));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = (id) => {
    fetch("http://localhost:5000/Admin/deletegrouptask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setGrouptask(grouptask.filter((task) => task._id !== id));
        } else {
          console.error("Error deleting group task:", result.message);
        }
      })
      .catch((error) => console.error("Error deleting group task:", error));
  };

  return (
    <>
      <div className="col-12">
        <div className="rounded h-100 p-4">
          <h6 className="mb-2">GROUPS</h6>
          <div className="table-responsive">
            {grouptask.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Sl. No</th>
                    <th scope="col">Task Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {grouptask.map((groupdetail, index) => (
                    <tr key={groupdetail._id}>
                      <td>{index + 1}</td>
                      <td>{groupdetail.taskname}</td>
                      <td>{groupdetail.description}</td>
                      <td>{formatDate(groupdetail.deadline)}</td>
                      <td>{groupdetail.priority}</td>
                      <td>
                        <Link
                          to="/viewgrouptask"
                          state={{ id: groupdetail._id }}
                          className="btn btn-primary"
                        >
                          View
                        </Link>
                        &nbsp;
                        <Link
                          to="/editgrouptask"
                          state={{ id: groupdetail._id }}
                          className="btn btn-success"
                        >
                          Edit
                        </Link>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(groupdetail._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center">No group tasks available</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Group;
