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

  // Novos campos
  const [capacidadeTotal, setCapacidadeTotal] = useState(evento?.capacidadeTotal || "");
  const [mapaUrl, setMapaUrl] = useState(evento?.mapaUrl || "");
  const [fotosTexto, setFotosTexto] = useState(evento?.fotos?.join("\n") || "");

  const limparFormulario = (e) => {
    e.preventDefault();
    setTitulo("");
    setData("");
    setLocal("");
    setDescricao("");
    setStatus("");
    setCapacidadeTotal("");
    setMapaUrl("");
    setFotosTexto("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação
    if (!titulo || !data || !local || !descricao || !status || !capacidadeTotal || !mapaUrl) {
      alert("Preencha todos os campos.");
      return;
    }

    // Transformar fotosTexto em lista
    const fotosLista = fotosTexto
      .split("\n")
      .map((linha) => linha.trim())
      .filter((linha) => linha !== "");

    const novoEvento = {
      titulo,
      data,
      local,
      descricao,
      status,
      capacidadeTotal: Number(capacidadeTotal),
      mapaUrl,
      fotos: fotosLista,
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
            placeholder="Ex: https://maps.google.com/..."
          />
        </label>

        <label>
          Fotos (uma URL por linha)
          <textarea
            value={fotosTexto}
            onChange={(e) => setFotosTexto(e.target.value)}
            placeholder="Cole aqui as URLs das fotos, uma por linha"
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

      {/* Modal com mapa e fotos */}
      <Modal isOpen={showModal} onClose={fecharModal}>
        <h3>Evento salvo com sucesso!</h3>
        <p>{titulo} - {data} - {local} - {status} - {capacidadeTotal} vagas</p>
        
        {/* Link clicável para o mapa */}
        <p>
          Mapa:{" "}
          <a href={mapaUrl} target="_blank" rel="noopener noreferrer">
            Abrir mapa
          </a>
        </p>

        {/* Exibir fotos como miniaturas */}
        {fotosTexto && (
          <div>
            <h4>Fotos:</h4>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {fotosTexto.split("\n").map((foto, idx) => (
                foto.trim() !== "" && (
                  <a key={idx} href={foto} target="_blank" rel="noopener noreferrer">
                    <img
                      src={foto}
                      alt={`Foto ${idx + 1}`}
                      style={{ maxWidth: "120px", borderRadius: "5px" }}
                    />
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
