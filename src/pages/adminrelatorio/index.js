import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-modal';
import Menu from '../../componentes/menu';
import './styles.css';

Modal.setAppElement('#root');

const AdministradorRelatorio = () => {
  const [students, setStudents] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://projeto-renovacao.web.app/filtrar-alunos');
        setStudents(response.data);
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleViewAvaliacoes = async (matricula, nome) => {
    setSelectedStudent(matricula);
    setStudentName(nome);
    setIsModalOpen(true);

    try {
      const response = await axios.get(`https://projeto-renovacao.web.app/eventos-datas/${matricula}`);
      setAvailableDates(response.data);
    } catch (error) {
      console.error('Erro ao buscar datas de eventos:', error);
    }
  };

  const handleFetchAvaliacoes = async () => {
    try {
      const response = await axios.get(`https://projeto-renovacao.web.app/avaliacoes/${selectedStudent}`, {
        params: { data: selectedDate }
      });
      setAvaliacoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAvaliacoes([]);
    setSelectedDate('');
    setAvailableDates([]);
  };

  const filterAvaliacoesByDate = () => {
    if (!selectedDate) return avaliacoes;
    return avaliacoes.filter(avaliacao => avaliacao.data_consulta === selectedDate);
  };

  return (
    <div>
      <Menu userRole="administrador" />
      <h1>Relatórios de avaliações</h1>
      <div className="student-list">
        {students.length > 0 ? (
          <table className="student-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.matricula}>
                  <td>{student.nome}</td>
                  <td>{student.matricula}</td>
                  <td>
                    <button onClick={() => handleViewAvaliacoes(student.matricula, student.nome)}>
                      Visualizar avaliações
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum aluno encontrado.</p>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Relatórios de avaliações"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Avaliações de {studentName}</h2>
        <div>
          <label>Selecionar Data:</label>
          <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
            <option value="">Selecione uma data</option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </select>
          <button onClick={handleFetchAvaliacoes}>Buscar Avaliações</button>
        </div>
        {filterAvaliacoesByDate().length > 0 ? (
          <table className="avaliacoes-table">
            <thead>
              <tr>
                <th>Data da Consulta</th>
                <th>Comportamento</th>
                <th>Expressão de Sentimentos</th>
                <th>Dificuldades de Expressão</th>
                <th>Reconhecimento do Impacto</th>
                <th>Explicação do Impacto</th>
                <th>Arrependimento</th>
                <th>Forma de Arrependimento</th>
                <th>Identificação do Motivo</th>
                <th>Explicação do Motivo</th>
                <th>Estratégias</th>
                <th>Descrição das Estratégias</th>
                <th>Metas</th>
                <th>Descrição das Metas</th>
                <th>Progresso das Metas</th>
                <th>Detalhes do Progresso</th>
                <th>Avaliação Geral</th>
                <th>Comentários</th>
              </tr>
            </thead>
            <tbody>
            {filterAvaliacoesByDate().map((avaliacao) => (
                <tr key={avaliacao.id}>
                  <td>{new Date(avaliacao.data_consulta).toLocaleDateString()}</td>
                  <td>{avaliacao.comportamento}</td>
                  <td>{avaliacao.expressao_sentimentos ? 'Sim' : 'Não'}</td>
                  <td>{avaliacao.dificuldades_expressao}</td>
                  <td>{avaliacao.reconhecimento_impacto ? 'Sim' : 'Não'}</td>
                  <td>{avaliacao.explicacao_impacto}</td>
                  <td>{avaliacao.arrependimento ? 'Sim' : 'Não'}</td>
                  <td>{avaliacao.forma_arrependimento}</td>
                  <td>{avaliacao.identificacao_motivo ? 'Sim' : 'Não'}</td>
                  <td>{avaliacao.explicacao_motivo}</td>
                  <td>{avaliacao.estrategias}</td>
                  <td>{avaliacao.descricao_estrategias}</td>
                  <td>{avaliacao.metas}</td>
                  <td>{avaliacao.descricao_metas}</td>
                  <td>{avaliacao.progresso_metas}</td>
                  <td>{avaliacao.detalhes_progresso}</td>
                  <td>{avaliacao.avaliacao_geral}</td>
                  <td>{avaliacao.comentarios}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma avaliação encontrada para esta data.</p>
        )}
        <button onClick={closeModal}>Fechar</button>
      </Modal>
    </div>
  );
};

export default AdministradorRelatorio;