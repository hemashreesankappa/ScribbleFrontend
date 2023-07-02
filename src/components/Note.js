import React, { useContext, useState } from "react";
import noteContext from "../context/NoteContext";

function Note(props) {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [noteText, setNotetext] = useState("");
  const [moodNo, setMoodNo] = useState("");
  const [moodState, setmoodState] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    setNotetext(e.target.value);
  };

  // Save notes
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(noteText, moodNo);

    setNotetext("");
    setMoodNo("");
    setmoodState(false);
  };

  const addMood = (e) => {
    const iconNo = e.target.getAttribute("data");
    if (iconNo === moodNo || moodState === false) {
      setMoodNo(iconNo);

      e.target.classList.toggle("fa-solid");
      if (e.target.classList.contains("fa-solid")) {
        setmoodState(true);
      } else {
        setmoodState(false);
        setMoodNo(null);
      }
    }
  };

  // Format date
  function getdate() {
    const date = new Date();
    return `${date.toLocaleString("default", {
      weekday: "long",
    })}, ${date.toLocaleString("default", {
      month: "short",
    })} ${date.getDate()}, ${date.getFullYear()}`;
  }
  return (
    <div>
      <div className="container mb-3 " style={{ marginTop: "64px" }}>
        <div className="container d-flex justify-content-between align-items-end my-2">
          <h2
            className="color "
            style={{ fontSize: "24px", fontWeight: "500" }}
          >
            {getdate()}
          </h2>
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
        <textarea
          className="form-control"
          id="noteText"
          rows="15"
          name="noteText"
          placeholder="Your thoughts..."
          value={noteText}
          onChange={onChange}
          style={{ border: "1px solid #289204" }}
        ></textarea>
        <h2 className="mt-5" style={{ fontSize: "24px", color: "#444" }}>
          How are you feeling?
        </h2>
        <div className="container">
          <span className="color">
            <i
              id="icon"
              className="fa-regular fa-face-laugh-beam  fa-5x me-2 my-2"
              data="laugh"
              onClick={addMood}
            ></i>
          </span>
          <span className="color">
            <i
              id="icon"
              className="fa-regular fa-face-smile fa-5x mx-2 my-2"
              data="smile"
              onClick={addMood}
            ></i>
          </span>
          <span className="color">
            <i
              id="icon"
              className="fa-regular fa-face-sad-tear fa-5x mx-2 my-2"
              data="sad-tear"
              onClick={addMood}
            ></i>
          </span>
          <span className="color">
            <i
              id="icon"
              className="fa-regular fa-face-angry fa-5x mx-2 my-2"
              data="angry"
              onClick={addMood}
            ></i>
          </span>
          <span className="color">
            <i
              id="icon"
              className="fa-regular fa-face-meh fa-5x mx-2 my-2"
              data="meh"
              onClick={addMood}
            ></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Note;
