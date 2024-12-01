import './styles.css';
import Button from '../../componentes/botao';
import logo from '../../img/logo.png'

function Home() {

  return (
    <div className="container">
      <div className="containerHome">
        <img src={logo} alt="Logo RenovAção" className="imgHome" />
        <div className="pageText">
          <p>
            A RenovAção ajuda Instituições de Ensino Superior (IES) a reintegrar alunos que praticaram cyberbullying. Com trilhas de aprendizado e consultas com psicólogos, identificamos as causas dos comportamentos agressivos e informamos os alunos sobre as consequências de seus atos. Psicólogos acompanham a evolução dos alunos até que estejam aptos a conviver pacificamente no ambiente escolar.
          </p>
        </div>
      </div>
      <Button
        id="entrar"
        label="Entrar"
        to="/login"
        type="submit"
      />
    </div>

  );
}

export default Home;