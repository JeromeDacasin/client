import './SideMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sideMenuData } from './SideMenuData';
import  logo  from './../../assets/logo.png';
import { NavLink } from 'react-router-dom';

const SideMenu = () => {
    return (
        <div id="side-menu">
            <div className='side-menu-image'>
                <img src={logo} alt="scc"/>
            </div>
            <div className="side-menu-list">
                <ul>
                    {
                        sideMenuData.map( (value, index) => {
                            return (
                                    <NavLink 
                                        id=''
                                        key={index}
                                        to={value.link}
                                        className="list"> 
                                        <div className='side-menu-icon'>
                                            <FontAwesomeIcon icon={value.icon}/>
                                        </div>
                                        <div className='side-menu-title'>
                                            {value.title}
                                        </div>
                                    </NavLink>
                            )
                        })
                    }
                </ul>
            </div>
           
        </div>
    )
};


export default SideMenu;