import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

import Home from "./pages/Home";
import Evento from "./pages/Evento";
import CadastroEvento from "./pages/CadastroEvento";
import DetalheEvento from "./pages/DetalheEvento";
import Login from "./pages/Login"; 

export default function App() {
  // Estado de login
  const [logado, setLogado] = useState(false); 

  // Lista de eventos
  const [eventos, setEventos] = useState([
    {
      id: 1,
      titulo: "Reunião do Projeto",
      data: "2026-02-12",
      local: "Sala 2",
      descricao: "Discussão sobre andamento do projeto.",
      status: "Aberto"
    },
    {
      id: 2,
      titulo: "Review da Sprint",
      data: "2026-02-13",
      local: "Auditório",
      descricao: "Apresentação dos resultados da sprint.",
      status: "Lotado"
    },
  ]);

  // Funções de manipulação de eventos
  function adicionarEvento(novo) {
    const eventoComId = { id: Date.now(), ...novo };
    setEventos((lista) => [eventoComId, ...lista]);
  }

  function atualizarEvento(id, dadosAtualizados) {
    setEventos((lista) =>
      lista.map((e) => e.id === id ? { ...e, ...dadosAtualizados } : e)
    );
  }
   
  function removerEvento(id) {
    setEventos((lista) => lista.filter((e) => e.id !== id));
  }

  function removerTodos() {
    setEventos([]);
  }

  // Função de logout
  function handleLogout() {
    setLogado(false);
  }

  return (
    <div className="app">
      {/* Header e Menu só aparecem se estiver logado */}
      {logado && <Header />}
      {logado && <Menu onLogout={handleLogout} />}

      <main className="conteudo-principal">
        <Routes>
          {/* Rota de Login */}
          <Route path="/" element={<Login setLogado={setLogado} />} />

          {/* Página inicial */}
          <Route
            path="/home"
            element={
              logado ? (
                <Home total={eventos.length} eventos={eventos} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Página de listagem */}
          <Route
            path="/evento"
            element={
              logado ? (
                <Evento
                  eventos={eventos}
                  onRemover={removerEvento}
                  onRemoverTodos={removerTodos}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Rota de detalhe */}
          <Route
            path="/evento/:id"
            element={
              logado ? <DetalheEvento eventos={eventos} /> : <Navigate to="/" replace />
            }
          />

          {/* Página de cadastro/edição */}
          <Route
            path="/cadastrar"
            element={
              logado ? (
                <CadastroEvento
                  onAdd={adicionarEvento}
                  onUpdate={atualizarEvento}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Redirecionamento padrão */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Footer só aparece se estiver logado */}
      {logado && <Footer />}
    </div>
  );
}
