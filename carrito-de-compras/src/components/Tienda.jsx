import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

function Tienda() {
  const [items, setItems] = useState([]);
  const { carrito, setCarrito } = useOutletContext();

  useEffect(() => {
    if (localStorage.getItem('pokemart')) {
      const res = JSON.parse(localStorage.getItem('pokemart'));
      setItems(res);
    } else {
      fetch('https://pokeapi.co/api/v2/item?limit=20')
        .then((respuesta) => respuesta.json())
        .then((datos) => {
          const itemsCompletos = datos.results.map((item) => {
            return {
              id: item.name,
              nombre: item.name.replace('-', ' '),
              precio: Math.floor(Math.random() * 900) + 100,
              imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`,
            };
          });
          setItems(itemsCompletos);
          localStorage.setItem('pokemart', JSON.stringify(itemsCompletos));
        });
    }
  }, []);

  const contenedorGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(4, auto)',
    gap: '20px',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const tarjetaStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    textAlign: 'center',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const imagenStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
    marginBottom: '10px',
  };

  const nombreStyle = {
    textTransform: 'capitalize',
    fontSize: '1.1rem',
    margin: '10px 0',
  };

  return (
    <div
      style={{
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        PokéMart - Ítems Útiles
      </h1>

      <div style={contenedorGridStyle}>
        {items.map((item) => {
          // 1. ESPACIO PARA VARIABLES
          // Buscamos si este ítem específico ya está en el carrito
          const productoEnCarrito = carrito.find(
            (productoGuardado) => productoGuardado.id === item.id
          );

          // Si existe, tomamos su cantidad. Si no (es undefined), la cantidad es 0.
          const cantidadActual = productoEnCarrito
            ? productoEnCarrito.cantidad
            : 0;

          // 2. RETORNO VISUAL (Usando 'return' explícito)
          return (
            <div key={item.id} style={tarjetaStyle}>
              <img src={item.imagen} alt={item.nombre} style={imagenStyle} />
              <h3 style={nombreStyle}>{item.nombre}</h3>
              <p
                style={{
                  fontWeight: 'bold',
                  color: '#e67e22',
                  fontSize: '1.2rem',
                }}
              >
                ₽ {item.precio}
              </p>

              {/* AQUÍ ESTÁ NUESTRO INPUT */}
              <input type="number" min={0} max={99} value={cantidadActual} />

              <div>
                <button>+</button>
                <button>-</button>
              </div>

              <button
                onClick={() => {
                  const posicion = carrito.findIndex(
                    (productoGuardado) => productoGuardado.id === item.id
                  );
                  if (posicion === -1) {
                    setCarrito([...carrito, { ...item, cantidad: 1 }]);
                  } else {
                    const nuevoCarrito = [...carrito];
                    nuevoCarrito[posicion].cantidad += 1;
                    setCarrito(nuevoCarrito);
                  }
                }}
                style={{
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '10px',
                }}
              >
                Añadir
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tienda;
