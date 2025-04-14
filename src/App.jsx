import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import SideMenu from "./components/SideMenu/SideMenu.jsx";
import './App.css';
import BurgerMenu from "./components/BurgerMenu/BurgerMenu.jsx";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import useModal from "./hooks/useModal.jsx";
import ChangePasswordModal from "./components/Modal/ChangePassword/ChangePasswordModal.jsx";
import femalePic from './assets/female.jpg';
import malePic from './assets/male.jpg';


function App() {

  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { openModal, handleOpenModal, handleCloseModal} = useModal();
  
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };


  const handleLogout  = () => {
    setIsDropdownOpen(false);
    logout();
  }


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="App">
      <div className="layout">
        
        {user && (
          <div>
              {location.pathname === "/home" && 
                (['Admin', 'Librarian'].includes(user.user) ? (
                  <h1 className="welcome-message">Welcome, {user.fullname}</h1>
                ) : (
                  <h1 className="welcome-message"></h1>
                ))
              }
            <BurgerMenu toggleMenu={toggleMenu} isOpen={isMenuOpen}/> 
            <SideMenu isOpen={isMenuOpen} /> 
            <div className={`user-profile ${isDropdownOpen ? "open" : ""}`} ref={dropdownRef}>
              <div className="user-info" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img
                  src={malePic}
                  alt="Profile"
                  className="profile-pic"
                />
                <span>{user.fullname}</span>
              </div>

              {isDropdownOpen && (
                <div className="user-dropdown">
                  <button onClick={handleOpenModal}>Change Password</button>
                  <button onClick={handleLogout} className="logout-btn">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} /> LOGOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {
          openModal && (
            <ChangePasswordModal
              closeModal={handleCloseModal}

            />
          )
        }
        <div className="pages">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
