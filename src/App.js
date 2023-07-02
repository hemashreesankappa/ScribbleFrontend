import "./App.css";
import AllEntries from "./components/AllEntries";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import NoteState from "./context/NoteState";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type, duration) => {
    setAlert({
      type: type,
      message: message,
    });

    if (duration !== 0) {
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };
  return (
    <>
      <BrowserRouter>
        <NoteState showAlert={showAlert}>
          <NavBar />
          <Alert alert={alert} />
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert} />}></Route>
            <Route
              path="/allEntries"
              element={<AllEntries showAlert={showAlert} />}
            ></Route>
            <Route
              path="/login"
              element={<Login showAlert={showAlert} />}
            ></Route>
            <Route
              path="/signup"
              element={<SignUp showAlert={showAlert} />}
            ></Route>
          </Routes>
        </NoteState>
      </BrowserRouter>
    </>
  );
}

export default App;
