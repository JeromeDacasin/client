import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BurgerMenu = () => {
    return (
        <div className='burger-menu'>
            <FontAwesomeIcon icon={faBars}/>
        </div>
    )
}

export default BurgerMenu;