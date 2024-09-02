import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

function AddTask() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState([]);
  const [isTaskAdded, setIsTaskAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/Admin/viewtask")
      .then((res) => res.json())
      .then((result) => {
        console.log(result.clientlist);
        setClients(result.clientlist);
      })
      .catch((error) => console.error("Error fetching client data:", error));
  }, []);

  const addTask = (e) => {
    e.preventDefault(); // Prevent the form from submitting the default way
    const params = {
      client: clientId,
      task: task,
      priority: priority,
      deadline: new Date(deadline).toISOString().split("T")[0],
      status: 0,
    };
    fetch("http://localhost:5000/Admin/addtask", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsTaskAdded(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // Optionally navigate to another page after a delay
        // setTimeout(() => navigate("/viewtask"), 2000);
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <>
      <AdminSidebar/>
      <div className="content">
        <AdminHeader/>
        <div className="container-fluid">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
              <div className="rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <h3>ADD TASK</h3>
                </div>
                {isTaskAdded && (
                  <div className="alert alert-success" role="alert">
                    Task added successfully!
                  </div>
                )}
                <form onSubmit={addTask}>
                  <div className="form-floating mb-3">
                    <select
                      style={{background:"rgba( 255, 255, 250, 0.052 )"}}
                      name="client"
                      value={clientId}
                      className="form-control"
                      onChange={(e) => setClientId(e.target.value)}
                    >
                      <option>Select Staff</option>
                      {clients.map((client) => (
                        <option key={client._id} value={client._id}>
                          {client.userid.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-outline mb-3">
                    <label className="form-label" htmlFor="form3Example3cg">
                      Task Name
                    </label>
                    <input
                      style={{background:"rgba(255, 255, 250, 0.052)"}}
                      type="task"
                      name="text"
                      
                      id="form3Example3cg"
                      className="form-control"
                      onChange={(e) => setTask(e.target.value)}
                    />
                    
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example4cg">
                      Priority
                    </label>
                    <select
                      style={{background:"rgba( 255, 255, 250, 0.052 )"}}
                      name="priority"
                      value={priority}
                      className="form-control form-control"
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="" >Select Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3cg">
                      Deadline
                    </label>
                    <input
                      style={{background:"rgba( 255, 255, 250, 0.052 )"}}
                      type="date"
                      name="deadline"
                      id="form3Example3cg"
                      className="form-control form-control"
                      min={getTodayDate()}
                      onChange={(e) => setDeadline(e.target.value)}
                    />
                    
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn-new w-100 mb-4"
                    >
                      <strong>ADD TASK</strong>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddTask;
