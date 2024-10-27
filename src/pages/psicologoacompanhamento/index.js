import React, { useState, useEffect, useContext, useCallback } from 'react';
import Api from "../../services/apiConfig";
import { UserContext } from '../../contexts/UserContext';
import Modal from 'react-modal';
import './styles.css';
import styles from './acompanhamento.module.css'; 
import Menu from '../../componentes/menu';

Modal.setAppElement('#root');

const PsicologoAcompanhamento = () => {
    const { user } = useContext(UserContext);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [students, setStudents] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        data_consulta: '',
        comportamento: '',
        expressao_sentimentos: '',
        dificuldades_expressao: '',
        reconhecimento_impacto: '',
        explicacao_impacto: '',
        arrependimento: '',
        forma_arrependimento: '',
        identificacao_motivo: '',
        explicacao_motivo: '',
        estrategias: '',
        descricao_estrategias: '',
        metas: '',
        descricao_metas: '',
        progresso_metas: '',
        detalhes_progresso: '',
        avaliacao_geral: '',
        comentarios: ''
    });
    const [studentName, setStudentName] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await Api.get(`/filtrar-alunos`);
                setStudents(response.data);
            } catch (error) {
                console.error('Erro ao buscar alunos:', error);
            }
        };

        fetchStudents();
    }, []);

    useEffect(() => {
        if (selectedStudent) {
            const fetchAppointments = async () => {
                try {
                    const response = await Api.get(`/eventos?matricula_psicologo=${user.matricula}&matricula_aluno=${selectedStudent}`);
                    const formattedAppointments = response.data.map(appointment => ({
                        ...appointment,
                        data_evento: formatDate(appointment.data_evento)
                    }));
                    setAppointments(formattedAppointments);
                } catch (error) {
                    console.error('Erro ao buscar consultas do aluno:', error);
                }
            };

            fetchAppointments();
        }
    }, [selectedStudent, user.matricula]);

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const parseDate = (date) => {
        const [day, month, year] = date.split('/');
        return new Date(`${year}-${month}-${day}`);
    };

    const handleFormChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Converter a data para o formato YYYY-MM-DD
            const data_consulta = parseDate(formData.data_consulta).toISOString().split('T')[0];

            const response = await Api.post(`/avaliacao`, {
                ...formData,
                data_consulta,
                matricula_aluno: selectedStudent,
                matricula_psicologo: user.matricula
            });
            console.log(response.data.msg);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Erro ao salvar avaliação:', error);
        }
    };

    const toggleExpandStudent = (matricula, nome) => {
        setSelectedStudent(matricula);
        setStudentName(nome);
        setIsModalOpen(true);
    };

    const renderStudentList = () => (
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
                            <button onClick={() => toggleExpandStudent(student.matricula, student.nome)}>Avaliar Aluno</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderEvaluationForm = () => (
        <form onSubmit={handleSubmit} className="forms">
            <h2>Seção 1: Informações Gerais</h2>
            <div>
                <label>Data da Consulta:</label>
                <select name="data_consulta" value={formData.data_consulta} onChange={handleFormChange} required>
                    <option value="">Selecione uma data</option>
                    {appointments.map((appointment) => (
                        <option key={appointment.id} value={appointment.data_evento}>{appointment.data_evento}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Nome do Psicólogo:</label>
                <input type="text" name="nome_psicologo" value={user.nome} readOnly />
            </div>
            <div>
                <label>Nome do Aluno:</label>
                <input type="text" name="nome_aluno" value={studentName} readOnly />
            </div>
            
            <h2>Seção 2: Comportamento e Interação</h2>
            <div>
                <label>Como o aluno se comportou durante a sessão?</label>
                <select name="comportamento" value={formData.comportamento} onChange={handleFormChange} required>
                    <option value="">Selecione uma opção</option>
                    <option value="Muito Cooperativo">Muito Cooperativo</option>
                    <option value="Cooperativo">Cooperativo</option>
                    <option value="Neutro">Neutro</option>
                    <option value="Não Cooperativo">Não Cooperativo</option>
                    <option value="Muito Não Cooperativo">Muito Não Cooperativo</option>
                </select>
            </div>
            <div>
                <label>O aluno foi capaz de expressar seus sentimentos e pensamentos claramente?</label>
                <select name="expressao_sentimentos" value={formData.expressao_sentimentos} onChange={handleFormChange} required>
                    <option value="">Selecione uma opção</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                </select>
            </div>
            {formData.expressao_sentimentos === 'Não' && (
                <div>
                    <label>Por favor, descreva com detalhes quais foram as dificuldades:</label>
                    <textarea name="dificuldades_expressao" value={formData.dificuldades_expressao} onChange={handleFormChange} maxLength={50} required></textarea>
                </div>
            )}
            <div>
                <label>O aluno reconhece o impacto de suas ações (ciberbullying) nos outros?</label>
                <select name="reconhecimento_impacto" value={formData.reconhecimento_impacto} onChange={handleFormChange} required>
                    <option value="">Selecione uma opção</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                </select>
            </div>
            {formData.reconhecimento_impacto === 'Sim' && (
                <div>
                    <label>Por favor, descreva com detalhes o que fez você tirar essa conclusão:</label>
                    <textarea name="explicacao_impacto" value={formData.explicacao_impacto} onChange={handleFormChange} maxLength={50} required></textarea>
                </div>
            )}

            <h2>Seção 3: Reflexão e Arrependimento</h2>
            <div>
                <label>O aluno mostrou arrependimento por suas ações?</label>
                <select name="arrependimento" value={formData.arrependimento} onChange={handleFormChange} required>
                    <option value="">Selecione uma opção</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                </select>
            </div>
            {formData.arrependimento === 'Sim' && (
                <div>
                    <label>Se sim, de que forma?</label>
                    <textarea name="forma_arrependimento" value={formData.forma_arrependimento} onChange={handleFormChange} maxLength={50} required></textarea>
                </div>
            )}
            <div>
                <label>O aluno foi capaz de identificar por que cometeu ciberbullying?</label>
                <select name="identificacao_motivo" value={formData.identificacao_motivo} onChange={handleFormChange} required>
                    <option value="">Selecione uma opção</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                </select>
            </div>
            {formData.identificacao_motivo === 'Sim' && (
                <div>
                    <label>Se sim, por favor, explique:</label>
                    <textarea name="explicacao_motivo" value={formData.explicacao_motivo} onChange={handleFormChange} maxLength={50} required></textarea>
                </div>
            )}

            <h2>Seção 4: Estratégias de Mudança</h2>
            <div>
                <label>Quais estratégias foram discutidas para prevenir futuros incidentes de ciberbullying?</label>
                <select name="estrategias" value={formData.estrategias} onChange={handleFormChange} required>
                    <option value="">Selecione uma opção</option>
                    <option value="Aumentar a comunicação">Aumentar a comunicação</option>
                    <option value="Monitorar o comportamento online">Monitorar o comportamento online</option>
                    <option value="Educação sobre ciberbullying">Educação sobre ciberbullying</option>
                    <option value="Outras">Outras</option>
                </select>
            </div>
            {formData.estrategias === 'Outras' && (
                <div>
                    <label>Descreva outras estratégias:</label>
                    <textarea name="descricao_estrategias" value={formData.descricao_estrategias} onChange={handleFormChange} maxLength={50} required></textarea>
                </div>
            )}

            <h2>Seção 5: Metas e Progresso</h2>
            <div>
                <label>Quais metas foram estabelecidas para o aluno até a próxima consulta?</label>
                <select name="metas" value={formData.metas} onChange={handleFormChange} required>
                    <option value="">Selecione uma opção</option>
                    <option value="Melhorar a comunicação">Melhorar a comunicação</option>
                    <option value="Reduzir o uso de redes sociais">Reduzir o uso de redes sociais</option>
                    <option value="Participar de sessões de aconselhamento">Participar de sessões de aconselhamento</option>
                    <option value="Outras">Outras</option>
                </select>
            </div>
            {formData.metas === 'Outras' && (
                <div>
                    <label>Descreva outras metas:</label>
                    <textarea name="descricao_metas" value={formData.descricao_metas} onChange={handleFormChange} maxLength={50} required></textarea>
                </div>
            )}
            <div>
                <label>Qual é o progresso do aluno em relação às metas estabelecidas na consulta anterior?</label>
                <select name="progresso_metas" value={formData.progresso_metas} onChange={handleFormChange} required>
                    <option value="">Selecione uma opção</option>
                    <option value="Não começou">Não começou</option>
                    <option value="Em progresso">Em progresso</option>
                    <option value="Quase concluído">Quase concluído</option>
                    <option value="Concluído">Concluído</option>
                </select>
            </div>
            <div>
                <label>Detalhes do progresso:</label>
                <textarea name="detalhes_progresso" value={formData.detalhes_progresso} onChange={handleFormChange} maxLength={50} required></textarea>
            </div>

            <h2>Seção 6: Avaliação Geral</h2>
            <div>
                <label>Avaliação Geral do Comportamento e Progresso do Aluno:</label>
                <select name="avaliacao_geral" value={formData.avaliacao_geral} onChange={handleFormChange} required>
                    <option value="">Selecione uma opção</option>
                    <option value="Muito Insatisfatório">Muito Insatisfatório</option>
                    <option value="Insatisfatório">Insatisfatório</option>
                    <option value="Neutro">Neutro</option>
                    <option value="Satisfatório">Satisfatório</option>
                    <option value="Muito Satisfatório">Muito Satisfatório</option>
                </select>
            </div>
            <div>
                <label>Comentários:</label>
                <textarea name="comentarios" value={formData.comentarios} onChange={handleFormChange} maxLength={50}></textarea>
            </div>
            
            <div className="button-group">
                <button type="button" onClick={() => setIsModalOpen(false)}>Voltar</button>
                <button type="submit">Enviar Avaliação</button>
            </div>
        </form>
    );

    return (
        <div className={styles.acompanhamentoPsico}>
            <Menu userRole="psicologo" />
            <h1>Acompanhamento do Psicólogo</h1>
            <div className={styles.listaAluno}>
                {renderStudentList()}
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Avaliar Aluno"
                className="modal"
                overlayClassName={styles.overlay}
            >
                {selectedStudent && renderEvaluationForm()}
            </Modal>
        </div>
    );
};

export default PsicologoAcompanhamento;