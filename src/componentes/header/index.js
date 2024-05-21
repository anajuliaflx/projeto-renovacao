import './styles.css';
import logo from '../../img/logo.png'

function Header() {

  return (
    <div className='container'>
      <header className='header'>
        <img src={logo} alt="Logo RenovAção" className='logo' />
      </header>
    </div>

  );
}

export default Header;