// Navbar.jsx
import React from 'react';


const Navbar = ({ onViewChange }) => {
  return (
    <nav className="navbar">
      <div className="navbar-icons">
        <button onClick={() => onViewChange('AnunciosContainer')} className="icon" title="Anuncios">
          Anuncios
        </button>
        <button onClick={() => onViewChange('Login')} className="icon" title="Registro de Alojamientos">
          Registro
        </button>
        <button onClick={() => onViewChange('FormularioAlojamientos')} className="icon" title="Tarjetas de Alojamientos">
          Albergues
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
