import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { UserContext } from "../../contexts/UserContext";
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
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

            console.log("Response data:", response.data); // Log para depuração

            if (response.status === 200 && response.data) {
                const userType = response.data.tipoUsuario;
                const matricula = response.data.matricula;
                if (userType && matricula) {
                    // Atualize o contexto do usuário com os dados recebidos
                    setUser({
                        tipoUsuario: userType,
                        matricula: matricula
                    });

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
                    alert('Erro ao obter o tipo de usuário ou matrícula. Por favor, tente novamente.');
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
                        <div className="input-with-icon">
                            <EmailIcon className="icon" />
                            <Field name="email" className="form-field" placeholder="Email" />
                        </div>
                        <ErrorMessage
                            component="span"
                            name="email"
                            className="form-error"
                        />
                    </div>
                    <div className="login-form-group">
                        <div className="input-with-icon">
                            <PasswordIcon className="icon" />
                            <Field name="senha" className="form-field" type="password" placeholder="Senha" />
                        </div>
                        <ErrorMessage
                            component="span"
                            name="senha"
                            className="form-error"
                        />
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