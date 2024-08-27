import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const navigation = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">Navbar</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
             </li>
            </ul>
            <form className="d-flex">
              {user && user.username}
              {user ?
                <a href = "/" className="btn btn-success" onClick={() => {
                  localStorage.removeItem("token");
                  navigation("/");
                  setUser(null);
                }} >Logout</a> :
                <NavLink className="btn btn-success" type="submit" to="/login" >Login</NavLink>}
            </form>
          </div>
        </div>
      </nav >
    </>
  );
}

export default Navbar;
