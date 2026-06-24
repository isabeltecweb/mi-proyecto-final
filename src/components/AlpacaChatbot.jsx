import React, { useState, useEffect, useRef } from 'react';
import alpacaImg from '../assets/alpaca.png'; 

const AlpacaChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { text: '¡Hola! Sabor y tradición en Taste Perú. ¿Qué te gustaría probar hoy?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const recognitionRef = useRef(null);
  const bottomChatRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'es-PE';
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        stopListening();
        handleSendMessage(transcript);
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const speakMessage = (text) => {
    // IMPORTANTE: Esto asegura que el navegador no bloquee el audio
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-PE';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Forzamos la voz
    window.speechSynthesis.speak(utterance);
  };

  const simulateBotResponse = (userText) => {
    const text = userText.toLowerCase();
    let botReply = 'En Taste Perú tenemos tamales, pollo a la brasa, tartas y alfajores. ¿Qué se te antoja?';

    if (text.includes('tamal')) botReply = 'Nuestros tamales de cerdo son los favoritos. ¡Están calientitos!';
    else if (text.includes('pollo')) botReply = 'El pollo a la brasa de Taste Perú es jugoso y crujiente. ¡Te va a encantar!';
    else if (text.includes('tarta')) botReply = 'Tenemos tarta helada, de chocolate y de durazno. ¿Cuál prefieres?';
    else if (text.includes('alfajor')) botReply = 'Nuestros alfajores tienen el punto exacto de manjar. ¡Pide los tuyos!';

    setMessages((prev) => [...prev, { text: botReply, sender: 'bot' }]);
    speakMessage(botReply);
  };

  const handleSendMessage = (textToSend = inputValue) => {
    if (!textToSend.trim()) return;
    setMessages((prev) => [...prev, { text: textToSend, sender: 'user' }]);
    setInputValue('');
    setTimeout(() => simulateBotResponse(textToSend), 500);
  };

  const startListening = () => {
    // Si el navegador bloqueó el audio, este click ayuda a desbloquearlo
    window.speechSynthesis.resume();
    if (recognitionRef.current) recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {isOpen && (
        <div style={{ width: '350px', height: '450px', background: '#fff', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', padding: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <img src={alpacaImg} style={{ width: '40px', borderRadius: '50%' }} />
            <h3 style={{ marginLeft: '10px' }}>Taste Perú Bot</h3>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '10px' }}>
            {messages.map((m, i) => <div key={i} style={{ margin: '5px 0' }}>{m.text}</div>)}
            <div ref={bottomChatRef} />
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button onClick={isListening ? stopListening : startListening}>
              {isListening ? '🛑' : '🎙️'}
            </button>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button onClick={() => handleSendMessage()}>Enviar</button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} style={{ borderRadius: '50%', width: '60px', height: '60px' }}>
        <img src={alpacaImg} style={{ width: '100%', borderRadius: '50%' }} />
      </button>
    </div>
  );
};

export default AlpacaChatbot;