import React, {useState} from 'react'
import AdminSidebar from '../admin/AdminSidebar';
import AdminHeader from '../admin/AdminHeader';
import Attendance from './Attendance';

function AttendancePage() {
    const [authenticated] = useState(JSON.parse(localStorage.getItem("userdata")));
  return (
    <>
      <AdminSidebar />
      <div className="content">
        <AdminHeader />

        <Attendance userid={authenticated._id} />
        </div>
        
    </>
  )
}

export default AttendancePage;