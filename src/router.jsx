import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Books from "./pages/Books";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import App from "./App";
import { PublicRoute } from "./utils/PublicRoute";

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
                        // children: [{
                        //     path: "/books/:bookId",
                        //     element: <BookModal/>       
                        // }]
                    } 
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