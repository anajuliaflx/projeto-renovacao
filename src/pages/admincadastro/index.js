import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from "formik";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PeopleIcon from '@mui/icons-material/People';
import Menu from '../../componentes/menu';
import styles from './cadastro.module.css';
import './styles.css';
import Axios from "axios";
import * as yup from "yup";

const apiUrl = process.env.REACT_APP_API_URL;

function AdministradorCadastro() {
    const [userExists, setUserExists] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const handleRegister = (values, { resetForm }) => {
        Axios.post(`https://projeto-renovacao.web.app/admincadastro`, {
            nome: values.nome,
            email: values.email,
            senha: values.senha,
            confirmsenha: values.confirmsenha,
            matricula: values.matricula,
            tipoUsuario: values.tipoUsuario,
        }).then((response) => {
            alert(response.data.msg);
            console.log(response);
            if (response.data.msg === "Usuário cadastrado com sucesso") {
                setUserExists(false);
                setErrorMsg("");
                resetForm(); // Limpar os valores do formulário apenas se o cadastro for bem-sucedido
            } else if (response.data.msg === "Email ou matrícula já cadastrados") {
                setUserExists(true);
                setErrorMsg(response.data.msg);
            }
        }).catch(error => {
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
        <div className={styles.container}>
            <Menu userRole="administrador" />
            <h1>Cadastro</h1>
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
                <Form className={styles.loginForm}>
                    <div className={styles.loginFormGroup}>
                        <div className={styles.inputWithIcon}>
                            <PersonIcon className={styles.icon} />
                            <Field name="nome" className={styles.formField} placeholder="Nome Completo" />
                        </div>
                        <ErrorMessage component="span" name="nome" className={styles.formError} />
                    </div>
                    <div className={styles.loginFormGroup}>
                        <div className={styles.inputWithIcon}>
                            <EmailIcon className={styles.icon} />
                            <Field name="email" className={styles.formField} placeholder="Email" />
                        </div>
                        <ErrorMessage component="span" name="email" className={styles.formError} />
                    </div>
                    <div className={styles.loginFormGroup}>
                        <div className={styles.inputWithIcon}>
                            <LockIcon className={styles.icon} />
                            <Field name="senha" className={styles.formField} type="password" placeholder="Senha" />
                        </div>
                        <ErrorMessage component="span" name="senha" className={styles.formError} />
                    </div>
                    <div className={styles.loginFormGroup}>
                        <div className={styles.inputWithIcon}>
                            <LockIcon className={styles.icon} />
                            <Field name="confirmsenha" className={styles.formField} type="password" placeholder="Confirme sua senha" />
                        </div>
                        <ErrorMessage component="span" name="confirmsenha" className={styles.formError} />
                    </div>
                    <div className={styles.loginFormGroup}>
                        <div className={styles.inputWithIcon}>
                            <AssignmentIndIcon className={styles.icon} />
                            <Field name="matricula" className={styles.formField} placeholder="Matrícula" maxLength="8" />
                        </div>
                        <ErrorMessage component="span" name="matricula" className={styles.formError} />
                    </div>
                    <div className={styles.loginFormGroup}>
                        <div className={styles.inputWithIcon}>
                            <PeopleIcon className={styles.icon} />
                            <Field as="select" name="tipoUsuario" className={styles.formField}>
                                <option value="">Escolha o tipo de usuário</option>
                                <option value="aluno">Aluno</option>
                                <option value="administrador">Administrador</option>
                                <option value="psicologo">Psicologo</option>
                            </Field>
                        </div>
                        <ErrorMessage component="span" name="tipoUsuario" className={styles.formError} />
                    </div>
                    {userExists && <span className={styles.formError}>{errorMsg}</span>}
                    <button className={styles.button} type="submit">
                        Cadastrar
                    </button>
                </Form>

            </Formik>
            <Link to={'/adminusuario'}>
                <button className={styles.buttonCancel}>
                    Cancelar
                </button>
            </Link>
        </div>
    );
}

export default AdministradorCadastro;