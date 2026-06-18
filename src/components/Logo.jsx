// src/components/Logo.jsx
import './Logo.css';

export default function Logo() {
  return (
    <div className="logo-container">
      <div className="alpaca-icon">🦙</div>
      <div className="logo-text">
        <h1>Taste Peru</h1>
        <p className="slogan">Tradición y sabor en cada bocado</p>
      </div>
    </div>
  );
}