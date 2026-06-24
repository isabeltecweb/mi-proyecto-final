import { useState } from 'react';
import tamalImg from '../assets/tamal-cerdo.jpg';
import tartaHeladaAbierta from '../assets/tarta-helada-abierta.jpg';
import tartaHelada from '../assets/tarta-helada.jpg';
import tartaLatina from '../assets/tarta-latina.jpg';
import tartaFCB from '../assets/tarta-fcb.jpg';
import tartaSirenita from '../assets/tarta-sirenita.jpg';
import tartaMasha from '../assets/tarta-masha.jpg';
import tartaPAW from '../assets/tarta-paw.jpg';
import tartaChoco from '../assets/tarta-chocolate.jpg';

export default function MainContent() {
  const [activeTab, setActiveTab] = useState('Tamales');

  const tamales = [
    { name: 'Tamal de cerdo', img: tamalImg }
  ];

  const tartas = [
    { name: 'Tarta Helada', img: tartaHelada },
    { name: 'Tarta Helada Especial', img: tartaHeladaAbierta },
    { name: 'Tarta Latina', img: tartaLatina },
    { name: 'Tarta FCB', img: tartaFCB },
    { name: 'Tarta La Sirenita', img: tartaSirenita },
    { name: 'Tarta Masha y el Oso', img: tartaMasha },
    { name: 'Tarta PAW Patrol', img: tartaPAW },
    { name: 'Tarta de Chocolate', img: tartaChoco }
  ];

  return (
    <main style={{ padding: '20px' }}>
      <nav style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button 
          onClick={() => setActiveTab('Tamales')} 
          style={{ 
            marginRight: '10px', 
            padding: '10px 20px', 
            cursor: 'pointer', 
            background: activeTab === 'Tamales' ? '#b01818' : '#db1d1d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px' 
          }}
        >
          Tamales
        </button>
        <button 
          onClick={() => setActiveTab('Tartas')}
          style={{ 
            padding: '10px 20px', 
            cursor: 'pointer', 
            background: activeTab === 'Tartas' ? '#b01818' : '#db1d1d', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px' 
          }}
        >
          Tartas
        </button>
      </nav>

      <section className="carousel" style={{ display: 'flex', overflowX: 'auto', gap: '20px', padding: '20px' }}>
        {(activeTab === 'Tamales' ? tamales : tartas).map((item, index) => (
          <div key={index} style={{ minWidth: '250px', border: '1px solid #ddd', borderRadius: '8px', padding: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <img src={item.img} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} />
            <h3 style={{ marginTop: '10px' }}>{item.name}</h3>
          </div>
        ))}
      </section>
    </main>
  );
}