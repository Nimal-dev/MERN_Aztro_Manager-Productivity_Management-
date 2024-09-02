import React, { useEffect, useRef, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import ViewUser from "./ViewUsers";
import ViewTask from "./ViewTasks";
import Group from "./Group";
import Chart from 'chart.js/auto'; // Import Chart.js

function AdminHome() {
  const chartRef = useRef(null); // Ref to store the chart instance
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/Admin/viewtask")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setTasks(result.tasklist);
      })
      .catch((error) => console.error("Error fetching task data:", error));
  }, []);

  useEffect(() => {
    // Destroy existing chart if present
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Process the task data to count completed and not completed tasks
    const completedTasks = tasks.filter(task => task.status === 100).length;
    const notCompletedTasks = tasks.length - completedTasks;

    // Chart.js initialization code
    const ctx6 = document.getElementById('doughnut-chart').getContext('2d');
    chartRef.current = new Chart(ctx6, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Not Completed'],
        datasets: [{
          backgroundColor: [
            'rgb(5, 127, 63)', // Green for completed
            'rgb(5, 28, 63)'   // Dark Blue for not completed
          ],
          data: [completedTasks, notCompletedTasks]
        }]
      },
      options: {
        responsive: true
      }
    });

    return () => {
      // Cleanup chart instance on component unmount
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [tasks]); // Depend on `tasks` to re-render the chart when tasks change

  return (
    <>
      <AdminSidebar />
      <div className="content">
        <AdminHeader />
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <ViewUser />
            <div className="col-sm-12 col-xl-4">
              <div className="rounded h-100 p-4">
                <h6 className="mb-4">Tasks</h6>
                <p>Total Tasks Assigned: {tasks.length}</p>
                <canvas id="doughnut-chart"></canvas>
              </div>
            </div>
            <ViewTask />
            <Group />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
