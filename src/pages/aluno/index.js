import Menu from '../../componentes/menu';
import './styles.css';

function Aluno() {

  return (
    <div className="container">
      <Menu />
      <div className="containerHome">
        <h1 className="pageTitle">Bem-vindo ao Projeto Renovação!</h1>
        <div className="pageText">
          <p>
            Explore nossa Trilha Educativa com vídeos informativos sobre ciberbullying, suas consequências e formas de prevenção. Consulte o cronograma de consultas psicológicas e atividades na sua Agenda. Utilize o sistema de Mensagens para se comunicar de forma segura e privada com administradores e psicólogos.
          </p>
          <p>Estamos aqui para apoiar você em cada passo.</p>
        </div>
      </div>
    </div>
  );
}

export default Aluno;