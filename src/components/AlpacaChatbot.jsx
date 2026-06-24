import React, { useState, useEffect, useRef } from 'react';
import alpacaImg from '../assets/alpaca.png'; 

const AlpacaChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([{ text: '¡Hola! ¿Qué te gustaría pedir hoy?', sender: 'bot' }]);
  const [inputValue, setInputValue] = useState('');
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const chatEndRef = useRef(null);

  // Scroll automático y gestión de foco
  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakMessage = (text) => {
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[\u{1F600}-\u{1F9FF}]/gu, ''));
    utterance.lang = 'es-PE';
    synthRef.current.speak(utterance);
  };

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { text, sender: 'user' }]);
    setInputValue('');
    setTimeout(() => {
        const reply = "En Taste Perú estamos listos para atender tu pedido de tamales o tartas.";
        setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
        speakMessage(reply);
    }, 500);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {isOpen && (
        <section 
          role="dialog" 
          aria-labelledby="chat-title" 
          style={{ width: '320px', background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', border: '1px solid #ccc' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h2 id="chat-title" style={{ fontSize: '1rem', margin: 0 }}>Asistente Taste Perú</h2>
            <button onClick={() => setIsOpen(false)} aria-label="Cerrar chat" style={{ background: '#db1d1d', color: '#fff', border: 'none', borderRadius: '4px', padding: '5px 10px' }}>X</button>
          </div>
          
          {/* aria-live="polite" anuncia los mensajes nuevos al usuario */}
          <div aria-live="polite" style={{ height: '250px', overflowY: 'auto', marginBottom: '10px', border: '1px solid #eee', padding: '10px', borderRadius: '5px' }}>
            {messages.map((m, i) => (
              <p key={i} style={{ margin: '5px 0', color: m.sender === 'user' ? '#000' : '#444' }}>
                <strong>{m.sender === 'user' ? 'Tú:' : 'Bot:'}</strong> {m.text}
              </p>
            ))}
            <div ref={chatEndRef} />
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{ display: 'flex', gap: '5px' }}>
            <label htmlFor="chat-input" className="sr-only" style={{ display: 'none' }}>Escribe tu mensaje</label>
            <input 
              id="chat-input"
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              placeholder="Escribe aquí..."
              style={{ flex: 1, padding: '8px', border: '1px solid #666', borderRadius: '4px' }}
            />
            <button type="submit" aria-label="Enviar mensaje" style={{ background: '#db1d1d', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px' }}>Enviar</button>
          </form>
        </section>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        aria-expanded={isOpen}
        aria-label={isOpen ? "Cerrar chat" : "Abrir asistente virtual"}
        style={{ borderRadius: '50%', width: '60px', height: '60px', border: '2px solid #db1d1d', padding: '0', overflow: 'hidden' }}
      >
        <img src={alpacaImg} alt="Icono de Alpaca" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </button>
    </div>
  );
};

export default AlpacaChatbot;