import React, { useState } from "react";
import "./logincomponent.css";
import { getMapping, putMapping, deleteMapping, postMapping, postMappingLogin } from "./Config";

const LoginComponent = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
 let data= postMappingLogin({ url: "adminLogin", body: { email, password } });

  if(data){
    window.location.href="/customer";
  }
  };
  return (
    <div className="container">
      <div className="text-center">
        <h1>Login Page</h1>
        <form className="login-form">
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default LoginComponent;
