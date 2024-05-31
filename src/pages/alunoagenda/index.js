import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from '../../componentes/menu';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css';

const localizer = momentLocalizer(moment);
const apiUrl = process.env.REACT_APP_API_URL;

const AlunoAgenda = () => {
  const [eventos, setEventos] = useState([]);
  const matricula = localStorage.getItem('matricula');

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get(`https://projeto-renovacao.web.app/eventos/${matricula}`);
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

    if (matricula) {
      fetchEventos();
    }
  }, [matricula]);

  return (
    <div>
      <div className="menu">
        <Menu userRole="aluno" />
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