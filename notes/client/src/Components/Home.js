import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


function Home({ loadNote }) {
  // console.log("==================")
  // its loading 4 times why ?
  const [notes, setNotes] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null)
  const navigate = useNavigate();


  useEffect(() => {
    loadNotes()
  }, [])

  const loadNotes = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      setNotes(null);
      return;
    }
    let res = await axios.get("http://localhost:3345/note", {
      headers: {
        Authorization: `bearer ${token}`
      }
    })
    setNotes(res.data);
  }

  const deleteNote = async (id)=>{
    try{
      await axios.delete(`http://localhost:3345/delete/${id}`);
    }catch(err){
      console.log(err)
    }
  }



  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1> All Notes </h1>
        <NavLink className="btn btn-success addNote" to="/addnote">Add New Note</NavLink>
      </div>
      {!notes ? <h2>No Notes Aavailable</h2> :
        <div className="card-wrapper row justify-content-center">
          {notes.map((note, index) => {
            return (
              <div className="card m-2" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h5 className="card-title" onClick={async () => { await loadNote(note._id); navigate(`/note/${note._id}`) }}>{note.title}</h5>
                  <p className="card-text">{note.content}</p>
                  <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#editNote" onClick={() => { setSelectedNote(note) }}>
                    Remove
                  </button>
                </div>
              </div>

            )
          })}
          {selectedNote ? <div className="modal fade" id="editNote" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">{selectedNote.title}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  Do you really want to delete {selectedNote.title}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-danger" onClick={()=>{deleteNote(selectedNote._id)}}>Delete Note</button>
                </div>
              </div>
            </div>
          </div> : ""}

        </div>
      }

    </>
  );
}

export default Home;
