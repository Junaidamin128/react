// import logo from './logo.svg';
import {
  Router,
  RouterProvider,
  Routes,
  Outlet,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Sharedlayout from "./Sharedlayout";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import User from "./components/User";
import Github, { githubInfoLoader } from "./components/Github";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Sharedlayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      {path:"user/:userid", element:<User />},
      {path:"github", element:<Github />, loader:githubInfoLoader},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
