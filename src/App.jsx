import Header from './components/Header';
import MainContent from './components/MainContent';
import AlpacaChatbot from './components/AlpacaChatbot';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      {/* Componente del chatbot flotante */}
      <AlpacaChatbot />
    </div>
  );
}

export default App;