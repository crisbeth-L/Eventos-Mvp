//crie uma pagina DetalheEvento.js onde serve 
import { useParams, Link } from "react-router-dom";

export default function DetalheEvento({ eventos }) {
  const { id } = useParams();

  const evento = eventos.find((e) => e.id === Number(id));
  if (!evento) {
    return <h2>Evento não encontrado</h2>;
  }
 // Vai exibir  a decrição dos eventos que foram cadstrados
  return (
    <div className="descricao" >
    <div>
      <h1>{evento.titulo}</h1>
      <p><strong>Data:</strong> {evento.data}</p>
      <p><strong>Local:</strong> {evento.local}</p>
      <p><strong>Descrição:</strong> {evento.descricao}</p>
      <p><strong>Status:</strong> {evento.status}</p>
      <p><strong>Capacidade Total:</strong> {evento.capacidadeTotal}</p>
      <p><strong>Mapa Url:</strong> {evento.MapaUrl}</p>
      <br />
      <Link to="/Evento">Voltar</Link>
    </div>
    </div>
  );
}