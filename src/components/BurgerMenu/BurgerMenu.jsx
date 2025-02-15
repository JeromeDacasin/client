import './BurgerMenu.css';


function BurgerMenu({ toggleMenu, isOpen }) {

  return (
    <div className="burger-menu" onClick={toggleMenu} style={{ background: isOpen ? 'black' : 'white', color: isOpen ? 'white' : 'black' }} >
      {isOpen ? '✖' : '☰'} 
    </div>
  );
}

export default BurgerMenu;