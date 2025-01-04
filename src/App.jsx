import { Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext.jsx"
import SideMenu from "./components/SideMenu/SideMenu.jsx";
import './App.css';
import BurgerMenu from "./components/BurgerMenu/BurgerMenu.jsx";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <div className="layout">
      {user && (
        <div>
          <BurgerMenu />
          <SideMenu />
        </div>
      )}
          <div className="pages">
            <Outlet />
          </div>
      </div>
    </div>
  )
}

export default App
