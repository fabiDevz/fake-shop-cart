import { useState } from 'react';
import Carrito from './components/Carrito';
import Inicio from './components/Inicio';
import Tienda from './components/Tienda';
import { Link, Outlet } from 'react-router';

import './App.css';

function App() {
  const [carrito, setCarrito] = useState([]);

  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/carrito">Carrito de compras ({carrito.length})</Link>
        <Link to="/tienda">Tienda</Link>
      </nav>

      <main>
        <Outlet context={{ carrito, setCarrito }} />
      </main>
    </div>
  );
}

export default App;
