import React from 'react';
import { NavLink } from 'react-router-dom';


function Home({ notes }) {
  // console.log("==================")
  // its loading 4 times why ?

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
                  <h5 className="card-title">{note.title}</h5>
                  <p className="card-text">{note.content}</p>
                  <a href="/" className="card-link">Edit</a>
                  <a href="/" className="card-link">Remove</a>
                </div>
              </div>

            )
          })}
        </div>
      }

    </>
  );
}

export default Home;
