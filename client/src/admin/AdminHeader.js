import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHeader() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [usertype, setUsertype] = useState(null);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    if (userdata && userdata._id) {
      setUsertype(userdata.userStatus);
      if (userdata.userStatus === 1) {
        setName(userdata.userid.name);
      } else if (userdata.userStatus === 2) {
        setName(userdata.userid.name);
      } else {
        setName(`${userdata.userid.name}`);
      }
    }
  }, []);

  const handleLogout = () => {
    navigate("/")
    localStorage.clear();
    window.location.reload();

    
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark  sticky-top px-4 py-0 w-100" style={{borderBottom:"1px solid rgba(255, 255, 255, 0.24)", backgroundColor:"#181C34"}}>
    <h6>Dashboard</h6>
    <div className="navbar-nav align-items-center ms-auto">
      </div>
          <a href="#" onClick={handleLogout} style={{color:"white",fontFamily:'inherit', padding:"10px  "}}> LogOut <i className="fa fa-power-off me-2"></i></a>
  
  </nav>
  );
}

export default AdminHeader;
