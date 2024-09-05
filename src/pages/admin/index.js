import Menu from '../../componentes/menu';
import './styles.css';
import styles from '../home/home.module.css';

function Administrador() {

  return (
    <div className={styles.container}>
      <Menu userRole="administrador" />
      <div className={styles.text}>
        <h1>Bem-vindo ao Projeto Renovação!</h1>
        <p>
          Gerencie seu ambiente com eficiência utilizando nossas funcionalidades: crie e organize um calendário de eventos, incluindo consultas, workshops e atividades de prevenção ao ciberbullying; visualize e cadastre novos usuários, atribua papéis e configure permissões de acesso; acesse relatórios detalhados sobre casos de ciberbullying avaliados pelos psicólogos; responda a dúvidas dos alunos por meio de mensagens internas.
        </p>
        <p>Conte conosco para promover um ambiente seguro e acolhedor.</p>
      </div>
    </div>

  );
}

export default Administrador;