import React, { useContext } from "react";
import EntryListItem from "./EntryListItem";
import noteContext from "../context/NoteContext";

// Display all the notes of user
function EntryLists(props) {
  const context = useContext(noteContext);
  const { notes } = context;

  // eslint-disable-next-line

  return notes.map((note) => {
    return <EntryListItem key={note._id} note={note} />;
  });
}

export default EntryLists;
