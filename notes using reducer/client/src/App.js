import axios from "axios";
import { useEffect, useState, useReducer } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import AddNote from "./Components/AddNote";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Note from "./Components/Note";
import Register from "./Components/Register";
import User from "./Components/User";
import Loader from "./Components/small/Loader";
import { loadNotes, deleteNote } from './fns.js'



function noteReducer(state, action) {
  switch (action.type) {
    case "ADD_NOTE":
      return [...state, action.note];
    case "DELETE_NOTE":
      console.log(state, action)
      return state.filter(note => note._id !== action.id);
    case "UPDATE_NOTE":
      return state.map(note => {
        if (note.id === action.note.id) {
          return action.note;
        }
        return note;
      });
    case "SET_NOTES":
      return action.notes;
    default:
      return state;
  }
}

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState(null);

  const [notes, dispatch] = useReducer(noteReducer, null);


  useEffect(() => {
    console.log("USING EFFFECT");
    loadNotes(dispatch);
  }, []);





  useEffect(() => {
    loadUser();
  }, []);


  const loadNote = async (id) => {
    try {
      let res = await axios.get(`http://localhost:3345/note/${id}`);
      setNote(res.data)
      stopLoading();
    } catch (err) {
      console.log(err)
    }
  }


  const loadUser = async () => {
    let token = localStorage.getItem("token");
    if (!token) {
      stopLoading();
      setUser(null);
      return;
    }
    let res = await axios.get("http://localhost:3345/user", {
      headers: {
        Authorization: `bearer ${token}`
      }
    });
    setUser(res.data.user)
    stopLoading();

  }


  function stopLoading() {
    setLoading(false);
  }

  function ProtectRoute({ negate, path }) {
    let auth = user ? true : false;
    if (negate) {
      auth = !auth;
    }
    return (auth ? <Outlet /> : <Navigate to={path ? path : "/login"} />);
  }

  return (
    <>
      <BrowserRouter>
        {/* Navbar */}
        <Navbar user={user} setUser={setUser} />
        {/* Routes */}
        <div className="container">
          {/* Routes */}
          {loading ? <Loader /> :
            <Routes>
              {/* Protected */}
              <Route element={<ProtectRoute />}>
                <Route path="/" element={<Home notes={notes} dispatch={dispatch} deleteNote={deleteNote} loadNote={loadNote} />} />
                <Route path="/user" element={<User />} />
                <Route path="/addnote" element={<AddNote />} />
                <Route path="/note/:id" element={<Note note={note} loadNote={loadNote} />} />
              </Route>
              {/* Must be not login */}
              <Route element={<ProtectRoute path="/" negate={true} />}>
                <Route path="login" element={<Login loadUser={loadUser} />} />
                <Route path="signup" element={<Register loadUser={loadUser} />} />
              </Route>
              {/* Unprotected Routes */}
            </Routes>
          }
          {/* Routes */}
        </div>
      </BrowserRouter>
    </>
  )
}

export default App;
