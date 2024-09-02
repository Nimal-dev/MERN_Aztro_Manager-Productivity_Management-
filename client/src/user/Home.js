import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import AdminHeader from "../admin/AdminHeader";
import UserFeedback from "./UserFeedback";
import Attendance from "./Attendance";

function Home() {
  const [authenticated] = useState(JSON.parse(localStorage.getItem("userdata")));
  const [task, setTask] = useState([]);
  const [groupTasks, setGroupTasks] = useState([]);
  const [clockedIn, setClockedIn] = useState(false);
  const [message, setMessage] = useState("");

  const handleClockIn = async () => {
    const userid = authenticated._id;

    const response = await fetch("http://localhost:5000/Admin/markAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid, status: "Present" }),
    });

    const result = await response.json();
    if (result.success) {
      setMessage(result.message);
      setClockedIn(true);
      localStorage.setItem("lastClockInDate", new Date().toISOString());
    } else {
      setMessage(result.message);
    }
  };

  useEffect(() => {
    const checkClockedIn = async () => {
      const userid = authenticated._id;
      const lastClockInDate = localStorage.getItem("lastClockInDate");
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (lastClockInDate) {
        const lastClockIn = new Date(lastClockInDate);
        lastClockIn.setHours(0, 0, 0, 0);

        if (lastClockIn >= today) {
          setClockedIn(true);
          return;
        }
      }

      const response = await fetch("http://localhost:5000/Admin/checkAttendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid }),
      });

      const result = await response.json();
      setClockedIn(result.clockedIn);

      if (result.clockedIn) {
        localStorage.setItem("lastClockInDate", new Date().toISOString());
      }
    };

    checkClockedIn();

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

    let groupParam = {
      userid: authenticated._id,
    };

    fetch("http://localhost:5000/Admin/viewgrouptaskById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groupParam),
    })
      .then((res) => res.json())
      .then((result) => {
        setGroupTasks(result);
      })
      .catch((error) => console.error("Error fetching group tasks:", error));
  }, [authenticated]);

  return (
    <>
      <AdminSidebar />
      <div className="content">
        <AdminHeader />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-12">
              {!clockedIn && (
                <button className="btn btn-warning" onClick={handleClockIn}>
                  Clock In
                </button>
              )}
              {message && <p>{message}</p>}
              
              <div className="rounded p-4">
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
              </div>

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
              <UserFeedback />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;







// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import AdminSidebar from "../admin/AdminSidebar";
// import AdminHeader from "../admin/AdminHeader";
// import UserFeedback from "./UserFeedback";

// function Home() {
//   const [authenticated] = useState(JSON.parse(localStorage.getItem("userdata")));
//   const [task, setTask] = useState([]);
//   const [groupTasks, setGroupTasks] = useState([]);
//   const [clockedIn, setClockedIn] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleClockIn = async () => {
//     const userid = authenticated._id;

//     const response = await fetch("http://localhost:5000/Admin/markAttendance", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userid, status: "Present" }),
//     });

//     const result = await response.json();
//     if (result.success) {
//       setMessage(result.message);
//       setClockedIn(true);
//       localStorage.setItem("lastClockInDate", new Date().toISOString());
//     } else {
//       setMessage(result.message);
//     }
//   };

//   useEffect(() => {
//     const checkClockedIn = async () => {
//       const userid = authenticated._id;
//       const lastClockInDate = localStorage.getItem("lastClockInDate");
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);

//       if (lastClockInDate) {
//         const lastClockIn = new Date(lastClockInDate);
//         lastClockIn.setHours(0, 0, 0, 0);

//         if (lastClockIn >= today) {
//           setClockedIn(true);
//           return;
//         }
//       }

//       const response = await fetch("http://localhost:5000/Admin/checkAttendance", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userid }),
//       });

//       const result = await response.json();
//       setClockedIn(result.clockedIn);

//       if (result.clockedIn) {
//         localStorage.setItem("lastClockInDate", new Date().toISOString());
//       }
//     };

//     checkClockedIn();

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

//     let groupParam = {
//       userid: authenticated._id,
//     };

//     fetch("http://localhost:5000/Admin/viewgrouptaskById", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(groupParam),
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
//               {!clockedIn && (
//                 <button className="btn btn-warning" onClick={handleClockIn}>
//                   Clock In
//                 </button>
//               )}
//               {message && <p>{message}</p>}
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
//                             <td>{new Date (data.deadline).toLocaleDateString()}</td>
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
//                             <td>{new Date (data.deadline).toLocaleDateString()}</td>
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
//               <UserFeedback />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;
