import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import AdminSidebar from "../admin/AdminSidebar";
import AdminHeader from "../admin/AdminHeader";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function Viewgrouptask() {
  const location = useLocation();
  const [groupTask, setGroupTask] = useState({});
  const [chartData, setChartData] = useState({});
  const [error, setError] = useState(null);
  const [completion, setCompletion] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const userId = location.state?.id;

    if (userId) {
      fetch("http://127.0.0.1:5000/user/completetask", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((result) => {
          setGroupTask(result);
          setCompletion(result.completionPercentage || 0);
          setIsComplete(result.status === 1);

          fetch("http://127.0.0.1:5000/user/getCompletedTasks", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error("Network response was not ok");
              }
              return res.json();
            })
            .then((data) => {
              if (data && Array.isArray(data)) {
                const taskNames = data.map((task) => task.taskname);
                const efficiencies = data.map((task) =>
                  task.efficiency === "Efficient" ? 1 : 0
                );

                setChartData({
                  labels: taskNames,
                  datasets: [
                    {
                      label: "Task Efficiency",
                      data: efficiencies,
                      backgroundColor: efficiencies.map((efficiency) =>
                        efficiency ? "green" : "red"
                      ),
                    },
                  ],
                });
              }
            })
            .catch((error) => {
              console.error("Error fetching completed tasks data:", error);
              setError("Failed to fetch completed tasks data.");
            });
        })
        .catch((error) => {
          console.error("Error fetching group task details:", error);
          setError("Failed to fetch group task details.");
        });
    }
  }, [location.state?.id]);

  const handleCompletionChange = (value) => {
    setCompletion(value);
    const status = value === 100 ? 1 : 0;

    fetch("http://127.0.0.1:5000/Admin/updateGroupTaskCompletion", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: location.state.id, completion: value, status }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((result) => {
        console.log("Task completion updated:", result);
        setIsComplete(status === 1);
      })
      .catch((error) => {
        console.error("Error updating task completion:", error);
        setError("Failed to update task completion.");
      });
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
                <h6 className="mb-4">Group Task Details</h6>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <th>Task</th>
                        <td>{groupTask.taskname}</td>
                      </tr>
                      <tr>
                        <th>Priority</th>
                        <td>{groupTask.priority}</td>
                      </tr>
                      <tr>
                        <th>Description</th>
                        <td>{groupTask.description}</td>
                      </tr>
                      {/* <tr>
                        <th>Members</th>
                        <td>{groupTask.map((members, context))}</td>
                      </tr> */}
                      <tr>
                        <th>Deadline</th>
                        <td>{new Date(groupTask.deadline).toLocaleDateString()}</td>
                      </tr>
                      <tr>
                        <th>Status</th>
                        <td>{isComplete ? "Completed" : "Not Completed"}</td>
                      </tr>
                      <tr>
                        <th>Completion</th>
                        <td>
                          <Slider
                            min={0}
                            max={100}
                            value={completion}
                            onChange={handleCompletionChange}
                            disabled={isComplete}
                          />
                          <span>{completion}%</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* <div>
                  <h6 className="mt-4">Task Efficiency</h6>
                  {chartData.labels ? (
                    <Bar data={chartData} />
                  ) : (
                    <p>Loading chart...</p>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Viewgrouptask;
