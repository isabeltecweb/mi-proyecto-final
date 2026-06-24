import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header style={{ padding: '20px', textAlign: 'center', background: '#fff' }}>
      <img src={logo} alt="Logo Taste Perú" style={{ maxWidth: '300px', height: 'auto' }} />
      <h1>Taste Perú</h1>
      <p>Tradición y sabor en cada bocado</p>
    </header>
  );
}