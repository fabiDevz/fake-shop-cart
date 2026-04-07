import { useState } from 'react';
import { Link, Outlet } from 'react-router';
import './App.css';

function App() {
  const [carrito, setCarrito] = useState([]);

  // --- OBJETOS DE ESTILO CSS ---

  const navStyle = {
    backgroundColor: '#2c3e50', // Un tono oscuro y elegante
    padding: '20px',
    display: 'flex',
    justifyContent: 'center', // Centra los enlaces
    alignItems: 'center',
    gap: '40px', // Espacio entre cada enlace
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Sombra para separar el menú del contenido
  };

  const linkStyle = {
    color: '#ecf0f1', // Blanco hueso
    textDecoration: 'none', // Quita el subrayado azul por defecto
    fontSize: '1.2rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px', // Espacio entre el texto y el icono del carrito
  };

  const pillStyle = {
    backgroundColor: '#e74c3c', // Rojo llamativo
    color: 'white',
    padding: '4px 10px',
    borderRadius: '20px', // Lo hace redondito
    fontSize: '1rem',
  };

  return (
    <div>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>
          Inicio
        </Link>
        <Link to="/tienda" style={linkStyle}>
          Tienda
        </Link>
        <Link to="/carrito" style={linkStyle}>
          Carrito 🛒
          {/* Mostramos la píldora solo si hay algo en el carrito */}
          {carrito.length > 0 && (
            <span style={pillStyle}>{carrito.length}</span>
          )}
        </Link>
      </nav>

      <main style={{ paddingBottom: '50px' }}>
        <Outlet context={{ carrito, setCarrito }} />
      </main>
    </div>
  );
}

export default App;
