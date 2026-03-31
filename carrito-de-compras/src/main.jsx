import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Inicio from './components/Inicio.jsx';
import Carrito from './components/Carrito.jsx';
import Tienda from './components/Tienda.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Inicio />,
      },
      {
        path: 'tienda',
        element: <Tienda />,
      },
      {
        path: 'carrito',
        element: <Carrito />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
