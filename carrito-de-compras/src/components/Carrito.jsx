import { useOutletContext } from 'react-router';

function Carrito() {
  const { carrito, setCarrito } = useOutletContext();
  const total = carrito.reduce(
    (acumulador, producto) => acumulador + producto.precio * producto.cantidad,
    0
  );
  return (
    <div>
      <h2>Tu pedido</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Aquí usamos .map() para recorrer el carrito */}
        {carrito.map((producto, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p
              style={{
                fontWeight: 'bold',
                color: '#e67e22',
                fontSize: '1.2rem',
              }}
            >
              ₽ {producto.precio} {/* Usamos ₽ para Pokédolares */}
            </p>
            <h3>x {producto.cantidad}</h3>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h2>Total</h2>
        <p>{total}</p>
      </div>
    </div>
  );
}

export default Carrito;
