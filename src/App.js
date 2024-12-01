import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import { UserProvider } from './contexts/UserContext';
import Header from './componentes/header';
import Home from './pages/home';
import Login from './pages/login';
import TrocarSenha from './pages/trocarsenha';
import Administrador from './pages/admin';
import AdministradorCronograma from './pages/admincronograma';
import AdministradorTrilha from './pages/admintrilha';
import AdministradorUsuario from './pages/adminusuario';
import AdministradorCadastro from './pages/admincadastro';
import AdministradorMensagem from './pages/adminmensagem';
import Aluno from './pages/aluno';
import AlunoTrilha from './pages/alunotrilha';
import AlunoCronograma from './pages/alunocronograma';
import AlunoMensagem from './pages/alunomensagem';
import Psicologo from './pages/psicologo';
import PsicologoCronograma from './pages/psicologocronograma';
import PsicologoAcompanhamento from './pages/psicologoacompanhamento';
import PsicologoRelatorio from './pages/psicologorelatorio';
import PsicologoMensagem from './pages/psicologomensagem';
import Footer from './componentes/footer';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/trocarsenha" element={<TrocarSenha />} />
            <Route path="/administrador" element={<Administrador />} />
            <Route path="/admincronograma" element={<AdministradorCronograma />} />
            <Route path="/admintrilha" element={<AdministradorTrilha />} />
            <Route path="/adminusuario" element={<AdministradorUsuario />} />
            <Route path="/admincadastro" element={<AdministradorCadastro />} />
            <Route path="/adminmensagem" element={<AdministradorMensagem />} />
            <Route path="/aluno" element={<Aluno />} />
            <Route path="/alunotrilha" element={<AlunoTrilha />} />
            <Route path="/alunocronograma" element={<AlunoCronograma />} />
            <Route path="/alunomensagem" element={<AlunoMensagem />} />
            <Route path="/psicologo" element={<Psicologo />} />
            <Route path="/psicologocronograma" element={<PsicologoCronograma />} />
            <Route path="/psicologorelatorio" element={<PsicologoRelatorio />} />
            <Route path="/psicologoacompanhamento" element={<PsicologoAcompanhamento />} />
            <Route path="/psicologomensagem" element={<PsicologoMensagem />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;