import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!email) {
      formErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      formErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const loginForm = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let params = {
      email: email,
      password: password,
    };

    fetch('http://localhost:5000/Admin/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
    .then((res) => res.json())
    .then((userData) => {
     
      if (!userData.error) {
        localStorage.setItem("userdata", JSON.stringify(userData));
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1000);
      } else {
        setMessage(userData.error);
      }
    })
    .catch((error) => {
      console.error('Error during login:', error);
      setMessage('An error occurred. Please try again.');
    });
  };

  return (
    <div className="background">
      <div className="container-fluid">
        <div className="row h-100 align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 ">
            <div className="glassmorphic-card rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h3 className="text-primary">LOG IN!</h3>
           
              </div>
              {message && <div className="alert alert-danger">{message}</div>}
              <form onSubmit={loginForm}>
                <div className="form-floating mb-3">
                  <input
                  style={{background:"rgba( 255, 255, 250, 0.2 )", border:"1px solid black"}}
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInput" >Email address</label>
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className="form-floating mb-4">
                  <input
                  style={{background:"rgba( 255, 255, 255, 0.2 )", border:"1px solid black"}}
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>
                {/* <button type="submit" className="btn btn-primary py-3 w-100 mb-4">Sign In</button> */}
                <button type="submit" className="btn-new w-100 mb-4">Sign In</button>
              </form>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Don't have an account? <a href="/register" style={{color:"violet"}}>Register</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
