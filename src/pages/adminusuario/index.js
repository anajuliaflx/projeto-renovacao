import React, { useState, useEffect } from "react";
import Menu from '../../componentes/menu';
import api from '../../componentes/api/apiConfig'; // Configuração do axios
import "./styles.css";
import Button from "../../componentes/botao";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';

const AdministradorUsuario = () => {
    const UserList = () => {
        const [users, setUsers] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [totalPages, setTotalPages] = useState(1);
        const usersPerPage = 10; // Total de elementos por página

        useEffect(() => {
            fetchUsers(currentPage);
        }, [currentPage]);

        const fetchUsers = async (page) => {
            try {
                const response = await api.get(`/adminusuario?page=${page}&limit=${usersPerPage}`);
                if (response.data && response.data.users) {
                    setUsers(response.data.users);
                    setTotalPages(response.data.totalPages);
                } else {
                    console.log("Nenhum dado de usuário encontrado.");
                }
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };

        const deleteUser = async (userId) => {
            const confirmDelete = window.confirm("Tem certeza de que deseja excluir este usuário?");
            if (confirmDelete) {
                try {
                    await api.delete(`/adminusuario/${userId}`);
                    fetchUsers(currentPage); // Atualiza a lista de usuários após a exclusão
                } catch (error) {
                    console.error("Erro ao excluir usuário:", error);
                }
            }
        };

        return (
            <div className="container">
                <Menu />
                <h1 className="pageTitle">Gerenciar usuários</h1>
                <p className="pageSubtitle">Aqui você pode visualizar todos os usuários cadastrados e adicionar novos usuários através do botão 'Cadastrar novo usuário'.</p>
                <Button
                    id="cadastrar-usuario"
                    label={<><PersonAddAlt1Icon /> Cadastrar novo usuário</>}
                    to="/admincadastro"
                />
                <h2>Lista de usuários</h2>
                {users.length > 0 ? (
                    <div className="table-container">
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>Nome completo</th>
                                    <th>Matrícula do usuário</th>
                                    <th>Perfil do usuário</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.nome}</td>
                                        <td>{user.matricula}</td>
                                        <td>{user.tipoUsuario}</td>
                                        <td>
                                            <Button
                                                id="remover-usuario"
                                                label={<DeleteIcon />}
                                                type="button"
                                                onClick={() => deleteUser(user.id)}
                                                aria-label="Remover usuário"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Nenhum usuário cadastrado.</p>
                )}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        );
    };

    const Pagination = ({ currentPage, totalPages, onPageChange }) => {
        const handlePrevPage = () => {
            if (currentPage > 1) {
                onPageChange(currentPage - 1);
            }
        };

        const handleNextPage = () => {
            if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
            }
        };

        return (
            <div className="pageNavigation">
                <Button
                    id="pagina-anterior"
                    label={<ArrowBackIcon />}
                    type="button"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    aria-label="Ir para a página anterior"
                />

                <span>
                    Página {currentPage} de {totalPages}
                </span>

                <Button
                    id="proxima-pagina"
                    label={<ArrowForwardIcon />}
                    type="button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || totalPages === 1}
                    aria-label="Ir para a próxima página"
                />
            </div>
        );
    };

    return (
        <div>
            <UserList />
        </div>
    );
};

export default AdministradorUsuario;