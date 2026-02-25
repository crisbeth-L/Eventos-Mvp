import React from "react";


export default function Home({ total, eventos }) {
  
  const proximoEvento = eventos && eventos.length > 0 ? eventos[0] : null;
//A const proximoEvento armazena o primeiro evento cadastradona que vem do componente eventos  
return (
    <section className="stack">
      <h2>Bem-vindos</h2>
      <p>Hoje vamos montar um mini sistema real usando componentes, rotas e estado.</p>
     
      <div className="box">
        Total de eventos cadastrados: <strong>{total}</strong>
      </div>


      {proximoEvento && (
        <div className="box">
          Próximo evento: <strong>{proximoEvento.titulo}</strong>
        </div>
      )}
    </section>



  );
}
