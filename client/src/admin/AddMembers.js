import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

function AddMembers() {
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!name) {
      formErrors.name = 'Name is required';
      isValid = false;
    }

    if (!qualification) {
      formErrors.qualification = 'Qualification is required';
      isValid = false;
    }

    if (!email) {
      formErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      formErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const registerForm = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let params = {
      name: name,
      qualification: qualification,
      email: email,
      password: password,
      userStatus: 1,
    };

    fetch('http://localhost:5000/Admin/adduser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result === "success") {
          setMessage('Member added successfully.');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          setMessage(result.error || 'An unexpected error occurred. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error during registration:', error);
        setMessage('An error occurred. Please try again.');
      });
  };

  return (
    <>
      <AdminSidebar />
      <div className="content">
        <AdminHeader />
        <div className="container-fluid">
          <div
            className="row h-100 align-items-center justify-content-center"
            style={{ minHeight: '100vh' }}
          >
            <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-6 ">
              <div className="rounded p-4 p-sm-5 my-4 mx-3">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h3 className="text-primary">Add Members</h3>
                </div>
                {message && <div className="alert alert-success">{message}</div>}
                <form onSubmit={registerForm}>
                  <div className="form-floating mb-3">
                    <input
                      style={{
                        background: 'rgba(255, 255, 250, 0.2)',
                        border: '1px solid black',
                      }}
                      type="text"
                      className="form-control"
                      id="floatingName"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="floatingName">Name</label>
                    {errors.name && <small className="text-danger">{errors.name}</small>}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      style={{
                        background: 'rgba(255, 255, 250, 0.2)',
                        border: '1px solid black',
                      }}
                      type="text"
                      className="form-control"
                      id="floatingQualification"
                      placeholder="Qualification"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                    />
                    <label htmlFor="floatingQualification">Qualification</label>
                    {errors.qualification && (
                      <small className="text-danger">{errors.qualification}</small>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      style={{
                        background: 'rgba(255, 255, 250, 0.2)',
                        border: '1px solid black',
                      }}
                      type="email"
                      className="form-control"
                      id="floatingEmail"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingEmail">Email address</label>
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                  </div>
                  <div className="form-floating mb-4">
                    <input
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '1px solid black',
                      }}
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    {errors.password && (
                      <small className="text-danger">{errors.password}</small>
                    )}
                  </div>
                  <button type="submit" className="btn-new w-100 mb-4">
                    Add Members
                  </button>
                </form>
                {message && <div className={`alert ${message === 'Member added successfully.' ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMembers;
