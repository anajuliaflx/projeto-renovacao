import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu'; //menu
import CloseIcon from '@mui/icons-material/Close'; //fechar
import LogoutIcon from '@mui/icons-material/Logout'; //deslogar
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; //agenda
import MessageIcon from '@mui/icons-material/Message'; //mensagem
import TheatersIcon from '@mui/icons-material/Theaters'; //trilha
import PeopleIcon from '@mui/icons-material/People'; //cadastrar
import AssessmentIcon from '@mui/icons-material/Assessment'; //relatórios
import TimelineIcon from '@mui/icons-material/Timeline'; //acompanhamento
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'; //cronograma
import { Link } from 'react-router-dom';
import './styles.css';

function Menu({ userRole }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const renderMenuItems = () => {
    switch (userRole) {
      case 'administrador':
        return (
          <>
            <Link to={'/login'}>
              <button className='button'>
                <AppRegistrationIcon /> Cronograma
              </button>
            </Link>
            <Link to={'/login'}>
              <button className='button'>
                <PeopleIcon /> Cadastrar usuário
              </button>
            </Link>
            <Link to={'/login'}>
              <button className='button'>
                <AssessmentIcon /> Relatórios
              </button>
            </Link>
            <Link to={'/login'}>
              <button className='button'>
                <MessageIcon /> Mensagens
              </button>
            </Link>
          </>
        );
      case 'aluno':
        return (
          <>
            <Link to={'/login'}>
              <button className='button'>
                <TheatersIcon /> Trilha educativa
              </button>
            </Link>
            <Link to={'/login'}>
              <button className='button'>
                <CalendarMonthIcon /> Agenda
              </button>
            </Link>
            <Link to={'/login'}>
              <button className='button'>
                <MessageIcon /> Mensagens
              </button>
            </Link>
          </>
        );
      case 'psicologo':
        return (
          <>
            <Link to={'/login'}>
              <button className='button'>
                <CalendarMonthIcon /> Agenda
              </button>
            </Link>
            <Link to={'/login'}>
              <button className='button'>
                <TimelineIcon /> Acompanhamento
              </button>
            </Link>
            <Link to={'/login'}>
              <button className='button'>
                <MessageIcon /> Mensagens
              </button>
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <CloseIcon className='close-icon'/> : <MenuIcon />}
      </div>
      {isOpen && (
        <div className="menu-items">
          {renderMenuItems()}
          <Link to={'/login'}>
            <button className='button logout-button'>
              <LogoutIcon /> Sair
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Menu;