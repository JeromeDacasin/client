import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import Books from "./pages/Books/Books";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import App from "./App";
import { PublicRoute } from "./utils/PublicRoute";
import Department from "./pages/Departments/Department";

const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: "/landing",
                element: <Landing/>
            },
            {
                element: <PublicRoute/>,
                children: [
                    {
                        path: "/login",
                        element: <Login/>
                    }
                ]
            },
            {
                element: <ProtectedRoutes/>,
                children: [
                    {
                        path: "/home",
                        element: <Home/>
                    },
                    {
                        path: "/books",
                        element: <Books/>,
                    },
                    {
                        path: "/departments",
                        element: <Department/>,
                    },
                    {
                        path: "/authors",
                        element: <Books/>,
                    },
                    {
                        path: "/students",
                        element: <Books/>,
                    },
                    {
                        path: "/teachers",
                        element: <Books/>,
                    },
                    {
                        path: "/publishers",
                        element: <Books/>,
                    },
                    {
                        path: "/fines",
                        element: <Books/>,
                    },
                     
                ]
            },
        ]
    },

    {
        path: "*",
        element: <NotFound/>
    },

])


export default router;