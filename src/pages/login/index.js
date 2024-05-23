import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from "formik";
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import React from "react";
import Axios from "axios";
import * as yup from "yup";
import "./styles.css";



function Login() {
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        try {
            const response = await Axios.post("https://projeto-renovacao.web.app/login", {
                email: values.email,
                senha: values.senha,
            });

            console.log("Response data:", response.data); // Log para depuração

            if (response.status === 200 && response.data) {
                const userType = response.data.tipoUsuario;
                if (userType) {
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
                    alert('Erro ao obter o tipo de usuário. Por favor, tente novamente.');
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
        email: yup
            .string()
            .email("Email inválido")
            .required("O email é obrigatório"),
        senha: yup
            .string()
            .min(8, "A senha deve ter pelo menos 8 caracteres")
            .required("A senha é obrigatória"),
    });

    return (
        <div className="container">
            <h1>Login</h1>
            <Formik
                initialValues={{ email: '', senha: '' }}
                onSubmit={handleLogin}
                validationSchema={validationsLogin}
            >
                <Form className="login-form">
                    <div className="login-form-group">
                        {/*<EmailIcon /> */}
                        <Field name="email" className="form-field" placeholder="Email" />
                        <ErrorMessage
                            component="span"
                            name="email"
                            className="form-error"
                        />
                    </div>
                    <div className="login-form-group">
                        {/*<PasswordIcon /> */}
                        <Field name="senha" className="form-field" type="password" placeholder="Senha" />
                        <ErrorMessage
                            component="span"
                            name="senha"
                            className="form-error"
                        />
                    </div>
                    <button className="button" type="submit">Login</button>
                </Form>
            </Formik>
            <div className='botao'>
                <Link to={'/cadastro'}>
                    <button className='button'>Cadastrar</button>
                </Link>
                <Link to={'/'}>
                    <button className='button'>Voltar</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;
