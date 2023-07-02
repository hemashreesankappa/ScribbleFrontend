import React, { useEffect, useContext } from "react";
import EntryLists from "./EntryLists";
import EntryFullItem from "./EntryFullItem";
import noteContext from "../context/NoteContext";
import Login from "./Login";

function AllEntries(props) {
  const context = useContext(noteContext);
  const { fetchNotes, display, noteItem } = context;

  // Fetch notes only if user is logged in. Show alert if no notes found
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      fetchNotes();
      // if (notes.length === 0) {
      //   props.showAlert("No records to display", "success");
      // }
    }
  }, [fetchNotes]);

  return (
    <>
      {/* grid items */}
      {localStorage.getItem("authToken") && (
        <div className="row mx-4 me-5 ">
          <div className="col-3 my-3 ">
            <EntryLists showAlert={props.showAlert} />
          </div>
          {display && (
            <div className="col">
              <EntryFullItem noteItem={noteItem} showAlert={props.showAlert} />
            </div>
          )}
        </div>
      )}
      {!localStorage.getItem("authToken") && (
        <Login showAlert={props.showAlert} />
      )}
    </>
  );
}

export default AllEntries;
