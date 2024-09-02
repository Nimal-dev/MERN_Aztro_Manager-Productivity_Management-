import React, { useState, useEffect } from "react";

const Attendance = ({ userid }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      const response = await fetch("http://localhost:5000/Admin/getAttendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid }),
      });

      const result = await response.json();
      setAttendanceData(result.attendance);
    };

    fetchAttendance();
  }, [userid]);

  return (
    
    <div className="attendance">
      <h2>Attendance Records</h2>
      <div className="table-responsive">
        {attendanceData.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{new Date(data.date).toLocaleDateString()}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No attendance records available</p>
        )}
      </div>
    </div>
  );
};

export default Attendance;
