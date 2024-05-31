import { UserContext } from "../../contexts/UserContext";
import React, { useState, useContext } from "react";
import Menu from '../../componentes/menu';
import axios from "axios";

const AdministradorCronograma = () => {
  const { user } = useContext(UserContext);
  const [dataEvento, setDataEvento] = useState('');
  const [matriculaAluno, setMatriculaAluno] = useState('');
  const [matriculaPsicologo, setMatriculaPsicologo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (matriculaAluno.length !== 8 || matriculaPsicologo.length !== 8) {
      setFeedback('A matrícula do aluno e do psicólogo deve ter exatamente 8 caracteres.');
      return;
    }

    try {
      const response = await axios.post(`https://projeto-renovacao.web.app/adicionar-evento`, {
        data_evento: dataEvento,
        matricula_aluno: matriculaAluno,
        matricula_psicologo: matriculaPsicologo,
        descricao: descricao,
      });
      setFeedback(response.data.msg);
      setDataEvento('');
      setMatriculaAluno('');
      setMatriculaPsicologo('');
      setDescricao('');
    } catch (error) {
      console.error("Erro ao adicionar o evento:", error);
      setFeedback('Erro ao adicionar o evento.');
    }
  };

  return (
    <div>
      <Menu userRole={user ? user.tipoUsuario : 'visitante'} />
      <h1>Adicionar Evento</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Data do Evento:</label>
          <input
            type="date"
            value={dataEvento}
            onChange={(e) => setDataEvento(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Matrícula do Aluno:</label>
          <input
            type="text"
            value={matriculaAluno}
            onChange={(e) => setMatriculaAluno(e.target.value)}
            maxLength="8"
            required
          />
        </div>
        <div>
          <label>Matrícula do Psicólogo:</label>
          <input
            type="text"
            value={matriculaPsicologo}
            onChange={(e) => setMatriculaPsicologo(e.target.value)}
            maxLength="8"
            required
          />
        </div>
        <div>
          <label>Descrição do Evento:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Evento</button>
      </form>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default AdministradorCronograma;