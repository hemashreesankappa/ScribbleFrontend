import React from "react";
import Note from "./Note";
import Login from "./Login";

function Home(props) {
  return (
    <>
      {localStorage.getItem("authToken") && (
        <div className="container">
          <Note showAlert={props.showAlert} />
        </div>
      )}
      {!localStorage.getItem("authToken") && (
        <Login showAlert={props.showAlert} />
      )}
    </>
  );
}

export default Home;
