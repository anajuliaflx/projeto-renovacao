import Menu from '../../componentes/menu';
import './styles.css';
import styles from '../home/home.module.css';

function Aluno() {

  return (
    <div className={styles.container}>
      <Menu userRole="aluno" />
      <div className={styles.text}>
        <h1>Bem-vindo ao Projeto Renovação!</h1>
        <p>
          Explore nossa Trilha Educativa com vídeos informativos sobre ciberbullying, suas consequências e formas de prevenção. Consulte o cronograma de consultas psicológicas e atividades na sua Agenda. Utilize o sistema de Mensagens para se comunicar de forma segura e privada com administradores e psicólogos.
        </p>
        <p>Estamos aqui para apoiar você em cada passo.</p>
      </div>
    </div>

  );
}

export default Aluno;