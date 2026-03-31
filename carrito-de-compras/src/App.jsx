import { useState } from 'react';
import Carrito from './components/Carrito';
import Inicio from './components/Inicio';
import Tienda from './components/Tienda';
import { Link, Outlet } from 'react-router';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/carrito">Carrito de compras</Link>
        <Link to="/tienda">Tienda</Link>
      </nav>

      <main>
        {/* Aquí indicamos dónde va el contenido de las vistas hijas */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;
