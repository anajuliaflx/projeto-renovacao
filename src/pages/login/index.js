import React, { useContext } from "react";
import "./styles.css";
import * as yup from "yup";
import { Formik, Form } from "formik";
import api from '../../componentes/api/apiConfig';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../contexts/UserContext';
import EmailIcon from '@mui/icons-material/Email'; // Ícone de email
import LockIcon from '@mui/icons-material/Lock'; // Ícone de senha
import Button from "../../componentes/botao";
import LockOpenIcon from '@mui/icons-material/Lock';
import CancelIcon from '@mui/icons-material/Cancel';
import Input from "../../componentes/input";

function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    // Função para realizar o login
    const handleLogin = async (values) => {
        try {
            const response = await api.post("/login", {
                email: values.email,
                senha: values.senha,
            });

            if (response.status === 200 && response.data) {
                const userType = response.data.tipoUsuario;
                const userData = {
                    nome: response.data.nome,
                    matricula: response.data.matricula,
                    tipoUsuario: userType,
                    email: response.data.email,
                };
                setUser(userData); // Armazena o usuário no contexto

                // Navega para a página adequada com base no tipo de usuário
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
            }
        } catch (error) {
            // Verifica se o status do erro é 403 (usuário já logado)
            if (error.response && error.response.status === 403) {
                alert("Usuário já está logado em outro dispositivo. Por favor, faça logout antes de tentar novamente.");
            } else if (error.response && error.response.data && error.response.data.msg) {
                // Exibe mensagens de erro retornadas pela API
                alert(error.response.data.msg);
            } else {
                console.error("Houve um erro na requisição de login:", error);
                alert('Ocorreu um erro. Por favor, tente novamente.');
            }
        }
    };

    const validationsLogin = yup.object().shape({
        email: yup.string().email("Email inválido").required("O email é obrigatório"),
        senha: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("A senha é obrigatória"),
    });

    return (
        <div className="container">
            <h1 className="pageTitle">Acessar</h1>
            <p className="pageSubtitle">Insira seus dados para acesso</p>
            <Formik initialValues={{ email: '', senha: '' }} onSubmit={handleLogin} validationSchema={validationsLogin}>
                <Form className="formContainer">
                    <div className="formGroup">
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
                            icon={LockIcon}
                            placeholder="Senha *"
                            required
                        />
                    </div>
                    <Button
                        id="continuar"
                        label={<><LockOpenIcon /> Continuar</>}
                        type="submit"
                    />
                    <div />
                </Form>

            </Formik>
            <Button
                id="cancelar"
                label={<><CancelIcon /> Cancelar</>}
                to="/"
                type="submit"
            />
        </div>
    );
}

export default Login;