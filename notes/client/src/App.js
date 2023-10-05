import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RoutesLayout from "./RoutesLayout";
import Home from "./Components/Home";
import Login from "./Components/Login";

const router = createBrowserRouter([
  {
    path : "/",
    element: <RoutesLayout/>,
    children:[
      {path:"", element:<Home/>},
      {path:"signin", element:<Login />}
    ]
  }
])
function App() {
  return <RouterProvider router = {router} />
}

export default App;
