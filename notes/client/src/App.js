import { BrowserRouter, Navigate, Outlet, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import RoutesLayout from "./RoutesLayout";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import User from "./Components/User";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import axios from "axios";

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
let dots = 100;

  useEffect(() => {
    async function loadUser() {
      let token = localStorage.getItem("token");
      if (!token) {
        stopLoading();
        setUser(null);
        return;
      }
      let res = await axios.get("http://localhost:3345/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(res.data.user);
      stopLoading();
    }

    loadUser();
  }, []);

  function stopLoading()
  {
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
        <Navbar user={user} />
        {/* Routes */}
        <div className="container">
          {/* Routes */}
          {loading ? <h1>Loading{".".repeat(dots)}</h1> :
            <Routes>
              {/* Protected */}
              <Route element={<ProtectRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<User />} />
              </Route>
              {/* Must be not login */}
              <Route element={<ProtectRoute path="/" negate={true} />}>
                <Route path="login" element={<Login />} />
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
