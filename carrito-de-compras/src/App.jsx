import { useState } from 'react';
import Carrito from './components/Carrito';
import Inicio from './components/Inicio';
import Tienda from './components/Tienda';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>Componente principal</div>

      <Carrito />
      <Inicio />
      <Tienda />
    </>
  );
}

export default App;
