import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Menu from '../../componentes/menu';
import { UserContext } from "../../contexts/UserContext";
import './styles.css';

const apiUrl = process.env.REACT_APP_API_URL;

const AlunoMensagem = () => {
  const { user } = useContext(UserContext); // Usa o contexto para obter o usuário
  const [destinatarioTipo, setDestinatarioTipo] = useState('administrador');
  const [mensagem, setMensagem] = useState('');
  const [feedback, setFeedback] = useState('');
  const [mensagensRespostas, setMensagensRespostas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3;

  useEffect(() => {
    const fetchMensagensRespostas = async () => {
      try {
        const response = await axios.get(`https://projeto-renovacao.web.app/mensagens-respostas/${user.matricula}?page=${page}&limit=${limit}`);
        setMensagensRespostas(response.data.messages);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Erro ao buscar mensagens e respostas:", error);
      }
    };

    if (user.matricula) {
      fetchMensagensRespostas();
    }
  }, [user.matricula, page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mensagem.length > 400) {
      setFeedback('A mensagem não pode ter mais de 400 caracteres.');
      return;
    }

    try {
      const userResponse = await axios.get(`https://projeto-renovacao.web.app/usuario/${user.matricula}`);
      if (userResponse.status === 404) {
        setFeedback('Matrícula não encontrada.');
        return;
      }

      if (userResponse.data && userResponse.data.id) {
        const remetente_id = userResponse.data.id;
        const response = await axios.post(`https://projeto-renovacao.web.app/mensagem`, {
          remetente_id: remetente_id,
          destinatario_tipo: destinatarioTipo,
          mensagem: mensagem,
        });
        setFeedback(response.data.msg);
        setMensagem('');

        // Atualiza a lista de mensagens e respostas
        const updatedMensagensRespostas = await axios.get(`https://projeto-renovacao.web.app/mensagens-respostas/${user.matricula}?page=${page}&limit=${limit}`);
        setMensagensRespostas(updatedMensagensRespostas.data.messages);
        setTotalPages(updatedMensagensRespostas.data.totalPages);
      } else {
        setFeedback('Matrícula não encontrada.');
      }
    } catch (error) {
      setFeedback('Erro ao enviar a mensagem.');
      console.error('Erro ao enviar a mensagem:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container1">
      <Menu userRole="aluno" />
      <div className="form-section">
        <h1>Enviar Mensagem</h1>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label className="label">Sua Matrícula:</label>
            <input
              type="text"
              value={user.matricula}
              maxLength="8"
              readOnly
              className="matricula"
            />
          </div>
          <div>
            <label className="label">Destinatário:</label>
            <select
              value={destinatarioTipo}
              onChange={(e) => setDestinatarioTipo(e.target.value)}
              className="value1"
            >
              <option value="administrador">Administrador</option>
              <option value="psicologo">Psicólogo</option>
            </select>
          </div>
          <div>
            <label className="label">Mensagem:</label>
            <textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              maxLength="400"
              required
              className="text1"
            />
          </div>
          <button type="submit" className="buttonA">Enviar</button>
        </form>
        {feedback && <p>{feedback}</p>}
      </div>
      
      <div className="response-section">
        <h2>Mensagens e Respostas</h2>
        <div className="mensagens-respostas">
          {mensagensRespostas.map((item, index) => (
            <div key={`${item.mensagem_id}-${item.data_envio}-${index}`} className="mensagem-resposta">
              <p><strong>Mensagem:</strong> {item.mensagem}</p>
              <p><strong>Data de envio:</strong> {new Date(item.data_envio).toLocaleString()}</p>
              {item.resposta ? (
                <>
                  <p><strong>Resposta:</strong> {item.resposta}</p>
                  <p><strong>Data da resposta:</strong> {new Date(item.data_resposta).toLocaleString()}</p>
                </>
              ) : (
                <p><em>Aguardando resposta...</em></p>
              )}
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Anterior</button>
          <span>Página {page} de {totalPages}</span>
          <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Próxima</button>
        </div>
      </div>
    </div>
  );
};

export default AlunoMensagem;