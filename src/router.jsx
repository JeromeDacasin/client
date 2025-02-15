import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Home from "./pages/Home/Home";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import App from "./App";
import { PublicRoute } from "./utils/PublicRoute";
import DepartmentPage from "./pages/Departments/DepartmentPage";
import AuthorsPage from "./pages/Authors/AuthorsPage";
import PublisherPage from "./pages/Publishers/PublisherPage";
import UsersPage from "./pages/Users/UsersPage";
import PenaltyPage from "./pages/Penalties/PenaltyPage";
import BorrowedBooksPage from "./pages/BorrowedBooks/BorrowedBooksPage";
import BookPage from "./pages/Books/BookPage";
import RolePage from "./pages/Roles/RolePage";
import MyBooksPage from "./pages/MyBooks/MyBooks";

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
                        element: <BookPage/>,
                    },
                    {
                        path: "/departments",
                        element: <DepartmentPage/>,
                    },
                    {
                        path: "/authors",
                        element: <AuthorsPage/>,
                    },
                    {
                        path: "/librarians",
                        element: <UsersPage roleId={1} title='Librarian'/>,
                    },
                    {
                        path: "/students",
                        element: <UsersPage roleId={2} title='Student'/>,
                    },
                    {
                        path: "/teachers",
                        element: <UsersPage roleId={3} title='Teacher'/>,
                    },
                    {
                        path: "/faculties",
                        element: <UsersPage roleId={4} title='Faculty'/>,
                    },
                    {
                        path: "/penalties",
                        element: <PenaltyPage/>,
                    },
                    {
                        path: "/roles",
                        element: <RolePage/>,
                    },
                    {
                        path: "/publishers",
                        element: <PublisherPage/>,
                    },
                    {
                        path: "/requests",
                        element: <BorrowedBooksPage status='requested'/>, 
                    },
                    {
                        path: "/histories",
                        element: <BorrowedBooksPage status='returned'/>, 
                    },
                    {
                        path: "/pendings",
                        element: <BorrowedBooksPage status='borrowed'/>, 
                    },
                    {
                        path: "/my-books",
                        element: <MyBooksPage/>
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