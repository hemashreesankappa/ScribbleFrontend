import React, { useContext } from "react";
import noteContext from "../context/NoteContext";

function EntryListItem(props) {
  const { note } = props;
  const context = useContext(noteContext);
  const { setDisplay, noteItem, setNoteItem } = context;

  // Format date
  function getdate() {
    const date = new Date(note.createdAt);

    return ` ${date.toLocaleString("default", {
      month: "short",
    })} ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${
      date.getMinutes() < 10 ? `0` + date.getMinutes() : date.getMinutes()
    }`;
  }

  // Display complete note on clicking the note item in the list
  const displayNote = () => {
    setDisplay(true);
    setNoteItem({
      ...noteItem,
      id: note._id,
      text: note.text,
      mood: note.mood,
    });
  };

  return (
    <>
      <div>
        <div
          className="card "
          style={{
            maxWidth: "440px",
            border: "none",
            backgroundColor: "#ebfbee",
            cursor: "pointer",
          }}
          onClick={displayNote}
        >
          <div className="row g-0">
            <div className="col-1  my-4 mx-3">
              <i
                id="icon"
                className={`fa-regular fa-face-${note.mood} fa-2xl color`}
              ></i>
            </div>
            <div className="col-10">
              <div className="card-body">
                <h5 className="card-title color">{getdate()}</h5>
                <p className="card-text">{note.text.slice(0, 20)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EntryListItem;
