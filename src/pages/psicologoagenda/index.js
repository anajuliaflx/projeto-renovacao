import React, { useEffect, useState, useContext } from "react";
import Api from "../../services/apiConfig";
import Menu from '../../componentes/menu';
import { UserContext } from "../../contexts/UserContext"; // Importa o UserContext
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css';
import styles from './agendap.module.css';

const localizer = momentLocalizer(moment);

const PsicologoAgenda = () => {
  const { user } = useContext(UserContext); // Acessa o contexto do usuário
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await Api.get(`/eventos-psicologo/${user.matricula}`);
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
    <div className={styles.container}>
      <Menu userRole="psicologo" />
      <h1 className={styles.header}>Agenda de consultas</h1>
      <div className={styles.calendarContainer}>
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

export default PsicologoAgenda;