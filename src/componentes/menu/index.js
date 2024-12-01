import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MessageIcon from '@mui/icons-material/Message';
import TheatersIcon from '@mui/icons-material/Theaters';
import PeopleIcon from '@mui/icons-material/People';
import TimelineIcon from '@mui/icons-material/Timeline';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LockIcon from '@mui/icons-material/Lock';
import api from '../api/apiConfig';
import './styles.css';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext); // Agora obtemos `userRole` diretamente
  const userRole = user?.tipoUsuario; // `userRole` será `tipoUsuario` do `UserContext`
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      if (!user || !user.email) {
        alert("Nenhum usuário logado.");
        return;
      }

      const response = await api.post("/logout", { email: user.email });
      if (response.status === 200) {
        alert(response.data.msg);
        setUser(null);
        localStorage.removeItem('user');
        navigate("/login");
      }
    } catch (error) {
      console.error("Erro ao realizar logout:", error.response || error);
      alert("Erro ao realizar logout: " + (error.response?.data?.msg || error.message));
    }
  };

  const renderMenuItems = () => {
    switch (userRole) {
      case 'administrador':
        return (
          <>
            <Link to={'/admincronograma'}>
              <button className='button'>
                <AppRegistrationIcon /> Adicionar cronograma
              </button>
            </Link>
            <Link to={'/admintrilha'}>
              <button className='button'>
                <TheatersIcon /> Adicionar trilha
              </button>
            </Link>
            <Link to={'/adminusuario'}>
              <button className='button'>
                <PeopleIcon /> Usuários
              </button>
            </Link>
            <Link to={'/adminmensagem'}>
              <button className='button'>
                <MessageIcon /> Mensagens
              </button>
            </Link>
          </>
        );
      case 'aluno':
        return (
          <>
            <Link to={'/alunotrilha'}>
              <button className='button'>
                <TheatersIcon /> Trilha educativa
              </button>
            </Link>
            <Link to={'/alunocronograma'}>
              <button className='button'>
                <CalendarMonthIcon /> Cronograma
              </button>
            </Link>
            <Link to={'/alunomensagem'}>
              <button className='button'>
                <MessageIcon /> Mensagens
              </button>
            </Link>
          </>
        );
      case 'psicologo':
        return (
          <>
            <Link to={'/psicologocronograma'}>
              <button className='button'>
                <CalendarMonthIcon /> Cronograma
              </button>
            </Link>
            <Link to={'/psicologoacompanhamento'}>
              <button className='button'>
                <TimelineIcon /> Acompanhamento
              </button>
            </Link>
            <Link to={'/psicologomensagem'}>
              <button className='button'>
                <MessageIcon /> Mensagens
              </button>
            </Link>
            <Link to={'/psicologorelatorio'}>
              <button className='button'>
                <AssessmentIcon /> Relatórios
              </button>
            </Link>
          </>
        );
      default:
        return null;
    }
  };

  // Não renderiza o menu se o usuário não estiver logado
  if (!user) {
    return null; // Ou pode retornar um outro componente de "login" ou "tela de acesso"
  }

  return (
    <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <CloseIcon className='close-icon' /> : <MenuIcon />}
      </div>
      {isOpen && (
        <div className="menu-items">
          {renderMenuItems()}
          <Link to={'/trocarsenha'}>
            <button className='button'>
              <LockIcon /> Alterar senha
            </button>
          </Link>
          <button className='button logout-button' onClick={handleLogout}>
            <LogoutIcon /> Sair
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;