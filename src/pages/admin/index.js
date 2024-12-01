import Menu from '../../componentes/menu';
import './styles.css';

function Administrador() {

  return (
    <div className="container">
      <Menu />
      <div className="containerHome">
        <h1 className="pageTitle">Bem-vindo ao Projeto Renovação!</h1>
        <div className="pageText">
          <p>
            Gerencie seu ambiente com eficiência utilizando nossas funcionalidades: crie e organize um calendário de eventos, incluindo consultas, workshops e atividades de prevenção ao ciberbullying; visualize e cadastre novos usuários, atribua papéis e configure permissões de acesso; acesse relatórios detalhados sobre casos de ciberbullying avaliados pelos psicólogos; responda a dúvidas dos alunos por meio de mensagens internas.
          </p>
          <p>Conte conosco para promover um ambiente seguro e acolhedor.</p>
        </div>
      </div>
    </div>

  );
}

export default Administrador;