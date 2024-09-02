import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AddGroup() {
  const [users, setUsers] = useState([]);
  const [taskname, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamLeader, setTeamLeader] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch users data when the component mounts
    fetch("http://localhost:5000/Admin/viewUser") // Adjust the endpoint as necessary
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const createGroupTask = (e) => {
    e.preventDefault();
    const params = {
      taskname,
      priority,
      deadline,
      description,
      clientid: selectedUsers,
      teamLeader,
      status: 0,
    };

    fetch("http://localhost:5000/Admin/creategrouptask", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        // Show success message and refresh the page
        setSuccessMessage("Group task created successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Wait for 2 seconds before refreshing
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // Filter team leaders
  const teamLeaders = users.filter((user) => user.userStatus === 2);
  // Filter users with userStatus 1
  const activeUsers = users.filter((user) => user.userStatus === 1);

  return (
    <>
      <AdminSidebar />
      <div className="content">
        <AdminHeader />
        <div className="container-fluid">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
              <div className="rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <h3>Add Group Task</h3>
                </div>
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
                <form onSubmit={createGroupTask}>
                  <div className="form-group mb-3">
                    <label>Task Name</label>
                    <input
                      style={{ background: "rgba( 255, 255, 250, 0.052 )" }}
                      type="text"
                      className="form-control"
                      value={taskname}
                      onChange={(e) => setTaskName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label" htmlFor="form3Example4cg">
                      Priority
                    </label>
                    <select
                      style={{ background: "rgba( 255, 255, 250, 0.052 )" }}
                      name="priority"
                      value={priority}
                      className="form-control form-control"
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label>Deadline</label>
                    <input
                      style={{ background: "rgba( 255, 255, 250, 0.052 )" }}
                      type="date"
                      className="form-control"
                      value={deadline}
                      min={getTodayDate()}
                      onChange={(e) => setDeadline(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea
                      style={{ background: "rgba( 255, 255, 250, 0.052 )" }}
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Team Leader</label>
                    <select
                      style={{ background: "rgba( 255, 255, 250, 0.052 )" }}
                      className="form-control"
                      value={teamLeader}
                      onChange={(e) => setTeamLeader(e.target.value)}
                      required
                    >
                      <option value="">Select Team Leader</option>
                      {teamLeaders.map((leader) => (
                        <option key={leader.userid._id} value={leader.userid._id}>
                          {leader.userid.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label>Select Users</label>
                    <div>
                      {activeUsers.map((user) => (
                        <div key={user._id} className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value={user.userid._id}
                            onChange={() => handleCheckboxChange(user._id)}
                          />
                          <label className="form-check-label">
                            {user.userid.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="btn-new">
                    Create Group
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddGroup;






































// import React, { useState, useEffect } from "react";
// import AdminSidebar from "./AdminSidebar";
// import AdminHeader from "./AdminHeader";

// function AddGroup() {
//   const [users, setUsers] = useState([]);
//   const [taskname, setTaskName] = useState("");
//   const [priority, setPriority] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [description, setDescription] = useState("");
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [successMessage, setSuccessMessage] = useState("");

//   useEffect(() => {
//     // Fetch users data when the component mounts
//     fetch("http://localhost:5000/Admin/viewUser") // Adjust the endpoint as necessary
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data);
        
//       })
//       .catch((error) => console.error("Error fetching users:", error));
      
//   }, []);

//   const createGroupTask = (e) => {
//     e.preventDefault();
//     const params = {
//       taskname,
//       priority,
//       deadline,
//       description,
//       clientid: selectedUsers,
//       status: 0,
//     };

//     fetch("http://localhost:5000/Admin/creategrouptask", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(params),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         // Show success message and refresh the page
//         setSuccessMessage("Group task created successfully!");
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000); // Wait for 2 seconds before refreshing
//       })
//       .catch((error) => console.error("Error adding task:", error));
//   };

//   const handleCheckboxChange = (userId) => {
//     setSelectedUsers((prevSelectedUsers) => {
//       if (prevSelectedUsers.includes(userId)) {
//         return prevSelectedUsers.filter((id) => id !== userId);
//       } else {
//         return [...prevSelectedUsers, userId];
//       }
//     });
//   };

//   const getTodayDate = () => {
//     const today = new Date();
//     const yyyy = today.getFullYear();
//     const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const dd = String(today.getDate()).padStart(2, '0');
//     return `${yyyy}-${mm}-${dd}`;
//   };

//   return (
//     <>
//       <AdminSidebar />
//       <div className="content">
//         <AdminHeader />
//         <div className="container-fluid">
//           <div
//             className="row h-100 align-items-center justify-content-center"
//             style={{ minHeight: "100vh" }}
//           >
//             <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6">
//               <div className=" rounded p-4 p-sm-5 my-4 mx-3">
//                 <div className="d-flex align-items-center justify-content-center mb-3">
//                   <h3>Add Group Task</h3>
//                 </div>
//                 {successMessage && (
//                   <div className="alert alert-success" role="alert">
//                     {successMessage}
//                   </div>
//                 )}
//                 <form onSubmit={createGroupTask}>
//                   <div className="form-group mb-3">
//                     <label>Task Name</label>
//                     <input
//                       style={{ background: "rgba( 255, 255, 250, 0.052 )" }}
//                       type="text"
//                       className="form-control"
//                       value={taskname}
//                       onChange={(e) => setTaskName(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="form-group mb-3">
//                     <label className="form-label" htmlFor="form3Example4cg">
//                       Priority
//                     </label>
//                     <select
//                       style={{ background: "rgba( 255, 255, 250, 0.052 )" }}
//                       name="priority"
//                       value={priority}
//                       className="form-control form-control"
//                       onChange={(e) => setPriority(e.target.value)}
//                     >
//                       <option value="">Select Priority</option>
//                       <option value="High">High</option>
//                       <option value="Medium">Medium</option>
//                       <option value="Low">Low</option>
//                     </select>
//                   </div>
//                   <div className="form-group mb-3">
//                     <label>Deadline</label>
//                     <input
//                       style={{ background: "rgba( 255, 255, 250, 0.052 )" }}
//                       type="date"
//                       className="form-control"
//                       value={deadline}
//                       min={getTodayDate()}
//                       onChange={(e) => setDeadline(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="form-group mb-3">
//                     <label>Description</label>
//                     <textarea
//                       style={{ background: "rgba( 255, 255, 250, 0.052 )" }}
//                       className="form-control"
//                       value={description}
//                       onChange={(e) => setDescription(e.target.value)}
//                       required
//                     />
//                   </div>

                 




//                   <div className="form-group mb-3">
//                     <label>Select Users</label>
//                     <div>
//                       {users.map((user) => (
//                         <div key={user._id} className="form-check">
//                           <input
//                             type="checkbox"
//                             className="form-check-input"
//                             value={user.userid._id}
//                             onChange={() => handleCheckboxChange(user._id)}
//                           />
//                           <label className="form-check-label">
//                             {user.userid.name}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <button type="submit" className="btn-new">
//                     Create Group
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AddGroup;
