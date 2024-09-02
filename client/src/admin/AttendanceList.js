import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

function AttendanceList() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      const response = await fetch('http://localhost:5000/Admin/getAllAttendance');
      const result = await response.json();
      setAttendanceData(result.attendanceRecords);
    };

    fetchAttendanceData();
  }, []);

  return (
    <>
      <AdminSidebar />
      <div className="content">
        <AdminHeader />
        <div className="col-12">
          <div className="rounded h-100 p-4">
            <h6 className="mb-2">Employee Attendance List</h6>
            <div className="table-responsive">
              {attendanceData.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((record, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{record.userid.userid.name}</td>
                        <td>{new Date(record.date).toLocaleDateString()}</td>
                        <td>{record.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center">No attendance records available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AttendanceList;




// import React, { useState, useEffect } from 'react';
// import AdminSidebar from './AdminSidebar';
// import AdminHeader from './AdminHeader';


// function AttendanceList() {
//   const [attendanceData, setAttendanceData] = useState([]);

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/Admin/getAllAttendance');
//         const result = await response.json();
//         setAttendanceData(result.attendanceRecords || []);
//       } catch (error) {
//         console.error('Error fetching attendance data:', error);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   const renderStatusIcon = (status) => {
//     switch (status) {
//       case 'Holiday':
//         return <i className="fas fa-star" style={{ color: 'gold' }}></i>;
//       case 'Day Off':
//         return <i className="fas fa-calendar-day" style={{ color: 'red' }}></i>;
//       case 'Present':
//         return <i className="fas fa-check" style={{ color: 'blue' }}></i>;
//       case 'Half Day':
//         return <i className="fas fa-star-half-alt" style={{ color: 'red' }}></i>;
//       case 'Late':
//         return <i className="fas fa-info-circle" style={{ color: 'blue' }}></i>;
//       case 'Absent':
//         return <i className="fas fa-times" style={{ color: 'gray' }}></i>;
//       case 'On Leave':
//         return <i className="fas fa-plane-departure" style={{ color: 'red' }}></i>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <AdminSidebar />
//       <div className="content">
//         <AdminHeader />
//         <div className="col-12">
//           <div className="rounded h-100 p-4">
//             <h6 className="mb-2">Employee Attendance List</h6>
//             <div className="table-responsive">
//               {attendanceData.length > 0 ? (
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th scope="col">Employee</th>
//                       {[...Array(31).keys()].map(day => (
//                         <th key={day} scope="col">{day + 1}</th>
//                       ))}
//                       <th scope="col">Total</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {attendanceData.map((record, index) => (
//                       <tr key={index}>
//                         <td>
//                           {record.userid && record.userid.userid && (
//                             <>
//                               <img src={record.userid.userid.profilePicture} alt="Profile" className="profile-picture" />
//                               <div>{record.userid.userid.name}</div>
//                               <div>{record.userid.userid.role}</div>
//                             </>
//                           )}
//                         </td>
//                         {record.attendance ? (
//                           record.attendance.map((day, idx) => (
//                             <td key={idx}>{renderStatusIcon(day.status)}</td>
//                           ))
//                         ) : (
//                           <td colSpan="31">No data</td>
//                         )}
//                         <td>{record.totalPresent} / 31</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <div className="text-center">No attendance records available</div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default AttendanceList;
