import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminHome from "./admin/AdminHome";
import ViewUser from "./admin/ViewUsers";
import AddTask from "./admin/AddTask";
import ViewTask from "./admin/ViewTasks";
import EditTask from "./admin/EditTask";
import Home from "./user/Home";
import Completetask from "./user/Completetask";
import Updatesingletask from "./user/Updatesingletask";
import Group from "./admin/Group";
import Viewgrouptask from "./admin/Viewgrouptask";
import Editgrouptask from "./admin/Editgrouptask";
import Viewsingletask from "./admin/Viewsingletask";
import AddGroup from "./admin/AddGroup";
import AddMembers from "./admin/AddMembers";
import Feedbacks from "./admin/Feedbacks";
import AddTeamLeader from "./admin/AddTeamLeader";
import Leadhome from "./teamLead/Leadhome";
import Attendance from "./user/Attendance";
import AttendancePage from "./user/AttendancePage";
import AttendanceList from "./admin/AttendanceList";
import LeadGroupTask from "./teamLead/LeadGroupTask";

function App() {
  const [auth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

  return (
    <BrowserRouter>
      {auth === null ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : auth.userStatus === 0 ? (
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/attendanceList" element={<AttendanceList />} />
          <Route path="/viewuser" element={<ViewUser />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/viewtask" element={<ViewTask />} />
          <Route path="/updatetask" element={<EditTask />} />
          <Route path="/group" element={<Group />} />
          <Route path="/viewgrouptask" element={<Viewgrouptask />} />
          <Route path="/viewsingletask" element={<Viewsingletask />} />
          <Route path="/editgrouptask" element={<Editgrouptask />} />
          <Route path="/AddGroup" element={<AddGroup />} />
          <Route path="/AddMember" element={<AddMembers />} />
          <Route path="/AddTeamLead" element={<AddTeamLeader />} />
          <Route path="/Feedbacks" element={<Feedbacks/>} />
        </Routes>
      ) : auth.userStatus === 1 ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/completetask" element={<Completetask />} />
          <Route path="/updatesingletask" element={<Updatesingletask />} />
        </Routes>
      ) :auth.userStatus === 2 ? (
        <Routes>
          <Route path="/" element={<Leadhome />} />
          <Route path="/completetask" element={<Completetask />} />
          <Route path="/updatesingletask" element={<Updatesingletask />} />

          <Route path="/viewgrouptask" element={<Viewgrouptask />} />          
          <Route path="/leadgrouptasks" element={<LeadGroupTask />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
