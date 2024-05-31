import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import React from 'react';
import './App.css';
import Header from './componentes/header';
import Home from './pages/home';
import Login from './pages/login';
import Administrador from './pages/admin';
import AdministradorCronograma from './pages/admincronograma';
import AdministradorUsuario from './pages/adminusuario';
import AdministradorCadastro from './pages/admincadastro';
import AdministradorRelatorio from './pages/adminrelatorio';
import AdministradorMensagem from './pages/adminmensagem';
import Aluno from './pages/aluno';
import AlunoTrilha from './pages/alunotrilha';
import AlunoAgenda from './pages/alunoagenda';
import AlunoMensagem from './pages/alunomensagem';
import Psicologo from './pages/psicologo';
import PsicologoAgenda from './pages/psicologoagenda';
import PsicologoAcompanhamento from './pages/psicologoacompanhamento';
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
            <Route path="/administrador" element={<Administrador />} />
            <Route path="/admincronograma" element={<AdministradorCronograma />} />
            <Route path="/adminusuario" element={<AdministradorUsuario />} />
            <Route path="/admincadastro" element={<AdministradorCadastro />} />
            <Route path="/adminrelatorio" element={<AdministradorRelatorio />} />
            <Route path="/adminmensagem" element={<AdministradorMensagem />} />
            <Route path="/aluno" element={<Aluno />} />
            <Route path="/alunotrilha" element={<AlunoTrilha />} />
            <Route path="/alunoagenda" element={<AlunoAgenda />} />
            <Route path="/alunomensagem" element={<AlunoMensagem />} />
            <Route path="/psicologo" element={<Psicologo />} />
            <Route path="/psicologoagenda" element={<PsicologoAgenda />} />
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