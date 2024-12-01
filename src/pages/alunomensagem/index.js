import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import api from '../../componentes/api/apiConfig';
import Menu from '../../componentes/menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { UserContext } from '../../contexts/UserContext'; // Importa o UserContext
import Input from '../../componentes/input'; // Componente Input
import Button from '../../componentes/botao'; // Componente Button
import './styles.css';
import SendIcon from '@mui/icons-material/Send';

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
      if (user && user.matricula) {
        try {
          const response = await api.get(`/mensagens-respostas/${user.matricula}?page=${page}&limit=${limit}`);
          setMensagensRespostas(response.data.messages);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.error("Erro ao buscar mensagens e respostas:", error);
        }
      }
    };

    fetchMensagensRespostas();
  }, [user, page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mensagem.length > 400) {
      setFeedback('A mensagem não pode ter mais de 400 caracteres.');
      return;
    }

    try {
      const userResponse = await api.get(`/usuario/${user.matricula}`);
      if (userResponse.status === 404) {
        setFeedback('Matrícula não encontrada.');
        return;
      }

      if (userResponse.data && userResponse.data.id) {
        const remetente_id = userResponse.data.id;
        const response = await api.post(`/mensagem`, {
          remetente_id: remetente_id,
          destinatario_tipo: destinatarioTipo,
          mensagem: mensagem,
        });
        setFeedback(response.data.msg);
        setMensagem('');

        // Atualiza a lista de mensagens e respostas
        const updatedMensagensRespostas = await api.get(`/mensagens-respostas/${user.matricula}?page=${page}&limit=${limit}`);
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

  if (!user) {
    return <div>Carregando...</div>; // Ou algum outro indicador de carregamento
  }

  return (
    <div className="container1">
      <Menu />
      {/*<h1 className="pageTitle">Mensagens: Envio e Histórico</h1>*/}
      <div className="form-section">
        <h2>Enviar mensagem</h2>
        <p className="pageSubtitle">Preencha os campos abaixo para enviar uma mensagem ao administrador ou psicólogo.</p>
        <form onSubmit={handleSubmit} className="form">
          <div className="form2">
            <label className="labelD">Destinatário: </label>
            <select
              className="selectField"
              id="destinatarioTipo"
              value={destinatarioTipo}
              onChange={(e) => setDestinatarioTipo(e.target.value)}
              required
            >
              <option value="administrador">Administrador</option>
              <option value="psicologo">Psicólogo</option>
            </select>
          </div>
          <div className="new-border">
            <textarea
              id="mensagem"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              maxLength="250"
              rows="4"
              cols="50"
              required
              className="inputField"
              placeholder="Digite sua mensagem aqui *"
            />
          </div>
          <p className="char-count">{250 - mensagem.length} caracteres restantes</p>
          <Button
            id="enviar-mensagem"
            label={<><SendIcon /> Enviar mensagem</>}
            type="submit"
          />
        </form>
        {feedback && <p>{feedback}</p>}
      </div>
      <div className="response-section">
        <h2>Histórico de mensagens</h2>
        <p className="pageSubtitle">Aqui você pode visualizar todas as mensagens enviadas e suas respectivas respostas.</p>
        <div className="mensagens-respostas">
          {mensagensRespostas.map((item, index) => (
            <div key={`${item.mensagem_id}-${item.data_envio}-${index}`} className="mensagem-resposta">
              <p><strong className="boldTextColor">Conteúdo da mensagem enviada: </strong> {item.mensagem}</p>
              <p><strong className="boldTextColor">Enviado em: </strong> {new Date(item.data_envio).toLocaleString()}</p>
              {item.resposta ? (
                <>
                  <p><strong className="boldTextColor">Conteúdo da resposta: </strong> {item.resposta}</p>
                  <p><strong className="boldTextColor">Respondido em: </strong> {new Date(item.data_resposta).toLocaleString()}</p>
                </>
              ) : (
                <p><em>Aguardando resposta...</em></p>
              )}
            </div>
          ))}
        </div>
        <div className="pageNavigation">
          <Button
            id="pagina-anterior"
            label={<ArrowBackIcon />}
            type="button"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || totalPages === 1}
            aria-label="Ir para a página anterior"
          />

          <span>Página {page} de {totalPages}</span>

          <Button
            id="proxima-pagina"
            label={<ArrowForwardIcon />}
            type="button"
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages || totalPages === 1}
            aria-label="Ir para a próxima página"
          />
        </div>
      </div>
    </div>
  );
};

export default AlunoMensagem;