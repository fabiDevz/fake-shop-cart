import { useOutletContext, Link } from 'react-router';

function Carrito() {
  const { carrito, setCarrito } = useOutletContext();

  const total = carrito.reduce(
    (acumulador, producto) => acumulador + producto.precio * producto.cantidad,
    0
  );

  // Estilos mejorados para las filas de productos
  const filaEstilo = {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '20px 30px', // Aumentamos el padding para filas más gorditas
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Separa los elementos automáticamente
    gap: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)', // Una sombra sutil para darle profundidad
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2
        style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '30px',
        }}
      >
        Tu Mochila 🎒
      </h2>

      {/* OPERADOR TERNARIO: Revisamos si está vacío */}
      {carrito.length === 0 ? (
        // --- 1. DISEÑO VACÍO ---
        <div
          style={{
            textAlign: 'center',
            padding: '50px',
            backgroundColor: '#f9f9f9',
            borderRadius: '12px',
            border: '2px dashed #ccc',
          }}
        >
          <h3 style={{ fontSize: '1.8rem', color: '#555' }}>
            ¡Tu mochila está vacía!
          </h3>
          <p
            style={{ color: '#888', fontSize: '1.2rem', marginBottom: '30px' }}
          >
            Parece que no tienes pociones ni Pokéballs para tu aventura.
          </p>
          <Link
            to="/" // <-- Asegúrate de que esta sea la ruta correcta a tu Tienda
            style={{
              backgroundColor: '#3498db',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            Volver a la Tienda
          </Link>
        </div>
      ) : (
        // --- 2. DISEÑO CON PRODUCTOS ---
        <>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            {carrito.map((producto, index) => (
              <div key={index} style={filaEstilo}>
                {/* Forzamos un tamaño estándar para la imagen */}
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain',
                  }}
                />

                {/* flex: 1 hace que el nombre empuje a los demás hacia la derecha */}
                <h3
                  style={{
                    textTransform: 'capitalize',
                    flex: 1,
                    fontSize: '1.5rem',
                    margin: 0,
                  }}
                >
                  {producto.nombre}
                </h3>

                <p
                  style={{
                    fontWeight: 'bold',
                    color: '#e67e22',
                    fontSize: '1.5rem',
                    margin: 0,
                  }}
                >
                  ₽ {producto.precio}
                </p>

                <h3 style={{ fontSize: '1.5rem', margin: 0, color: '#333' }}>
                  x {producto.cantidad}
                </h3>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '30px',
              padding: '20px',
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '2px solid #333',
              textAlign: 'right',
            }}
          >
            <h2 style={{ fontSize: '2rem', margin: 0 }}>
              Total a pagar: <span style={{ color: '#e74c3c' }}>₽ {total}</span>
            </h2>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;
