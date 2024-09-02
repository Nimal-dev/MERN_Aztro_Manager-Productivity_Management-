import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserFeedback from "../user/UserFeedback";
import AdminSidebar from "../admin/AdminSidebar";
import AdminHeader from "../admin/AdminHeader";

function Leadhome() {
  const [authenticated] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [task, setTask] = useState([]);
  const [groupTasks, setGroupTasks] = useState([]);

  useEffect(() => {
    let param = {
      userid: authenticated._id,
    };

    fetch("http://localhost:5000/Admin/viewTaskById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        setTask(result.tasklist);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [authenticated]);
  useEffect(() => {
    const loggedInUserId = JSON.parse(localStorage.getItem("userdata"))?.userid;
    // console.log("Logged in Iserid:",loggedInUserId._id);
    
    fetch("http://localhost:5000/Admin/viewgrouptask")
      .then((res) => res.json())
      .then((result) => {
        // console.log("LocalStorage:",result.task.teamLeader)
        // Filter group tasks by the logged-in user's userid
        const filteredTasks = result.filter(task => task.teamLeader === loggedInUserId._id);
        setGroupTasks(filteredTasks);
      })
      .catch((error) => console.error("Error fetching group task data:", error));
  }, []);
 
  return (
    <>
      <AdminSidebar />
      <div className="content">
        <AdminHeader />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-12">
              {/* <div className="rounded p-4">
                <h6 className="mb-2">View Tasks</h6>
                <div className="table-responsive">
                  {task.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Task</th>
                          <th scope="col">Deadline</th>
                          <th scope="col">Priority of task</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {task.map((data, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{data.task}</td>
                            <td>{data.deadline}</td>
                            <td>{data.priority}</td>
                            <td>
                              <Link
                                to="/updatesingletask"
                                className="btn btn-info"
                                state={{ id: data._id }}
                              >
                                View Task
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No tasks assigned</p>
                  )}
                </div>
              </div> */}

              <div className="rounded p-4">
                <h6 className="mb-2">View Group Tasks</h6>
                <div className="table-responsive">
                  {groupTasks.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Task Name</th>
                          <th scope="col">Deadline</th>
                          <th scope="col">Priority</th>
                          <th scope="col">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupTasks.map((data, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{data.taskname}</td>
                            <td>{data.deadline}</td>
                            <td>{data.priority}</td>
                            <td>{data.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No group tasks available</p>
                  )}
                </div>
              </div>
              <UserFeedback/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Leadhome;
















// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import UserFeedback from "../user/UserFeedback";
// import AdminSidebar from "../admin/AdminSidebar";
// import AdminHeader from "../admin/AdminHeader";


// function Leadhome() {
//   const [authenticated] = useState(
//     JSON.parse(localStorage.getItem("userdata"))
//   );
//   const [task, setTask] = useState([]);
//   const [groupTasks, setGroupTasks] = useState([]);

//   useEffect(() => {
//     let param = {
//       userid: authenticated._id,
//     };

//     fetch("http://localhost:5000/Admin/viewTaskById", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(param),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         setTask(result.tasklist);
//       })
//       .catch((error) => console.error("Error fetching tasks:", error));
//   }, [authenticated]);

//   useEffect(() => {
//     let param = {
//       userid: authenticated.userid, // fixed user id property
//     };

//     fetch("http://localhost:5000/Admin/viewgrouptaskById", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(param),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         setGroupTasks(result);
//       })
//       .catch((error) => console.error("Error fetching group tasks:", error));
//   }, [authenticated]);

//   return (
//     <>
//       <AdminSidebar />
//       <div className="content">
//         <AdminHeader />
//         <div className="container-fluid pt-4 px-4">
//           <div className="row g-4">
//             <div className="col-12">
//               <div className="rounded p-4">
//                 <h6 className="mb-2">View Tasks</h6>
//                 <div className="table-responsive">
//                   {task.length > 0 ? (
//                     <table className="table">
//                       <thead>
//                         <tr>
//                           <th scope="col">#</th>
//                           <th scope="col">Task</th>
//                           <th scope="col">Deadline</th>
//                           <th scope="col">Priority of task</th>
//                           <th scope="col">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {task.map((data, index) => (
//                           <tr key={index}>
//                             <th scope="row">{index + 1}</th>
//                             <td>{data.task}</td>
//                             <td>{data.deadline}</td>
//                             <td>{data.priority}</td>
//                             <td>
//                               <Link
//                                 to="/updatesingletask"
//                                 className="btn btn-info"
//                                 state={{ id: data._id }}
//                               >
//                                 View Task
//                               </Link>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   ) : (
//                     <p>No tasks assigned</p>
//                   )}
//                 </div>
//               </div>

//               <div className="rounded p-4">
//                 <h6 className="mb-2">View Group Tasks</h6>
//                 <div className="table-responsive">
//                   {groupTasks.length > 0 ? (
//                     <table className="table">
//                       <thead>
//                         <tr>
//                           <th scope="col">#</th>
//                           <th scope="col">Task Name</th>
//                           <th scope="col">Deadline</th>
//                           <th scope="col">Priority</th>
//                           <th scope="col">Description</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {groupTasks.map((data, index) => (
//                           <tr key={index}>
//                             <th scope="row">{index + 1}</th>
//                             <td>{data.taskname}</td>
//                             <td>{data.deadline}</td>
//                             <td>{data.priority}</td>
//                             <td>{data.description}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   ) : (
//                     <p>No group tasks available</p>
//                   )}
//                 </div>
//               </div>
//               <UserFeedback/>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Leadhome;
