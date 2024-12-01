import './styles.css';
import logo from '../../img/logo.png'

function Header() {

  return (
      <header className='header'>
        <img src={logo} alt="Logo RenovAção" className='logo' />
      </header>
  );
}

export default Header;