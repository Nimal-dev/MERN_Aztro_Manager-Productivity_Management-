import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import 'chartjs-adapter-date-fns';
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { enUS } from 'date-fns/locale';
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import TaskCompletionGraph from "../user/TaskCompletionGraph";

// Register the necessary Chart.js components
ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Viewsingletask() {
  const location = useLocation();
  const [task, setTask] = useState({});
  const [efficiency, setEfficiency] = useState(null);

  useEffect(() => {
    let param = {
      id: location.state?.id,
    };

    fetch("http://127.0.0.1:5000/Admin/findsingletask", {
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
        calculateEfficiency(result.deadline, result.completedDate);
      });
  }, [location.state]);

  const calculateEfficiency = (deadline, completedDate) => {
    const deadlineDate = new Date(deadline).getTime();
    let efficiencyValue = 100;

    if (completedDate) {
      const completedDateTime = new Date(completedDate).getTime();
      const timeDiff = completedDateTime - deadlineDate;

      if (timeDiff > 0) {
        const daysLate = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        efficiencyValue = Math.max(100 - daysLate * 5, 0); // Decrease by 5% per day late
      }
    } else {
      // Calculate days past deadline if task is not completed
      const currentDate = new Date().getTime();
      const timeDiff = currentDate - deadlineDate;

      if (timeDiff > 0) {
        const daysLate = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        efficiencyValue = Math.max(100 - daysLate * 5, 0); // Decrease by 5% per day late
      }
    }

    setEfficiency(efficiencyValue);
  };

  const data = {
    labels: ["Deadline", "Completion Date"],
    datasets: [
      {
        label: "Task Dates",
        data: [
          { x: new Date(task.deadline).getTime(), y: 1 },
          task.completedDate
            ? { x: new Date(task.completedDate).getTime(), y: 1 }
            : null,
        ].filter(point => point !== null),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: 'MMM dd',
          },
        },
        title: {
          display: true,
          text: 'Date'
        },
        adapters: {
          date: {
            locale: enUS,
          },
        },
      },
      y: {
        display: false,
      },
    },
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
                <h6 className="mb-2">Assigned Tasks</h6>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Task</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Status</th>
                        <th scope="col">Completion (%)</th>
                        <th scope="col">Member Efficiency (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>{task.task}</td>
                        <td>{new Date(task.deadline).toDateString()}</td>
                        <td>{task.priority}</td>
                        <td>{task.status === 100 ? "Completed" : "Not Completed"}</td>
                        <td>{task.status}%</td>
                        <td>{efficiency !== null ? `${efficiency}%` : "Calculating..."}</td>
                      </tr>
                      <tr>
                        <td colSpan="7">
                          {task.completedDate && <Line data={data} options={options} />}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <TaskCompletionGraph taskId={location.state.id} deadline={task.deadline} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Viewsingletask;









// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Line } from "react-chartjs-2";
// import 'chartjs-adapter-date-fns'; // Ensure this import is added
// import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
// import { enUS } from 'date-fns/locale';
// import AdminHeader from "./AdminHeader";
// import AdminSidebar from "./AdminSidebar";
// import TaskCompletionGraph from "../user/TaskCompletionGraph";


// // Register the necessary Chart.js components
// ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// function Viewsingletask() {
//   const location = useLocation();
//   const [task, setTask] = useState({});
//   const [efficiency, setEfficiency] = useState(null);

//   useEffect(() => {
//     let param = {
//       id: location.state?.id,
//     };

//     fetch("http://127.0.0.1:5000/Admin/findsingletask", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(param),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         setTask(result);
//         setEfficiency(result.efficiency);
//         console.log(efficiency);
//       });
//   }, [location.state]);

//   const data = {
//     labels: ["Deadline", "Completion Date"],
//     datasets: [
//       {
//         label: "Task Dates",
//         data: [
//           { x: new Date(task.deadline).getTime(), y: 1 },
//           task.completedDate
//             ? { x: new Date(task.completedDate).getTime(), y: 1 }
//             : null,
//         ].filter(point => point !== null),
//         fill: false,
//         backgroundColor: "rgb(75, 192, 192)",
//         borderColor: "rgba(75, 192, 192, 0.2)",
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         type: "time",
//         time: {
//           unit: "day",
//           displayFormats: {
//             day: 'MMM dd',
//           },
//         },
//         title: {
//           display: true,
//           text: 'Date'
//         },
//         adapters: {
//           date: {
//             locale: enUS,
//           },
//         },
//       },
//       y: {
//         display: false,
//       },
//     },
//   };

//   return (
//     <>
//       <AdminSidebar />
//       <div className="content">
//         <AdminHeader />
//         <div className="container-fluid pt-4 px-4">
//           <div className="row g-4">
//             <div className="col-12">
//               <div className="bg-secondary rounded h-100 p-4">
//                 <h6 className="mb-2">Assigned Tasks</h6>
//                 <div className="table-responsive">
//                   <table className="table">
//                     <thead>
//                       <tr>
//                         <th scope="col">#</th>
//                         <th scope="col">Task</th>
//                         <th scope="col">Deadline</th>
//                         <th scope="col">Priority</th>
//                         <th scope="col">Status</th>
//                         <th scope="col">Completion (%)</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>1</td>
//                         <td>{task.task}</td>
//                         <td>{new Date(task.deadline).toDateString()}</td>
//                         <td>{task.priority}</td>
//                         <td>{task.status === 100 ? "Completed" : "Not Completed"}</td>
//                         <td>{task.status}%</td>
//                       </tr>
//                       <tr>
//                         <td colSpan="6">
//                           {task.completedDate && <Line data={data} options={options} />}
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                   <TaskCompletionGraph taskId={location.state.id} deadline={task.deadline} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Viewsingletask;
