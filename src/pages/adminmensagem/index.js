import React, { useEffect, useState, useContext } from "react";
import api from '../../componentes/api/apiConfig';
import Menu from '../../componentes/menu';
import { UserContext } from '../../contexts/UserContext'; // Importe o UserContext
import './styles.css';
import Button from "../../componentes/botao";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import Input from "../../componentes/input";

const AdministradorMensagem = () => {
    const { user } = useContext(UserContext); // Use o UserContext
    const [mensagens, setMensagens] = useState([]);
    const [respostas, setRespostas] = useState({});
    const [feedback, setFeedback] = useState('');
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 3;
    const maxLength = 250;

    useEffect(() => {
        const fetchMensagens = async () => {
            try {
                const response = await api.get(`/mensagens/administrador?page=${page}&limit=${limit}`);
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
            const response = await api.post(`/resposta`, {
                mensagem_id,
                resposta: respostas[mensagem_id] || '',
                matricula: user.matricula, // Use a matrícula do contexto do usuário
                tipoUsuario: 'administrador',
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
        <div className="container">
            <Menu />
            <h1 className="pageTitle">Mensagens recebidas</h1>
            <p className="pageSubtitle">Aqui você pode visualizar e responder às mensagens enviadas pelos alunos.</p>
            {error && <p className="loadingError">{error}</p>}
            {mensagens.length > 0 ? (
                <ul className="messageList">
                    {mensagens.map((msg, index) => (
                        <li key={`${msg.id}-${index}`} className="messageItem">
                            <p><strong className="boldTextColor">Enviado por: </strong> {msg.remetente_nome}</p>
                            <p><strong className="boldTextColor">Conteúdo da mensagem recebida: </strong> {msg.mensagem}</p>
                            <p><strong className="boldTextColor">Enviado em: </strong> <em>{new Date(msg.data_envio).toLocaleString()}</em></p>
                            {msg.resposta ? (
                                <>
                                    <p><strong className="boldTextColor">Conteúdo da resposta: </strong> {msg.resposta}</p>
                                    <p><strong className="boldTextColor">Respondido em: </strong> {new Date(msg.data_resposta).toLocaleString()}</p>
                                </>
                            ) : (
                                <>
                                    <div className="new-border">
                                        <textarea
                                            className="inputField"
                                            value={respostas[msg.id] || ''}
                                            onChange={(e) => handleRespostaChange(msg.id, e.target.value)}
                                            maxLength={maxLength}
                                            rows="4"
                                            cols="50"
                                            placeholder="Escreva sua resposta aqui *"
                                        />
                                    </div>
                                    <p className="char-count">{maxLength - (respostas[msg.id] || '').length} caracteres restantes</p>

                                    <Button
                                        id="responder-mensagem"
                                        label={<><SendIcon /> Responder mensagem</>}
                                        type="button"
                                        onClick={() => handleResponder(msg.id)}
                                    />
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="noContentFound">Nenhuma mensagem encontrada.</p>
            )}
            <div className="pageNavigation">
                <Button
                    id="pagina-anterior"
                    label={<ArrowBackIcon />}
                    type="button"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    aria-label="Ir para a página anterior"
                />

                <span>Página {page} de {totalPages}</span>

                <Button
                    id="proxima-pagina"
                    label={<ArrowForwardIcon />}
                    type="button"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    aria-label="Ir para a próxima página"
                />
            </div>
            {feedback && <p>{feedback}</p>}
        </div>
    );
};

export default AdministradorMensagem;