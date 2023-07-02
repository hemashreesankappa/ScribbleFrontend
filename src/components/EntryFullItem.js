import React, { useContext, useState, useRef } from "react";
import noteContext from "../context/NoteContext";

function EntryFullItem(props) {
  const { noteItem } = props;
  const context = useContext(noteContext);
  const { deleteNote, updateNote, setNoteItem } = context;
  const [enote, setENote] = useState({
    eId: "",
    eText: "",
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const handleChange = (e) => {
    setENote({ ...enote, [e.target.name]: e.target.value });
  };

  const handleDelete = () => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (isConfirm) {
      deleteNote(noteItem.id);
      setNoteItem({
        id: "",
        text: "",
        mood: "",
      });
    }
  };

  const handleEdit = () => {
    // Open modal window to edit note
    ref.current.click();
    setENote({
      eId: noteItem.id,
      eText: noteItem.text,
    });
  };

  const saveUpdate = () => {
    updateNote(enote.eId, enote.eText);
    setNoteItem({
      id: enote.eId,
      text: enote.eText,
      mood: noteItem.mood,
    });
    // close mdal window after edit
    refClose.current.click();
    props.showAlert("Note updated successfuly!", "success");
  };

  return (
    <div>
      <div className="container">
        {/* <!-- Button trigger modal --> */}
        <div>
          <button
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            ref={ref}
          >
            Launch demo modal
          </button>

          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Edit Notes
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <textarea
                    className="form-control"
                    id="noteText"
                    rows="10"
                    name="eText"
                    value={enote.eText}
                    onChange={handleChange}
                    style={{ border: "1px solid #289204" }}
                    required
                  >
                    {enote.eText}
                  </textarea>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={refClose}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={saveUpdate}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full item */}
      <div className="my-3 ">
        <div
          className="container"
          style={{
            border: "1px solid #289204",
            height: "75vh",
            borderRadius: "8px",
          }}
        >
          <p className="my-2"> {noteItem.text}</p>
        </div>
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end me-3">
        <button
          className="btn btn-success me-md-2"
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button className="btn btn-success " type="button" onClick={handleEdit}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default EntryFullItem;
