import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/home';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Administrador from './pages/admin';
import Aluno from './pages/aluno';
import Psicologo from './pages/psicologo';
import Header from './componentes/header'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/administrador" element={<Administrador />} />
          <Route path="/aluno" element={<Aluno />} />
          <Route path="/psicologo" element={<Psicologo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;