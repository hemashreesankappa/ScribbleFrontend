import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Services/helper";

function SignUp(props) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  let navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          confirmPassword: credentials.cPassword,
        }),
      });

      const result = await res.json();
      if (result.statusCode === 200) {
        props.showAlert("Accound created successfuly!", "success", 2000);

        navigate("/login");
      } else {
        props.showAlert(result.message, "danger", 2000);
      }
    } catch (err) {
      props.showAlert(err.message, "danger");
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
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlTextarea1"
            name="name"
            onChange={onChange}
          ></input>
        </div>
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
          <label htmlFor="exampleFormControlTextarea2" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlTextarea3"
            name="password"
            onChange={onChange}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlTextarea2"
            name="cPassword"
            onChange={onChange}
          ></input>
        </div>
        <button className="btn btn-success" onClick={handleSignUp}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default SignUp;
