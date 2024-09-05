import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../img/logo.png'
import styles from './home.module.css';

function Home() {

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <img src={logo} alt="Logo RenovAção" className={styles.text_logo} />
        <p>
          A RenovAção ajuda Instituições de Ensino Superior (IES) a reintegrar alunos que praticaram cyberbullying. Com trilhas de aprendizado e consultas com psicólogos, identificamos as causas dos comportamentos agressivos e informamos os alunos sobre as consequências de seus atos. Psicólogos acompanham a evolução dos alunos até que estejam aptos a conviver pacificamente no ambiente escolar.
        </p>

      </div>
      <Link to={'/login'}>
        <button type="submit" className={styles.submitButton}>
          Acessar Conta
        </button>
      </Link>
    </div>

  );
}

export default Home;