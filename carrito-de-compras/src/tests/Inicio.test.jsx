import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router'; // Necesario para que no explote el <Link>
import Inicio from '../components/Inicio';
import { describe, it, expect } from 'vitest';

describe('Componente Inicio', () => {
  it('renderiza el título de bienvenida correctamente', () => {
    // 1. Renderizamos el componente (en un entorno simulado)
    render(
      <MemoryRouter>
        <Inicio />
      </MemoryRouter>
    );

    // 2. Buscamos el elemento (un heading <h1>, <h2>, etc. que contenga ese texto)
    const titulo = screen.getByRole('heading', {
      name: /Bienvenido al PokéMart/i,
    });

    // 3. Hacemos la aserción (nuestra expectativa)
    expect(titulo).toBeInTheDocument();
  });
});
