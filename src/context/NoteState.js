import NoteContext from "./NoteContext";
import React, { useState } from "react";
// const host = process.env.REACT_APP_HOST_NAME;
// const port = process.env.REACT_APP_PORT_NO;
import { BASE_URL } from "../Services/helper";

function NoteState(props) {
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [display, setDisplay] = useState(false);
  const [noteItem, setNoteItem] = useState({
    id: "",
    text: "",
    mood: "",
  });

  //////////// ADD NEW NOTE ////////////
  const addNote = async function (text, mood) {
    try {
      const res = await fetch(`${BASE_URL}/api/note/add`, {
        method: "POST",
        body: JSON.stringify({
          text: text,
          mood: mood,
        }),
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authToken"),
        },
      });
      const result = await res.json();

      if (result.status === 200) {
        props.showAlert("Note saved successfuly!", "success", 2000);
      } else {
        props.showAlert(result.message, "danger", 2000);
      }
    } catch (err) {
      props.showAlert(err.message, "danger");
    }
  };

  //////////// FETCH ALL NOTES ////////////
  const fetchNotes = async function () {
    try {
      const res = await fetch(`${BASE_URL}/api/note/fetchNotes`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (result.status === 200) {
        setNotes(result.notes);
      } else {
        props.showAlert(result.message, "danger", 2000);
      }
    } catch (err) {
      props.showAlert(err.message, "danger");
    }
  };

  //////////// DELETE NOTE ////////////
  const deleteNote = async function (id) {
    try {
      const res = await fetch(`${BASE_URL}/api/note/deleteNote/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (result.status === 200) {
        props.showAlert(result.message, "success", 2000);
        fetchNotes();
      } else {
        props.showAlert(result.message, "danger", 2000);
      }
    } catch (err) {
      props.showAlert(err.message, "danger");
    }
  };

  //////////// UPDATE NOTE ////////////
  const updateNote = async function (id, text) {
    try {
      const res = await fetch(`${BASE_URL}/api/note/updateNote/${id}`, {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eText: text,
        }),
      });
      const result = await res.json();
      if (result.status === 200) {
        props.showAlert(result.message, "success", 2000);
        fetchNotes();
      } else {
        props.showAlert(result.message, "danger", 2000);
      }
    } catch (err) {
      props.showAlert(err.message, "danger");
    }
  };

  return (
    <div>
      <NoteContext.Provider
        value={{
          notes,
          display,
          setDisplay,
          noteItem,
          setNoteItem,
          addNote,
          fetchNotes,
          deleteNote,
          updateNote,
        }}
      >
        {props.children}
      </NoteContext.Provider>
    </div>
  );
}

export default NoteState;
