import React, { useState } from "react";
import { Formik, Form } from "formik";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PeopleIcon from '@mui/icons-material/People';
import './styles.css';
import api from '../../componentes/api/apiConfig';
import * as yup from "yup";
import Menu from '../../componentes/menu';
import Button from "../../componentes/botao";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import Input from "../../componentes/input";
import Select from "../../componentes/select";

function AdministradorCadastro() {
    const [userExists, setUserExists] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const handleRegister = (values, { resetForm }) => {
        api.post(`/api/admincadastro`, {
            nome: values.nome,
            email: values.email,
            senha: values.senha,
            confirmsenha: values.confirmsenha,
            matricula: values.matricula,
            tipoUsuario: values.tipoUsuario,
        })
            .then(response => {
                alert(response.data.msg);
                if (response.data.msg === "Usuário cadastrado com sucesso") {
                    setUserExists(false);
                    setErrorMsg("");
                    resetForm();
                } else if (response.data.msg === "Email ou matrícula já cadastrados") {
                    setUserExists(true);
                    setErrorMsg(response.data.msg);
                }
            })
            .catch(error => {
                console.error('Erro ao cadastrar:', error);
            });
    };
    const validationsRegister = yup.object().shape({
        nome: yup.string().required("O nome é obrigatório"),
        email: yup.string().email("Email inválido").required("O email é obrigatório"),
        senha: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("A senha é obrigatória"),
        confirmsenha: yup.string().oneOf([yup.ref("senha"), null], "As senhas são diferentes").required("A confirmação da senha é obrigatória"),
        matricula: yup.string().max(8, "A matrícula deve ter 8 caracteres").required("A matrícula é obrigatória"),
        tipoUsuario: yup.string().required("Este campo é obrigatório"),
    });

    return (
        <div className="container">
            <Menu />
            <h1 className="pageTitle">Cadastrar novo usuário</h1>
            <p className="pageSubtitle">Preencha os dados solicitados abaixo para realizar o cadastro</p>
            <Formik
                initialValues={{
                    nome: '',
                    email: '',
                    senha: '',
                    confirmsenha: '',
                    matricula: '',
                    tipoUsuario: ''
                }}
                onSubmit={handleRegister}
                validationSchema={validationsRegister}
            >
                <Form className="formContainer">
                    <div className="formGroup">
                        <Input
                            id="nome"
                            name="nome"
                            type="text"
                            icon={PersonIcon}
                            placeholder="Nome completo *"
                            required
                        />

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            icon={EmailIcon}
                            placeholder="Email *"
                            required
                        />

                        <Input
                            id="senha"
                            name="senha"
                            type="password"
                            icon={PasswordIcon}
                            placeholder="Senha* "
                            required
                        />

                        <Input
                            id="confirmar-senha"
                            name="confirmsenha"
                            type="password"
                            icon={PasswordIcon}
                            placeholder="Confirme a senha *"
                            required
                        />

                        <Input
                            id="matricula"
                            name="matricula"
                            type="number"
                            icon={AssignmentIndIcon}
                            maxLength={8}
                            placeholder="Matrícula *"
                            required
                        />

                        <Select
                            id="tipo-usuario"
                            name="tipoUsuario"
                            placeholder="Escolha o tipo de usuário *"
                            options={[
                                { value: 'administrador', label: 'Administrador' },
                                { value: 'aluno', label: 'Aluno' },
                                { value: 'psicologo', label: 'Psicólogo' }
                            ]}
                            icon={PeopleIcon}
                            required
                        />
                    </div>
                    <Button
                        id="cadastrar-usuario"
                        label={<><AddIcon /> Cadastrar usuário</>}
                        type="submit"
                    />
                </Form>
            </Formik>
            <Button
                id="cancelar"
                label={<><CancelIcon /> Cancelar</>}
                to="/adminusuario"
            />
        </div>
    );
}

export default AdministradorCadastro;