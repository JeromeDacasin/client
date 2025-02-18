import './SideMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { adminMenu, userMenu } from './sideMenuData';
import logo from './../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SideMenu = ({ isOpen }) => {

    const {user} = useAuth();

    return (
        <div id="side-menu" className={isOpen ? 'open' : ''}>
            <div className='side-menu-image'>
                <img src={logo} alt="scc" />
            </div>
            <div className="side-menu-list">
                { user.user === 'Librarian' || user.user === 'Admin' ? 
                    ( 
                        <ul>
                            {adminMenu.map((value, index) => {
                                return (
                                    <NavLink
                                        key={index}
                                        to={value.link}
                                        className="list">
                                        <div className='side-menu-icon'>
                                            <FontAwesomeIcon icon={value.icon} />
                                        </div>
                                        <div className='side-menu-title'>
                                            {value.title}
                                        </div>
                                    </NavLink>
                                );
                            })}
                        </ul>
                    ) : (
                        <ul>
                            {userMenu.map((value, index) => {
                                return (
                                    <NavLink
                                        key={index}
                                        to={value.link}
                                        className="list">
                                        <div className='side-menu-icon'>
                                            <FontAwesomeIcon icon={value.icon} />
                                        </div>
                                        <div className='side-menu-title'>
                                            {value.title}
                                        </div>
                                    </NavLink>
                                );
                            })}
                        </ul>
                    )
                }
                
            </div>
        </div>
    );
};

export default SideMenu;
