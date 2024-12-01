import React from "react";
import { Formik, Form } from "formik";
import api from '../../componentes/api/apiConfig';
import Menu from '../../componentes/menu';
import Button from "../../componentes/botao";
import SaveIcon from '@mui/icons-material/Save';
import Input from "../../componentes/input";
import * as yup from 'yup';
import './styles.css';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';

const AdministradorCronograma = () => {
  const handleSubmitEvento = async (values, { resetForm }) => {
    try {
      const response = await api.post('/adicionar-evento', {
        data_evento: values.data,
        matricula_aluno: values.matriculaAluno,
        matricula_psicologo: values.matriculaPsicologo,
        descricao: values.descricao,
      });
      alert(response.data.msg);
      resetForm();
    } catch (error) {
      alert('Erro ao adicionar o evento.');
    }
  };

  const validations = yup.object().shape({
    data: yup.string().required('A data do evento é obrigatória'),
    matriculaAluno: yup.string().length(8, 'A matrícula do aluno deve ter 8 caracteres').required('A matrícula do aluno é obrigatória'),
    matriculaPsicologo: yup.string().length(8, 'A matrícula do psicólogo deve ter 8 caracteres').required('A matrícula do psicólogo é obrigatória'),
    descricao: yup.string().required('A descrição do evento é obrigatória'),
  });

  return (
    <div className="container">
      <Menu />
      <h1 className="pageTitle">Gerenciar cronograma</h1>
      <p className="pageSubtitle">Preencha os dados solicitados abaixo para adicionar um novo cronograma</p>  
      <Formik
        initialValues={{
          data: '',
          matriculaAluno: '',
          matriculaPsicologo: '',
          descricao: '',
        }}
        onSubmit={handleSubmitEvento}
        validationSchema={validations}
      >
        <Form className="formContainer">
        <div className="formGroup">
            <Input
              id="data"
              name="data"
              type="date"
              icon={EventIcon}
              placeholder="Data do evento *"
              required
            />

            <Input
              id="matriculaAluno"
              name="matriculaAluno"
              type="text"
              icon={AssignmentIndIcon}
              maxLength={8}
              placeholder="Matrícula do aluno *"
              required
            />

            <Input
              id="matriculaPsicologo"
              name="matriculaPsicologo"
              type="text"
              icon={AssignmentIndIcon}
              maxLength={8}
              placeholder="Matrícula do psicólogo *"
              required
            />

            <Input
              id="descricao"
              name="descricao"
              as="textarea"
              icon={DescriptionIcon}
              maxLength={100}
              placeholder="Descrição *"
              required
            />
          </div>

          <Button
            id="cadastrar-cronograma"
            label={<><SaveIcon /> Cadastrar cronograma</>}
            type="submit"
          />
        </Form>
      </Formik>
    </div>
  );
};

export default AdministradorCronograma;