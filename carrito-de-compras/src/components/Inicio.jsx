import { Link } from 'react-router';

function Inicio() {
  // --- OBJETOS DE ESTILO CSS ---
  const contenedorStyle = {
    textAlign: 'center',
    padding: '80px 20px',
    backgroundColor: '#f4f4f4',
    minHeight: '80vh', // Ocupa casi toda la pantalla
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const tituloStyle = {
    fontSize: '3.5rem',
    color: '#2c3e50',
    marginBottom: '20px',
  };

  const parrafoStyle = {
    fontSize: '1.3rem',
    color: '#555',
    maxWidth: '600px',
    marginBottom: '40px',
    lineHeight: '1.6',
  };

  const botonStyle = {
    backgroundColor: '#e74c3c', // Mismo rojo de los botones de la tienda
    color: 'white',
    padding: '15px 40px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.3rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s', // Para una futura animación si le agregas hover
  };

  return (
    <div style={contenedorStyle}>
      <h1 style={tituloStyle}>¡Bienvenido al PokéMart! 🏪</h1>

      <p style={parrafoStyle}>
        Prepárate para tu próxima gran aventura Pokémon. Contamos con el
        catálogo más completo de Pociones, Pokéballs y objetos clave para que
        nunca te falte nada en tu viaje por la región.
      </p>

      {/* Usamos Link para que funcione como un botón que navega sin recargar la página */}
      <Link to="/tienda" style={botonStyle}>
        Explorar el Catálogo 🎒
      </Link>
    </div>
  );
}

export default Inicio;
