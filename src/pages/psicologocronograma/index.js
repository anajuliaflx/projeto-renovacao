import React, { useEffect, useState, useContext } from "react";
import api from '../../componentes/api/apiConfig';
import Menu from '../../componentes/menu';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { UserContext } from '../../contexts/UserContext';
import './styles.css';

const localizer = momentLocalizer(moment);

const PsicologoCronograma = () => {
  const [eventos, setEventos] = useState([]);
  const { user } = useContext(UserContext); // Usa o contexto do usuário

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await api.get(`/eventos-psicologo/${user.matricula}`);
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

    if (user?.matricula) {
      fetchEventos();
    }
  }, [user]);

  return (
    <div className="container">
      <Menu />
      <h1 className="pageTitle">Cronograma de agendas</h1>
      <p className="pageSubtitle">Confira os compromissos e horários agendados no seu cronograma de atividades.</p>
      <div className="calendarContainer">
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

export default PsicologoCronograma;