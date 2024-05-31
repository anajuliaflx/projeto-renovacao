import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Menu from '../../componentes/menu';
import moment from 'moment';
import axios from "axios";
import './styles.css';

const localizer = momentLocalizer(moment);
const apiUrl = process.env.REACT_APP_API_URL;

const AlunoAgenda = () => {
  const { user } = useContext(UserContext); // Acessa o contexto do usuário
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get(`https://projeto-renovacao.web.app/eventos/${user.matricula}`);
        const eventosFormatados = response.data.map(evento => ({
          title: evento.descricao,
          start: new Date(evento.data_evento),
          end: new Date(evento.data_evento),
        }));
        setEventos(eventosFormatados);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    if (user && user.matricula) {
      fetchEventos();
    }
  }, [user]);

  return (
    <div>
      <div className="menu">
        <Menu userRole={user ? user.tipoUsuario : 'visitante'} />
      </div>
      <h1>Minha Agenda</h1>
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default AlunoAgenda;