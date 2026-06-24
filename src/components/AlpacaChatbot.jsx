import React, { useState, useEffect, useRef } from 'react';
import alpacaImg from '../assets/alpaca.png'; 

const AlpacaChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([{ text: '¡Hola! ¿Qué te gustaría pedir hoy?', sender: 'bot' }]);
  const [inputValue, setInputValue] = useState('');
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'es-PE';
      recognitionRef.current.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        setInputValue(transcript);
        handleSendMessage(transcript);
      };
    }
  }, []);

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
        <section role="dialog" aria-label="Chat de Taste Perú" style={{ width: '300px', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
          <button onClick={() => setIsOpen(false)} aria-label="Cerrar chat" style={{ float: 'right' }}>X</button>
          <div style={{ height: '300px', overflowY: 'auto' }}>
            {messages.map((m, i) => <p key={i}><strong>{m.sender}:</strong> {m.text}</p>)}
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} aria-label="Escribe tu mensaje" />
            <button onClick={() => handleSendMessage()} aria-label="Enviar mensaje">Enviar</button>
          </div>
        </section>
      )}
      <button onClick={() => setIsOpen(!isOpen)} aria-label="Abrir asistente virtual" style={{ borderRadius: '50%', width: '60px', height: '60px' }}>
        <img src={alpacaImg} alt="" style={{ width: '100%', borderRadius: '50%' }} />
      </button>
    </div>
  );
};

export default AlpacaChatbot;