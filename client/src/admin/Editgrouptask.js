import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import AdminHeader from "../admin/AdminHeader";

function Editgrouptask() {
  const [users, setUsers] = useState([]);
  const [taskname, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [clientid, setClientid] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const location = useLocation();

  // Fetch all users when the component mounts
  useEffect(() => {
    fetch("http://localhost:5000/Admin/viewallusers")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  // Fetch the task data when the component mounts or when the location state changes
  useEffect(() => {
    const param = {
      id: location.state.id,
    };

    fetch("http://localhost:5000/Admin/findgrouptask", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        setTaskName(result.taskname);
        setPriority(result.priority);
        setDeadline(new Date(result.deadline).toISOString().split("T")[0]); // Format date to "yyyy-MM-dd"
        setDescription(result.description);
        setSelectedUsers(result.users || []);
      })
      .catch((error) => console.error("Error fetching task data:", error));
  }, [location.state.id]);

  // Handle checkbox state changes
  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  // Function to update the group task
  const updateGroupTask = () => {
    const param = {
      id: location.state.id,
      clientid,
      taskname,
      priority,
      deadline,
      description,
      users: selectedUsers,
    };

    fetch("http://localhost:5000/Admin/updategrouptask", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
      })
      .catch((error) => console.error("Error updating task:", error));
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
                <h6 className="mb-4">Edit Group Task</h6>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Select</th>
                        <th scope="col">User Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user._id)}
                              onChange={() => handleCheckboxChange(user._id)}
                            />
                          </td>
                          <td>{user.userid.name}</td> {/* Adjust based on actual user structure */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mb-3">
                  <label className="form-label">Task Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={taskname}
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Priority</label>
                  <input
                    type="text"
                    className="form-control"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Deadline</label>
                  <input
                    type="date"
                    className="form-control"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={updateGroupTask}>
                  Update Group Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editgrouptask;
