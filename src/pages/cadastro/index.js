import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from "formik";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PeopleIcon from '@mui/icons-material/People';
import './styles.css';
import Axios from "axios";
import * as yup from "yup";

const apiUrl = process.env.REACT_APP_API_URL;

function Cadastro() {
    const [userExists, setUserExists] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const handleRegister = (values, { resetForm }) => {    
        Axios.post(`https://projeto-renovacao.web.app/cadastro`, {
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
        <div className="container">
            <h1>Cadastro</h1>
            <Formik
                initialValues={{ // Definindo valores iniciais para todos os campos
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
                <Form className='login-form'>
                    <div className='login-form-group'>
                        <div className="input-with-icon">
                            <PersonIcon className="icon"/>
                            <Field name="nome" className="form-field" placeholder="Nome Completo" />
                        </div>
                        <ErrorMessage component="span" name="nome" className='form-error' />
                    </div>
                    <div className='login-form-group'>
                        <div className="input-with-icon">
                            <EmailIcon className="icon"/>
                            <Field name="email" className="form-field" placeholder="Email" />
                        </div>
                        <ErrorMessage component="span" name="email" className='form-error' />
                    </div>
                    <div className='login-form-group'>
                        <div className="input-with-icon">
                            <PasswordIcon className="icon"/>
                            <Field name="senha" className="form-field" type="password" placeholder="Senha" />
                        </div>
                        <ErrorMessage component="span" name="senha" className='form-error' />
                    </div>
                    <div className='login-form-group'>
                        <div className="input-with-icon">
                            <PasswordIcon className="icon"/>
                            <Field name="confirmsenha" className="form-field" type="password" placeholder="Confirme sua senha" />
                        </div>
                        <ErrorMessage component="span" name="confirmsenha" className='form-error' />
                    </div>
                    <div className='login-form-group'>
                        <div className="input-with-icon">
                            <AssignmentIndIcon className="icon"/>
                            <Field name="matricula" className="form-field" placeholder="Matrícula" maxLength="8" />
                        </div>
                        <ErrorMessage component="span" name="matricula" className='form-error' />
                    </div>
                    <div className='login-form-group'>
                        <div className="input-with-icon">
                            <PeopleIcon className="icon"/>
                            <Field as="select" name="tipoUsuario" className="form-field">
                            <option value="">Escolha o tipo de usuário</option>
                            <option value="aluno">Aluno</option>
                            <option value="administrador">Administrador</option>
                            <option value="psicologo">Psicologo</option>
                        </Field>
                        </div>
                        <ErrorMessage component="span" name="tipoUsuario" className='form-error' />
                    </div>
                    {userExists && <span className="form-error">{errorMsg}</span>}
                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </Form>

            </Formik>
            <Link to={'/admincadastro'}>
                <button className='button'>
                    Cancelar
                </button>
            </Link>
        </div>
    );
}

export default Cadastro;