import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Menu from '../../componentes/menu';
import { UserContext } from "../../contexts/UserContext";

const AdministradorMensagem = () => {
    const { user } = useContext(UserContext);
    const [mensagens, setMensagens] = useState([]);
    const [respostas, setRespostas] = useState({});
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 3;

    useEffect(() => {
        const fetchMensagens = async () => {
            try {
                const response = await axios.get(`https://projeto-renovacao.web.app/mensagens/administrador?page=${page}&limit=${limit}`);
                setMensagens(response.data.messages);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                setError('Erro ao buscar as mensagens.');
            }
        };

        fetchMensagens();
    }, [page]);

    const handleResponder = async (mensagem_id) => {
        try {
            const response = await axios.post(`https://projeto-renovacao.web.app/resposta`, {
                mensagem_id,
                resposta: respostas[mensagem_id] || '',
                matricula: user.matricula, // Utilizando a matrícula do contexto
                tipoUsuario: user.tipoUsuario, // Utilizando o tipoUsuario do contexto
            });
            setFeedback(response.data.msg);

            // Atualize a mensagem com a resposta e a data da resposta
            setMensagens((prevMensagens) =>
                prevMensagens.map((msg) =>
                    msg.id === mensagem_id
                        ? { ...msg, resposta: response.data.resposta, data_resposta: response.data.data_resposta }
                        : msg
                )
            );
            setRespostas(prevRespostas => ({ ...prevRespostas, [mensagem_id]: '' }));
        } catch (error) {
            setError('Erro ao enviar a resposta.');
        }
    };

    const handleRespostaChange = (mensagem_id, value) => {
        setRespostas(prevRespostas => ({ ...prevRespostas, [mensagem_id]: value }));
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div>
            <Menu userRole="administrador" />
            <h1>Mensagens para Administrador</h1>
            {error && <p>{error}</p>}
            {mensagens.length > 0 ? (
                <ul>
                    {mensagens.map((msg, index) => (
                        <li key={`${msg.id}-${index}`}>
                            <p><strong>De:</strong> {msg.remetente_nome}</p>
                            <p>{msg.mensagem}</p>
                            <p><em>{new Date(msg.data_envio).toLocaleString()}</em></p>
                            {msg.resposta ? (
                                <>
                                    <p><strong>Resposta:</strong> {msg.resposta}</p>
                                    <p><strong>Data da resposta:</strong> {new Date(msg.data_resposta).toLocaleString()}</p>
                                </>
                            ) : (
                                <>
                                    <textarea
                                        value={respostas[msg.id] || ''}
                                        onChange={(e) => handleRespostaChange(msg.id, e.target.value)}
                                        placeholder="Escreva sua resposta aqui"
                                    />
                                    <button onClick={() => handleResponder(msg.id)}>Responder</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma mensagem encontrada.</p>
            )}
            <div>
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Anterior</button>
                <span>Página {page} de {totalPages}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Próxima</button>
            </div>
            {feedback && <p>{feedback}</p>}
        </div>
    );
};

export default AdministradorMensagem;
