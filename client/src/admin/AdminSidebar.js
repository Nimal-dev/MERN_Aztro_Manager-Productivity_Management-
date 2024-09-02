import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const [name, setName] = useState("");
  const [usertype, setUsertype] = useState(null);


  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));

    if (userdata && userdata._id) {
      setUsertype(userdata.userStatus);
      if (userdata.userStatus === 1) {
        setName(userdata.userid.name); // Set the statename for state user
      } else if (userdata.userStatus === 2) {
        setName(userdata.userid.name);
      } else {
        setName(`${userdata.userid.name}`); // Set the fullname for other users
      }
    }
  }, []);
  const getUsertypeLabel = () => {
    switch (usertype) {
      case 0:
        return "Admin";
      case 1:
        return "Staff";
      case 2:
        return "Team Lead";
      case 3:
        return "User";
      default:
        return "";
    }
  };

  const getUsertypeIcon = (usertype) => {
    switch (usertype) {
      case 0:
        return "fa-user-secret"; // Admin icon
      case 1:
        return "fa-user"; // State icon
      case 2:
        return "fa-user-circle"; // Entrepreneur icon
      case 3:
        return "fa-user-circle"; // User icon
      default:
        return "fa-user"; // Default icon
    }
  };

  const getDashboardLink = () => {
    switch (usertype) {
      case 0:
        return "/";
      case 1:
        return "/";
      case 2:
        return "/";
      case 3:
        return "/UserHome";
      default:
        return "/";
    }
  };
  return (
    <div className="sidebar pe-4 pb-3">
      <nav className="navbar bg-secondary navbar-dark">
        <a href="index.html" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary" style={{fontFamily:"serif"}}>Aztro Manager</h3>
        </a>
        <div className="d-flex align-items-center ms-5 mb-4">
          {/* <i className={`fa ${getUsertypeIcon(usertype)} fa-2x me-2`}></i> */}
          <div className="ms-0">
            <h6 className="mb-0">{name}</h6>
            <span>{getUsertypeLabel()}</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          {usertype === 0 && (
            <>
              <NavLink
                exact
                to={getDashboardLink()}
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-tachometer-alt me-2"></i>Dashboard
              </NavLink>

               <NavLink
                exact
                to="/addtask"
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-tasks me-2"></i>Add tasks
              </NavLink>

             <NavLink
                exact
                to="/AddGroup"
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-users me-2"></i>Add Groups
              </NavLink>
              <NavLink
                exact
                to="/AddMember"
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-user-plus me-2"></i>Add Members
              </NavLink>

              <NavLink
                exact
                to="/attendanceList"
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-calendar me-2"></i>Attendance
              </NavLink>
              <NavLink
                exact
                to="/AddTeamLead"
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-user-circle me-2"></i>Add Team Lead
              </NavLink>
              <NavLink
                exact
                to="/Feedbacks"
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-comments me-2"></i>Feedbacks
              </NavLink>
            </>
          )}
          {usertype === 1 && (
            <>
              <NavLink
                exact
                to={getDashboardLink()}
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-tachometer-alt me-2"></i>Dashboard
              </NavLink>
              
              <NavLink
                exact
                to="/attendance"
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-calendar me-2"></i>Attendance
              </NavLink>
            </>
          )}
          {usertype === 2 && (
            <>
              <NavLink
                exact
                to={getDashboardLink()}
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-tachometer-alt me-2"></i>Dashboard
              </NavLink>

              <NavLink
                exact
                to="/leadgrouptasks"
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-users me-2"></i>Group tasks
              </NavLink>

              <NavLink
                exact
                to="/TeamleadFeedbacks"
                className="nav-item nav-link"
                activeClassName="active"
              >
                <i className="fa fa-comments me-2"></i>Feedbacks
              </NavLink>

             
            </>
          )}
         
        </div>
      </nav>
    </div>
    // <div style={{ width: "200px" }}>
    //   {/* Sidebar */}
    //   <nav
    //     id="sidebarMenu"
    //     className="collapse d-lg-block sidebar collapse bg-white"
    //   >
    //     <div className="position-sticky">
    //       <div className="list-group list-group-flush mx-3 mt-4">
    //         <a
    //           href="/viewtask"
    //           className="list-group-item list-group-item-action py-2 ripple"
    //           aria-current="page"
    //         >
    //           <i className="fas fa-tachometer-alt fa-fw me-3"></i>
    //           <span>Assign tasks</span>
    //         </a>
    //         <a
    //           href="/viewuser"
    //           className="list-group-item list-group-item-action py-2 ripple "
    //         >
    //           <i className="fas fa-chart-area fa-fw me-3"></i>
    //           <span>View clients</span>
    //         </a>
    //         <a
    //           href="/group"
    //           className="list-group-item list-group-item-action py-2 ripple "
    //         >
    //           <i className="fas fa-chart-area fa-fw me-3"></i>
    //           <span>View Groups</span>
    //         </a>
    //       </div>
    //     </div>
    //   </nav>
    // </div>
  );
}

export default AdminSidebar;
