import React, { useState, useEffect } from "react";
import api from '../../componentes/api/apiConfig';
import Modal from 'react-modal';
import Menu from '../../componentes/menu';
import './styles.css';
import Button from "../../componentes/botao";
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

Modal.setAppElement('#root');

const PsicologoRelatorio = () => {
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
        const response = await api.get('/filtrar-alunos');
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
      const response = await api.get(`/eventos-datas/${matricula}`);
      setAvailableDates(response.data);
    } catch (error) {
      console.error('Erro ao buscar datas de eventos:', error);
    }
  };

  const handleFetchAvaliacoes = async () => {
    try {
      const response = await api.get(`/avaliacoes/${selectedStudent}`, {
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
    <div className="container">
      <Menu />
      <h1 className="pageTitle">Relatórios de avaliações</h1>
      <p className="pageSubtitle">Consulte os relatórios de avaliações realizados e obtenha uma visão geral das avaliações.</p>
      <div className="student-list">
        {students.length > 0 ? (
          <table className="student-table">
            <thead>
              <tr>
                <th>Nome completo</th>
                <th>Matrícula do aluno</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.matricula}>
                  <td>{student.nome}</td>
                  <td>{student.matricula}</td>
                  <td>
                    <Button
                      id="exibir-avaliacoes"
                      label={<><VisibilityIcon /> Exibir avaliações</>}
                      onClick={() => handleViewAvaliacoes(student.matricula, student.nome)}
                    />
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
          <Button
            id="buscar-avaliacoes"
            label={<><SearchIcon /> Buscar avaliações</>}
            onClick={handleFetchAvaliacoes}
          />
        </div>
        {filterAvaliacoesByDate().length > 0 ? (
          <table className="avaliacoes-table">
            <thead>
              <tr>
                <th>Data da consulta</th>
                <th>Comportamento</th>
                <th>Expressão de sentimentos</th>
                <th>Dificuldades de expressão</th>
                <th>Reconhecimento do impacto</th>
                <th>Explicação do impacto</th>
                <th>Arrependimento</th>
                <th>Forma de arrependimento</th>
                <th>Identificação do motivo</th>
                <th>Explicação do motivo</th>
                <th>Estratégias</th>
                <th>Descrição das estratégias</th>
                <th>Metas</th>
                <th>Descrição das metas</th>
                <th>Progresso das metas</th>
                <th>Detalhes do progresso</th>
                <th>Avaliação geral</th>
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
        <Button
          id="fechar-modal"
          label={<><CloseIcon /> Fechar</>}
          onClick={closeModal}
        />
      </Modal>
    </div>
  );
};

export default PsicologoRelatorio;