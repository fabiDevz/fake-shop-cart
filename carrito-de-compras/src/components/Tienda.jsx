import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';

// 1. NUEVO COMPONENTE: Cada tarjeta tiene su propia memoria
function TarjetaProducto({
  item,
  carrito,
  setCarrito,
  tarjetaStyle,
  imagenStyle,
  nombreStyle,
}) {
  const [cantidad, setCantidad] = useState(1);

  return (
    <div style={tarjetaStyle}>
      <img src={item.imagen} alt={item.nombre} style={imagenStyle} />
      <h3 style={nombreStyle}>{item.nombre}</h3>
      <p style={{ fontWeight: 'bold', color: '#e67e22', fontSize: '1.2rem' }}>
        ₽ {item.precio}
      </p>

      {/* Input que lee la memoria de esta tarjeta en específico */}
      <input type="number" min={1} max={99} value={cantidad} readOnly />

      <div>
        <button onClick={() => setCantidad(cantidad + 1)}>+</button>
        <button
          onClick={() => {
            if (cantidad > 1) {
              setCantidad(cantidad - 1);
            }
          }}
        >
          -
        </button>
      </div>

      <button
        onClick={() => {
          // Buscamos si ya existe
          const posicion = carrito.findIndex(
            (productoGuardado) => productoGuardado.id === item.id
          );

          if (posicion === -1) {
            // Es nuevo: Lo agregamos con la cantidad que eligió el usuario
            setCarrito([...carrito, { ...item, cantidad: cantidad }]);
          } else {
            // Ya existe: Le sumamos la cantidad que eligió el usuario
            const nuevoCarrito = [...carrito];
            nuevoCarrito[posicion].cantidad += cantidad;
            setCarrito(nuevoCarrito);
          }

          // Regresamos el contador de la tarjeta a 1 después de añadir
          setCantidad(1);
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
}

// 2. COMPONENTE PRINCIPAL DE LA TIENDA
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
          // Aquí solo preparamos los datos puros
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
        {items.map((item) => (
          // Dibujamos la tarjeta independiente y le pasamos los datos y estilos
          <TarjetaProducto
            key={item.id}
            item={item}
            carrito={carrito}
            setCarrito={setCarrito}
            tarjetaStyle={tarjetaStyle}
            imagenStyle={imagenStyle}
            nombreStyle={nombreStyle}
          />
        ))}
      </div>
    </div>
  );
}

export default Tienda;
