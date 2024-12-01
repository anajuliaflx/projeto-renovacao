import Menu from '../../componentes/menu';
import './styles.css';

function Psicologo() {
  return (
    <div className="container">
      <Menu />
      <div className="containerHome">
        <h1 className="pageTitle">Bem-vindo ao Projeto Renovação!</h1>
        <div className="pageText">
          <p>
            Utilize a Agenda para visualizar suas consultas psicológicas agendadas com os alunos; acompanhe o progresso dos alunos, avalie seu bem-estar emocional e ofereça suporte individualizado com nossas ferramentas de Acompanhamento; responda a dúvidas dos alunos através de mensagens seguras e confidenciais.
          </p>
          <p>Conte conosco para apoiar você em cada passo.</p>
        </div>
      </div>
    </div>
  );
}

export default Psicologo;