import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../components/Modal";  
import "../components/Modal.css";        

export default function CadastroEvento({ onAdd, onUpdate }) {
  const navigate = useNavigate();
  const location = useLocation();
  const evento = location.state?.evento;

  const [titulo, setTitulo] = useState(evento?.titulo || "");
  const [data, setData] = useState(evento?.data || "");
  const [local, setLocal] = useState(evento?.local || "");
  const [descricao, setDescricao] = useState(evento?.descricao || "");
  const [status, setStatus] = useState(evento?.status || "");
  const [showModal, setShowModal] = useState(false);

  const limparFormulario = (e) => {
    e.preventDefault();
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setStatus("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo || !data || !local || !descricao || !status) {
      alert("Preencha todos os campos.");
      return;
    }

    if (evento) {
      onUpdate(evento.id, { titulo, data, local, descricao, status });
    } else {
      onAdd({ titulo, data, local, descricao, status });
    }

    setShowModal(true); 
  };

  const fecharModal = () => {
    setShowModal(false);
    navigate("/evento"); 
  };

  return (
    <section className="stack">
      <h2>{evento ? "Editar Evento" : "Cadastrar Evento"}</h2>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          Título
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Demo do sistema"
          />
        </label>

        <label>
          Data
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </label>

        <label>
          Local
          <input
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Ex: Laboratório"
          />
        </label>

        <label>
          Descrição
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Discussão sobre a Demo do sistema "
          />
        </label>

        <label>
          Status
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Ex: Aberto ou Loteado "
          />
        </label>

        <div className="row">
          <button className="btn" type="submit">Salvar</button>
          <button className="btn" type="button" onClick={limparFormulario}>
            Limpar
          </button>
          <button className="btn ghost" type="button" onClick={() => navigate("/evento")}>
            Cancelar
          </button>
        </div>
      </form>

      {/* Modal de confirmação */}
      <Modal isOpen={showModal} onClose={fecharModal}>
        <h3> Evento salvo com sucesso!!!!!</h3>
        <p>{titulo} - {data}- {local} - {status} </p>

      </Modal>
    </section>
  );
}
