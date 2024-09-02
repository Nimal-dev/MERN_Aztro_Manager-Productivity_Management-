import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function EditTask() {
  const [client, setClient] = useState("");
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    fetch("http://localhost:5000/Admin/viewtask")
      .then((res) => res.json())
      .then((result) => {
        console.log(result.clientlist);
        setClients(result.clientlist);
        // setClients(result.tasklist.map(task => ({ _id: task.client._id, name: task.client.name })));
      })
      .catch((error) => console.error("Error fetching client data:", error));
  }, []);


  useEffect(() => {
    let taskId = {
      id: location.state.id,
    };
    fetch("http://localhost:5000/Admin/findtask", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskId),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setClient(result.client);
        setTask(result.gettask.task);
        setDeadline(
          new Date(result.gettask.deadline).toISOString().split("T")[0]
        );
        setPriority(result.gettask.priority);
      });
  }, [location.state.id]);

  const taskupdate = () => {
    const params = {
      id: location.state.id,
      client: clients,
      tasks: task,
      prioritys: priority,
      deadlines: deadline,
    };
    fetch("http://localhost:5000/Admin/editTask", {
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
        navigate(-1);
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
              <div className="bg-secondary rounded p-4">
                <h2 className="text-center mb-4">Update Task</h2>
                <form>
                  <div className="mb-3">
                  <select
                      style={{ background: "rgba( 255, 255, 250, 0.052 )" }}
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
                  <div className="mb-3">
                    <label className="form-label">Task</label>
                    <input
                      type="text"
                      className="form-control"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
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
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={taskupdate}
                    >
                      Update
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

export default EditTask;
