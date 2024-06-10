import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { UserContext } from "../../contexts/UserContext";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import React, { useContext } from "react";
import Axios from "axios";
import * as yup from "yup";
import styles from './login.module.css';
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
        <div className={styles.container}>
            <h1 className={styles.title}>Login</h1>
            <Formik initialValues={{ email: '', senha: '' }} onSubmit={handleLogin} validationSchema={validationsLogin}>
                <Form className={styles.loginForm}>
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
                    <button className={styles.button} type="submit">Login</button>
                </Form>
            </Formik>
            <div className='botaocon'>
                <Link to={'/'}>
                    <button className={styles.button}>Voltar</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;