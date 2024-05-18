//import { useState } from "react";
import './styles.css';
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";
import { Link } from "react-router-dom";

function Cadastro() {

    const handleRegister = (values) => {
        Axios.post("https://projeto-renovacao.web.app/cadastro", {
            nome: values.nome,
            email: values.email,
            senha: values.senha,
            confirmsenha: values.confirmsenha,
            matricula: values.matricula,
            tipoUsuario: values.tipoUsuario,

        }).then((response) => {
            alert(response.data.msg);
            console.log(response);
        });
    };


    const validationsRegister = yup.object().shape({
        nome: yup.string().required("O nome é obrigatório"),
        email: yup.string().email("email inválido").required("O email é obrigatório"),
        senha: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("A senha é obrigatória"),
        senhaconfirm: yup.string().oneOf([yup.ref("senha"), null], "As senhas são diferentes").required("A confirmação da senha é obrigatória"),
        matricula: yup.number().required("Este campo é obrigatorio"),
        tipoUsuario: yup.string().required("Este campo é obrigatorio"),
    });

    return (
        <div className="container">
            <div className='header'>
                <header className='header'></header>
            </div>
            <h1>Cadastro</h1>
            <Formik
                initialValues={{}}
                onSubmit={handleRegister}
                validationSchema={validationsRegister}
            >
               <Form className='login-form'>
                    <div className='login-form-group'>
                        <Field name="nome" className="form-field" placeholder="Nome Completo" />
                        <ErrorMessage component="span" name="nome" className='form-error' />
                    </div>
                    <div className='login-form-group'>
                        <Field name="email" className="form-field" placeholder="Email" />
                        <ErrorMessage component="span" name="email" className='form-error' />
                    </div>
                    <div className='login-form-group'>
                        <Field name="senha" className="form-field" placeholder="Senha" />
                        <ErrorMessage component="span" name="senha" className='form-error' />
                    </div>
                    <div className='login-form-group'>
                        <Field name="senhaconfirm" className="form-field" placeholder="Confirme sua Senha" />
                        <ErrorMessage component="span" name="senhaconfirm" className='form-error' />
                    </div>
                    <div className='login-form-group'>
                        <Field name="matricula" className="form-field" placeholder="Matricula" />
                        <ErrorMessage component="span" name="senhaconfirm" className='form-error' />
                    </div>
                    <div className='login-form-group'>
                        <Field as="select" name="tipoUsuario" className="form-field">
                            <option value="">Escolha o tipo de usuário</option>
                            <option value="aluno">Aluno</option>
                            <option value="administrador">Administrador</option>
                            <option value="psicologo">Psicologo</option>
                        </Field>
                        <ErrorMessage component="span" name="tipoUsuario" className='form-error' />
                    </div>
                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </Form>
               
            </Formik>
            <Link to={'/login'}>
                <button className='button'>
                    Cancelar
                </button>
            </Link>
        </div>
    );
}

export default Cadastro;
