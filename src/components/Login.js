import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Services/helper";

function Login(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const result = await res.json();
      if (result.statusCode === 200) {
        props.showAlert("Login successful!", "success", 2000);
        localStorage.setItem("authToken", result.authToken);
        navigate("/");
      } else {
        props.showAlert(result.message, "danger", 2000);
      }
    } catch (err) {
      props.showAlert(err.message, "danger", 2000);
    }
  };

  return (
    <div className="container d-flex align-items-center">
      <img
        src={require("../images/login.png")}
        alt={"hero"}
        height={"700px"}
        width={"800px"}
      />

      <div
        className="container border py-5 px-4"
        style={{ borderRadius: "10px" }}
      >
        <h1
          className="mb-5 color"
          style={{ fontFamily: "Rubik", fontWeight: "600" }}
        >
          Scribble
        </h1>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            name="email"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlTextarea1"
            name="password"
            onChange={onChange}
          ></input>
        </div>
        <button className="btn btn-success" onClick={handleLogin}>
          Login
        </button>
        <p className="mt-4" style={{ fontSize: "14px" }}>
          No account yet?{" "}
          <Link to="/signup" className="color">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
