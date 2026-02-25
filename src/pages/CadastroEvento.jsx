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

  // Novos campos corrigidos
  const [capacidadeTotal, setCapacidadeTotal] = useState(evento?.capacidadeTotal || "");
  const [mapaUrl, setMapaUrl] = useState(evento?.mapaUrl || "");

  const limparFormulario = (e) => {
    e.preventDefault();
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setStatus("");
    setCapacidadeTotal("");
    setMapaUrl("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação
    if (!titulo || !data || !local || !descricao || !status || !capacidadeTotal || !mapaUrl) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoEvento = {
      titulo,
      data,
      local,
      descricao,
      status,
      capacidadeTotal: Number(capacidadeTotal),
      mapaUrl,
      vagasRestantes: Number(capacidadeTotal), // inicializa igual à capacidade
    };

    if (evento) {
      onUpdate(evento.id, novoEvento);
    } else {
      onAdd(novoEvento);
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

        <label>
          Capacidade Total
          <input
            type="number"
            value={capacidadeTotal}
            onChange={(e) => setCapacidadeTotal(e.target.value)}
            placeholder="Ex: 20 pessoas"
          />
        </label>

        <label>
          Mapa URL
          <input
            type="url"
            value={mapaUrl}
            onChange={(e) => setMapaUrl(e.target.value)}
            placeholder="Ex:R. Frei Bruno, 201e - Parque Das Palmeiras"
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

      {/* Mensagem do Modal */}
      <Modal isOpen={showModal} onClose={fecharModal}>
        <h3>Evento salvo com sucesso!</h3>
        <p>{titulo} - {data} - {local} - {status} - {capacidadeTotal} - {mapaUrl}</p>
      </Modal>
    </section>
  );
}
