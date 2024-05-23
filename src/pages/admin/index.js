import Menu from '../../componentes/menu';
import './styles.css';

function Administrador() {

  return (
    <div className='container'>
      <Menu userRole="administrador" />
      <div className='text'>
        <h1>Administrador</h1>
        <p>
          A RenovAção surgiu como intuito de auxiliar as IES - Instituições de Ensino Superior a ajudar, aconselhar e reintegrar o aluno agressor - aquele que praticou bully/cyberbully com algum colega ou pessoa ligada a IES - ao ambiente educacional onde o mesmo não venha mais a praticar tais atos de violência contra as demais pessoas.
          Com a utilização de trilhas de aprendizado e consultas avaliativas com psicólogos para ajudar na descoberta do motivo por trás dos atos dos agressores, criando assim junto da IES trilhas de aprendizado para o aluno, onde as mesmas irão se informar das consequências dos seus atos e assim não repetir seus atos. Seguindo ainda como psicólogo irá fazer o acompanhamento da evolução do aluno, para assim dar “alta” ao mesmo.
        </p>
      </div>
    </div>

  );
}

export default Administrador;