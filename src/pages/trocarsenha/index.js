import React, { useContext, useState } from "react";
import api from "../../componentes/api/apiConfig";
import Menu from '../../componentes/menu';
import { UserContext } from '../../contexts/UserContext';
import LockIcon from '@mui/icons-material/Lock';
import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PasswordIcon from '@mui/icons-material/Password';
import Input from "../../componentes/input";
import Button from "../../componentes/botao";

const TrocarSenha = () => {
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);

  // Esquema de validação
  const validationsPasswordChange = yup.object().shape({
    oldPassword: yup.string().required("A senha atual é obrigatória"),
    newPassword: yup.string()
      .min(8, "A nova senha deve ter pelo menos 8 caracteres")
      .required("A nova senha é obrigatória"),
    confirmPassword: yup.string()
      .oneOf([yup.ref("newPassword"), null], "As senhas não coincidem")
      .required("A confirmação da nova senha é obrigatória"),
  });

  const handlePasswordChange = async (values, { resetForm }) => {
    try {
      const response = await api.put("/trocarsenha", {
        matricula: user?.matricula,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });

      setMessage(response.data.message || "Senha alterada com sucesso");
      resetForm();
    } catch (error) {
      setMessage(error.response?.data?.error || "Erro ao alterar a senha");
    }
  };

  return (
    <div className="container">
      <Menu />
      <h1 className="pageTitle">Alterar senha</h1>
      <p className="pageSubtitle">Preencha os campos abaixo para alterar sua senha. Certifique-se de que sua nova senha atenda aos requisitos de segurança.</p>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }}
        validationSchema={validationsPasswordChange}
        onSubmit={handlePasswordChange}
      >
        {({ isSubmitting }) => (
          <Form className="formContainer">
            <div className="formGroup">
              <Input
                id="senha-atual"
                name="oldPassword"
                type="password"
                icon={LockIcon}
                placeholder="Senha atual *"
                required
              />

              <Input
                id="nova-senha"
                name="newPassword"
                type="password"
                icon={PasswordIcon}
                placeholder="Nova senha *"
                required
              />

              <Input
                id="confirmar-nova-senha"
                name="confirmPassword"
                type="password"
                icon={PasswordIcon}
                placeholder="Confirme sua senha *"
                required
              />
            </div>
            <Button
              id="redefinir-senha"
              label={<><AutorenewIcon /> Redefinir senha</>}
              disabled={isSubmitting}
              type="submit"
            />
          </Form>
        )}
      </Formik>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TrocarSenha;
