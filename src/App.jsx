import { Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext.jsx"
import { Navbar } from "./components/Navbar/Navbar.jsx"

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user && <Navbar/> }
      <Outlet/>
    </div>
  )
}

export default App
