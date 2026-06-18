// src/components/MainContent.jsx
export default function MainContent() {
  const platos = ["Ceviche", "Pollo a la brasa", "Tamales", "Torta helada", "Torta chocolate", "Sanguichito cerdo", "Sanguichito pavo", "Inca Kola", "Chicha morada"];

  return (
    <main className="main-content">
      <section id="menu">
        <h2>Nuestro Menú</h2>
        <div className="carousel" role="region" aria-label="Carrusel de comida peruana">
          {platos.map((item, index) => (
            <div key={index} className="card">
              <img src="https://via.placeholder.com/100" alt={`Plato de ${item}`} />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="atencion" className="alpaca-box">
        <h3>🦙 Alpaca Bot (Asistente)</h3>
        <p>¡Hola! Soy tu guía. ¿Deseas hacer un pedido, sugerencia o reclamación?</p>
        <button onClick={() => alert("Chat de la Alpaca iniciado")}>Hablar ahora</button>
      </section>
    </main>
  );
}