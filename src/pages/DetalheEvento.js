
import { useParams, Link } from "react-router-dom";

export default function DetalheEvento({ eventos }) {
  const { id } = useParams();

  const evento = eventos.find((e) => e.id === Number(id));

  if (!evento) {
    return <h2>Evento não encontrado</h2>;
  }

  return (
    <div>
      <h1>{evento.titulo}</h1>
      <p><strong>Data:</strong> {evento.data}</p>
      <p><strong>Local:</strong> {evento.local}</p>
      <p><strong>Descrição:</strong> {evento.descricao}</p>

      <br />
      <Link to="/Evento">Voltar</Link>
    </div>
  );
}