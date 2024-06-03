import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { UserContext } from "../../contexts/UserContext";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import React, { useContext } from "react";
import Axios from "axios";
import * as yup from "yup";
import "./styles.css";

function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogin = async (values) => {
        try {
            const response = await Axios.post("https://projeto-renovacao.web.app/login", {
                email: values.email,
                senha: values.senha,
            });

            if (response.status === 200 && response.data) {
                const userType = response.data.tipoUsuario;
                const userData = {
                    nome: response.data.nome,
                    matricula: response.data.matricula,
                    tipoUsuario: userType
                };
                setUser(userData);

                switch (userType) {
                    case 'administrador':
                        navigate('/administrador');
                        break;
                    case 'aluno':
                        navigate('/aluno');
                        break;
                    case 'psicologo':
                        navigate('/psicologo');
                        break;
                    default:
                        alert('Tipo de usuário desconhecido. Por favor, entre em contato com o suporte.');
                        break;
                }
            } else {
                alert('Credenciais inválidas. Tente novamente.');
            }
        } catch (error) {
            console.error("Houve um erro na requisição de login:", error);
            alert('Ocorreu um erro. Por favor, tente novamente.');
        }
    };

    const validationsLogin = yup.object().shape({
        email: yup.string().email("Email inválido").required("O email é obrigatório"),
        senha: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("A senha é obrigatória"),
    });

    return (
        <div className="container">
            <h1>Login</h1>
            <Formik initialValues={{ email: '', senha: '' }} onSubmit={handleLogin} validationSchema={validationsLogin}>
                <Form className="login-form">
                    <div className="login-form-group">
                        <div className="input-icon">
                            <EmailIcon />
                            <Field name="email" className="form-field" placeholder="Email" />
                        </div>
                        <ErrorMessage component="span" name="email" className="form-error" />
                    </div>
                    <div className="login-form-group">
                        <div className="input-icon">
                            <LockIcon />
                            <Field name="senha" className="form-field" type="password" placeholder="Senha" />
                        </div>
                        <ErrorMessage component="span" name="senha" className="form-error" />
                    </div>
                    <button className="button" type="submit">Login</button>
                </Form>
            </Formik>
            <div className='botaocon'>
                <Link to={'/'}>
                    <button className='button'>Voltar</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;