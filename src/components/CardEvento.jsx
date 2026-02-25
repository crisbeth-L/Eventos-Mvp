import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CardEvento({ evento, onRemover }) {
  const navigate = useNavigate();

  const handleEditar = () => {
    navigate("/cadastrar", { state: { evento } });
  };

  const badgeStyle = {
    padding: "0.2rem 0.6rem",
    borderRadius: "12px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: evento.status === "Aberto" ? "#5cb85c" : "#d9534f",
    marginLeft: "0.5rem"
  };

  return (
    <article
      className="card"
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "1rem",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#0b0f14",
      }}
    >
      <div>
        <h3>
          {evento.titulo}
          <span style={badgeStyle}>{evento.status}</span>
        </h3>

        <p className="muted">
          {evento.data} • {evento.local} • {evento.capacidadeTotal} vagas
        </p>

        {/* Exibir mapa como link */}
        {evento.mapaUrl && (
          <p>
            <a
              href={evento.mapaUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#fff",
                textDecoration: "underline",
                fontWeight: "bold"
              }}
            >
              Ver localização no mapa
            </a>
          </p>
        )}

        {/* Exibir fotos como imagens */}
        {evento.fotos && evento.fotos.length > 0 && (
          <div style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
            {evento.fotos.map((foto, idx) => (
              <img
                key={idx}
                src={foto}
                alt={`Foto ${idx + 1}`}
                style={{ maxWidth: "120px", borderRadius: "5px" }}
              />
            ))}
          </div>
        )}

        <Link
          to={`/evento/${evento.id}`}
          className="btn info"
          style={{
            marginTop: "0.5rem",
            display: "inline-block",
            textDecoration: "none",
            padding: "0.4rem 0.8rem",
            backgroundColor: "#094092",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "0.9rem",
          }}
        >
          Ver Detalhes
        </Link>
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          type="button"
          className="btn warning"
          onClick={handleEditar}
          style={{
            padding: "0.4rem 0.8rem",
            backgroundColor: "#094092",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          Editar
        </button>

        <button
          type="button"
          className="btn danger"
          onClick={() => onRemover(evento.id)}
          style={{
            padding: "0.4rem 0.8rem",
            backgroundColor: "#d9534f",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          Remover
        </button>
      </div>
    </article>
  );
}
