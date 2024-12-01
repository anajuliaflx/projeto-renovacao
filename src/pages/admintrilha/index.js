import React, { useState } from "react";
import api from '../../componentes/api/apiConfig';
import Modal from 'react-modal';
import Menu from '../../componentes/menu';
import styles from './adminTrilha.module.css';
import Button from "../../componentes/botao";
import LinkIcon from '@mui/icons-material/Link';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

Modal.setAppElement('#root');

const AdministradorTrilha = () => {
  const [tituloTrilha, setTituloTrilha] = useState('');
  const [descricaoTrilha, setDescricaoTrilha] = useState('');
  const [links, setLinks] = useState([{ url: '', titulo: '', descricao: '' }]);
  const [trilhaId, setTrilhaId] = useState(null);
  const [feedbackTrilha, setFeedbackTrilha] = useState('');
  const [matriculaAlunoTrilha, setMatriculaAlunoTrilha] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitTrilha = async (e) => {
    e.preventDefault();

    if (matriculaAlunoTrilha.length !== 8) {
      setFeedbackTrilha('A matrícula do aluno deve ter exatamente 8 caracteres.');
      return;
    }

    try {
      const response = await api.post('/adicionar-trilha', {
        titulo: tituloTrilha,
        descricao: descricaoTrilha,
        matricula_aluno: matriculaAlunoTrilha,
      });
      if (response.data) {
        setFeedbackTrilha(response.data.msg);
        setTrilhaId(response.data.trilhaId);
        setTituloTrilha('');
        setDescricaoTrilha('');
        setMatriculaAlunoTrilha('');
        setIsModalOpen(true);  // Abre o modal ao adicionar a trilha com sucesso
      }
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
        api.post('/adicionar-link', {
          url: link.url,
          titulo: link.titulo,
          descricao: link.descricao,
          trilha_id: trilhaId,
        })
      ));
      setFeedbackTrilha('Links adicionados com sucesso');
      setLinks([{ url: '', titulo: '', descricao: '' }]);
      setIsModalOpen(false);  // Fecha o modal após adicionar os links com sucesso
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
    <div className="container">
      <Menu />
      <h1 className="pageTitle">Gerenciar trilha educativa</h1>
      <p className="pageSubtitle">Preencha os dados abaixo para cadastrar uma trilha educativa para os alunos.</p>
      <div className="formContainer">
        <form onSubmit={handleSubmitTrilha} className={styles.form}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              value={tituloTrilha}
              onChange={(e) => setTituloTrilha(e.target.value)}
              required
              className={styles.inputText}
            />
          </div>
          <div>
            <label>Descrição:</label>
            <textarea
              value={descricaoTrilha}
              onChange={(e) => setDescricaoTrilha(e.target.value)}
              required
              className={styles.textarea}
            />
          </div>
          <div>
            <label>Matrícula do Aluno:</label>
            <input
              type="number"
              value={matriculaAlunoTrilha}
              onChange={(e) => setMatriculaAlunoTrilha(e.target.value)}
              maxLength="8"
              required
              className={styles.inputText}
            />
          </div>
          <Button
            id="adicionar-trilha"
            label={<><AddIcon /> Adicionar trilha</>}
            type="submit"
          />
        </form>
        {feedbackTrilha && <p>{feedbackTrilha}</p>}
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Adicionar Links"
        className={styles.modal}
        overlayClassName={styles.overlay}
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
                className={styles.inputText}
              />
              <label>Título:</label>
              <input
                type="text"
                name="titulo"
                value={link.titulo}
                onChange={(e) => handleLinkChange(index, e)}
                required
                className={styles.inputText}
              />
              <label>Descrição:</label>
              <textarea
                name="descricao"
                value={link.descricao}
                onChange={(e) => handleLinkChange(index, e)}
                required
                className={styles.textarea}
              />
            </div>
          ))}
          <Button
            id="adicionar-novo-link"
            label={<><LinkIcon /> Adicionar novo link</>}
            type="button"
            onClick={() => handleAddLink}  // Botão para adicionar novo link
          />
          <Button
            id="cadastrar-links"
            label={<><SaveIcon /> Salvar Links</>}
            type="submit"
          />
        </form>
      </Modal>
    </div>
  );
};

export default AdministradorTrilha;