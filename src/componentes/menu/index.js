import React, { useContext, useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import Api from "../../services/apiConfig";
import { UserContext } from '../../contexts/UserContext';
import './styles.css';

function Menu({ userRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(UserContext); // Pega o usuário e a função para definir o estado do contexto
  const navigate = useNavigate(); // Navegar programaticamente

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Função de logout
  const handleLogout = async () => {
    try {
      // Verifique se o usuário e o email estão disponíveis no contexto
      if (!user || !user.email) {
        alert("Usuário não encontrado.");
        return;
      }

      // Faz a requisição para a rota de logout no backend
      const response = await Api.post(`/logout`, { email: user.email });

      if (response.status === 200 && response.data.msg) {
        alert(response.data.msg); // Exibe a mensagem de logout
        setUser(null); // Limpa o estado do usuário no contexto
        navigate('/'); // Redireciona para a página principal ou de login
      }
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
      alert("Ocorreu um erro ao tentar fazer logout. Por favor, tente novamente.");
    }
  };

  const renderMenuItems = () => {
    switch (userRole) {
      case 'administrador':
        return (
          <>
            <Link to={'/admincronograma'}>
              <button className='button'>
                <AppRegistrationIcon /> Cronograma
              </button>
            </Link>
            <Link to={'/adminusuario'}>
              <button className='button'>
                <PeopleIcon /> Usuários
              </button>
            </Link>
            <Link to={'/adminrelatorio'}>
              <button className='button'>
                <AssessmentIcon /> Relatórios
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
            <Link to={'/alunoagenda'}>
              <button className='button'>
                <CalendarMonthIcon /> Agenda
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
            <Link to={'/psicologoagenda'}>
              <button className='button'>
                <CalendarMonthIcon /> Agenda
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
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <CloseIcon className='close-icon' /> : <MenuIcon />}
      </div>
      {isOpen && (
        <div className="menu-items">
          {renderMenuItems()}
          <button className='button logout-button' onClick={handleLogout}>
            <LogoutIcon /> Sair
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;