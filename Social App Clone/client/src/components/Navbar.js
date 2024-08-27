import React, { useCallback, useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import { userContext } from '../Context/userContext';



const Navbar = () => {
  const { user } = useContext(userContext);
  console.log(user);


  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    // Check if name is null or undefined
    if (name == null || typeof name !== 'string') {
      return null; // or return a default value, depending on your needs
    }

    // Remove leading and trailing whitespaces
    const trimmedName = name.trim();

    // Check if trimmedName has space
    const initials =
      trimmedName.includes(' ')
        ? `${trimmedName.split(' ')[0][0]}${trimmedName.split(' ')[1][0]}`
        : trimmedName[0];

    return {
      sx: {
        bgcolor: stringToColor(trimmedName),
      },
      children: initials,
    };
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
            </ul>
            {user ? <form className='d-flex align-items-center' >
              <a href='/' className="btn btn-outline-success" onClick={()=>{localStorage.removeItem("token")}}>Log Out</a>
              {user ? <Avatar {...stringAvatar(user ? user : "Anonymous User")} /> : ''}
            </form> : <form className='d-flex align-items-center'>
              <a href='/' className="btn btn-outline-success" >Sign In</a>
            </form>
            }
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
