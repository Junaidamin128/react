import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import About from "./page/About";
import Home from "./page/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader/Loader";
import { userContext } from "./Context/userContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SignIn from "./components/SigninForm";
import SignUp from "./components/SignupForm";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadUser();
  },[])


  const stopLoading = () => {
    setLoading(false);
  }

  async function loadUser() {
    let token = localStorage.getItem("token");
    if (!token) {
      stopLoading();
      setUser(null);
      return;
    }
    let res = await axios.get("http://localhost:3345/user", {
      headers: {
        Authorization: `bearer ${token}`
      },
    });
    setUser(res.data.user);
    stopLoading();
  }


  function ProtectRoute({ negate, path }) {
    let auth = user ? true : false;
    if (negate) {
      auth = !auth;
    }
    return (auth ? <Outlet /> : <Navigate to={path ? path : "/login"} />)
  }



  return (
    <>
      <userContext.Provider value={{ user,setUser,loadUser }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            {loading ? <Loader /> :
              <Routes>
                <Route element={<ProtectRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                </Route>
                <Route element={<ProtectRoute path="/" negate={true} />}>
                  <Route path="/login" element={<SignIn />} />
                  <Route path="/registration" element={<SignUp />} />
                </Route>
              </Routes>
            }
          </div>
          <Footer />
        </BrowserRouter>
      </userContext.Provider>

    </>
  );
}

export default App;
