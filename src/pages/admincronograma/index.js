import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from 'react-modal';
import Menu from '../../componentes/menu';
import { UserContext } from "../../contexts/UserContext";

const apiUrl = process.env.REACT_APP_API_URL;

const AdministradorCronograma = () => {
  const { user } = useContext(UserContext);
  const [dataEvento, setDataEvento] = useState('');
  const [matriculaAlunoEvento, setMatriculaAlunoEvento] = useState('');
  const [matriculaPsicologo, setMatriculaPsicologo] = useState('');
  const [descricaoEvento, setDescricaoEvento] = useState('');
  const [feedbackEvento, setFeedbackEvento] = useState('');

  const [tituloTrilha, setTituloTrilha] = useState('');
  const [descricaoTrilha, setDescricaoTrilha] = useState('');
  const [links, setLinks] = useState([{ url: '', titulo: '', descricao: '' }]);
  const [trilhaId, setTrilhaId] = useState(null);
  const [feedbackTrilha, setFeedbackTrilha] = useState('');
  const [matriculaAlunoTrilha, setMatriculaAlunoTrilha] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    fetchNotificacoes();
  }, []);

  const fetchNotificacoes = async () => {
    try {
      const response = await axios.get(`https://projeto-renovacao.web.app/notificacoes`);
      setNotificacoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
    }
  };

  const handleSubmitEvento = async (e) => {
    e.preventDefault();

    if (matriculaAlunoEvento.length !== 8 || matriculaPsicologo.length !== 8) {
      setFeedbackEvento('A matrícula do aluno e do psicólogo deve ter exatamente 8 caracteres.');
      return;
    }

    try {
      const response = await axios.post(`https://projeto-renovacao.web.app/adicionar-evento`, {
        data_evento: dataEvento,
        matricula_aluno: matriculaAlunoEvento,
        matricula_psicologo: matriculaPsicologo,
        descricao: descricaoEvento,
      });
      setFeedbackEvento(response.data.msg);
      setDataEvento('');
      setMatriculaAlunoEvento('');
      setMatriculaPsicologo('');
      setDescricaoEvento('');
    } catch (error) {
      setFeedbackEvento('Erro ao adicionar o evento.');
    }
  };

  const handleSubmitTrilha = async (e) => {
    e.preventDefault();

    if (matriculaAlunoTrilha.length !== 8) {
      setFeedbackTrilha('A matrícula do aluno deve ter exatamente 8 caracteres.');
      return;
    }

    try {
      const response = await axios.post(`https://projeto-renovacao.web.app/adicionar-trilha`, {
        titulo: tituloTrilha,
        descricao: descricaoTrilha,
        matricula_aluno: matriculaAlunoTrilha,
      });
      setFeedbackTrilha(response.data.msg);
      setTrilhaId(response.data.trilhaId);
      setTituloTrilha('');
      setDescricaoTrilha('');
      setIsModalOpen(true);
    } catch (error) {
      setFeedbackTrilha('Erro ao adicionar a trilha.');
    }
  };

  const handleSubmitLink = async (e) => {
    e.preventDefault();

    if (!trilhaId) {
      setFeedbackTrilha('Primeiro adicione uma trilha.');
      return;
    }

    try {
      await Promise.all(links.map(link => 
        axios.post(`https://projeto-renovacao.web.app/adicionar-link`, {
          url: link.url,
          titulo: link.titulo,
          descricao: link.descricao,
          trilha_id: trilhaId,
        })
      ));
      setFeedbackTrilha('Links adicionados com sucesso');
      setLinks([{ url: '', titulo: '', descricao: '' }]);
      setIsModalOpen(false); 
    } catch (error) {
      setFeedbackTrilha('Erro ao adicionar os links.');
    }
  };

  const handleLinkChange = (index, e) => {
    const { name, value } = e.target;
    const newLinks = [...links];
    newLinks[index][name] = value;
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, { url: '', titulo: '', descricao: '' }]);
  };

  return (
    <div>
      <Menu userRole="administrador" />
      {/* Formulário para adicionar eventos */}
      <h1>Adicionar Evento</h1>
      <form onSubmit={handleSubmitEvento}>
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
            value={matriculaAlunoEvento}
            onChange={(e) => setMatriculaAlunoEvento(e.target.value)}
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
            value={descricaoEvento}
            onChange={(e) => setDescricaoEvento(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Evento</button>
      </form>
      {feedbackEvento && <p>{feedbackEvento}</p>}

      {/* Formulário para adicionar trilhas */}
      <h1>Adicionar Trilha</h1>
      <form onSubmit={handleSubmitTrilha}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={tituloTrilha}
            onChange={(e) => setTituloTrilha(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricaoTrilha}
            onChange={(e) => setDescricaoTrilha(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Matrícula do Aluno:</label>
          <input
            type="text"
            value={matriculaAlunoTrilha}
            onChange={(e) => setMatriculaAlunoTrilha(e.target.value)}
            maxLength="8"
            required
          />
        </div>
        <button type="submit">Adicionar Trilha</button>
      </form>
      {feedbackTrilha && <p>{feedbackTrilha}</p>}

      {/* Modal para adicionar links */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Adicionar Links"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Adicionar Links</h2>
        <form onSubmit={handleSubmitLink}>
          {links.map((link, index) => (
            <div key={index}>
              <label>URL:</label>
              <input
                type="text"
                name="url"
                value={link.url}
                onChange={(e) => handleLinkChange(index, e)}
                required
              />
              <label>Título:</label>
              <input
                type="text"
                name="titulo"
                value={link.titulo}
                onChange={(e) => handleLinkChange(index, e)}
                required
              />
              <label>Descrição:</label>
              <textarea
                name="descricao"
                value={link.descricao}
                onChange={(e) => handleLinkChange(index, e)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddLink}>Adicionar Link</button>
          <button type="submit">Salvar Links</button>
        </form>
      </Modal>

      {/* Seção de notificações */}
      <h1>Notificações</h1>
      {notificacoes.length > 0 ? (
        <ul>
          {notificacoes.map((notificacao) => (
            <li key={notificacao.id}>
              <p>{notificacao.mensagem}</p>
              <p><em>{new Date(notificacao.data_notificacao).toLocaleString()}</em></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma notificação encontrada.</p>
      )}
    </div>
  );
};

export default AdministradorCronograma;