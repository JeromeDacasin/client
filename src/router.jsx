import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Home from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/landing",
        element: <Landing/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/home",
        element: <Home/>
    },
    {
        path: "*",
        element: <NotFound />
    }
])


export default router;