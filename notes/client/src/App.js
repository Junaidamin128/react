import { BrowserRouter, Navigate, Outlet, Route, RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import RoutesLayout from "./RoutesLayout";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import User from "./Components/User";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import axios from "axios";
import Loader from "./Components/small/Loader";

function App() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  function tickIt() {
    setTick(tick + 1);
  }

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
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
                <Route path="/" element={<Home />} />
                <Route path="/user" element={<User />} />
              </Route>
              {/* Must be not login */}
              <Route element={<ProtectRoute path="/" negate={true} />}>
                <Route path="login" element={<Login loadUser={loadUser} />} />
                <Route path="signup" element={<Register />}/>
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
