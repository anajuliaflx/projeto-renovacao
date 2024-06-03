import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Menu from '../../componentes/menu';
import { UserContext } from '../../contexts/UserContext';

const AlunoTrilha = () => {
  const { user } = useContext(UserContext);
  const [trilhas, setTrilhas] = useState([]);
  const [links, setLinks] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [currentTrilhaId, setCurrentTrilhaId] = useState(null);

  useEffect(() => {
    if (user && user.matricula) {
      fetchTrilhas(user.matricula);
    }
  }, [user]);

  const fetchTrilhas = async (matricula) => {
    try {
      const response = await axios.get(`https://projeto-renovacao.web.app/trilhas/${matricula}`);
      setTrilhas(response.data);
    } catch (error) {
      console.error("Erro ao buscar trilhas:", error);
    }
  };

  const fetchLinks = async (trilhaId) => {
    try {
      const response = await axios.get(`https://projeto-renovacao.web.app/links/${trilhaId}`, {
        params: { matricula_aluno: user.matricula }
      });
      setLinks(response.data);
      setCurrentTrilhaId(trilhaId);
    } catch (error) {
      console.error("Erro ao buscar links:", error);
    }
  };

  const handleMarcarAssistido = async (linkId) => {
    try {
      const response = await axios.post('https://projeto-renovacao.web.app/marcar-assistido', {
        link_id: linkId,
        matricula_aluno: user.matricula,
      });
      setFeedback(response.data.msg);
      setLinks(links.map(link => link.id === linkId ? { ...link, assistido: true } : link));
    } catch (error) {
      console.error("Erro ao marcar link como assistido:", error);
    }
  };

  return (
    <div>
      <Menu userRole="aluno" />
      <h1>Trilhas de Aprendizagem</h1>
      {currentTrilhaId ? (
        <div>
          <button onClick={() => setCurrentTrilhaId(null)}>Voltar</button>
          {links.length > 0 ? (
            <div>
              {links.map((link) => (
                <div key={link.id} className="link-bloco">
                  <h3>{link.titulo}</h3>
                  <p>{link.descricao}</p>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">Acessar Conteúdo</a>
                  {link.assistido ? (
                    <p>Já assistido</p>
                  ) : (
                    <button onClick={() => handleMarcarAssistido(link.id)}>Marcar como assistido</button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhum link encontrado.</p>
          )}
          {feedback && <p>{feedback}</p>}
        </div>
      ) : (
        <div>
          {trilhas.length > 0 ? (
            <div>
              {trilhas.map((trilha) => (
                <div key={trilha.id} className="trilha-bloco">
                  <h2>{trilha.titulo}</h2>
                  <p>{trilha.descricao}</p>
                  <button onClick={() => fetchLinks(trilha.id)}>Entrar</button>
                </div>
              ))}
            </div>
          ) : (
            <p>Nenhuma trilha encontrada.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AlunoTrilha;