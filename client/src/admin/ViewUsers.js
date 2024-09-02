import React, { useEffect, useState } from "react";

function ViewUser() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/Admin/viewUser")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUserData(result);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const deleteUser = (id) => {
    fetch("http://localhost:5000/Admin/deleteUser", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUserData(userData.filter((user) => user._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const getRole = (userStatus) => {
    switch (userStatus) {
      case 0:
        return "Admin";
      case 1:
        return "Member";
      case 2:
        return "Team Lead";
      default:
        return "Unknown";
    }
  };

  return (
    <>
      <div className="col-12">
        <div className="rounded h-100 p-4">
          <h6 className="mb-2">EMPLOYEE LISTS</h6>
          <div className="table-responsive">
            {userData.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((userDt, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{userDt.userid.name}</td>
                      <td>{getRole(userDt.userStatus)}</td>
                      <td>
                        <a href="#" onClick={() => deleteUser(userDt._id)}>
                          <i
                            className="fa fa-trash"
                            style={{ color: "grey" }}
                            aria-hidden="true"
                          ></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center">No employees added</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewUser;
