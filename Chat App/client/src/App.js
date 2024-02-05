import { useEffect, useState } from "react";
import { userContext } from "./Context/userContext"
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Loader from "./Components/loader/Loader";
import axios from "axios";
import Navbar from "./Components/navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";


function App() {
  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    loadUser();
  },[])


  function stopLoading(){
    setLoading(false);
  }

  async function loadUser(){
    let token = localStorage.getItem("token");
    if(!token){
      stopLoading();
      setUser(null);
      return;
    }
    let result = await axios.get("http://localhost:3345/user",{
      headers:{
        Authorization: `bearer ${token}`
      }
    })
    setUser(result.data.user);
    stopLoading()
  }

function ProtectRoute({negate,path}){
  let auth = user ? true:false;
  if(negate){
    auth = !auth;
  }
  return(auth?<Outlet />: <Navigate to={path?path:'/login'} />)
}

  return (
    <>
      <userContext.Provider value = {{user,setUser,loadUser}}>
        <BrowserRouter>
        <Navbar />
        <div className="container">
          {loading?<Loader/>:
          <Routes>
            <Route element={<ProtectRoute />}>
              <Route path="/" element={<Home />}/>
            </Route>
            <Route element={<ProtectRoute negate={true} path="/"/>}>
              <Route path="/login" element={<Signin />}/>
              <Route path="/register" element={<Signup />}/>
            </Route >
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
