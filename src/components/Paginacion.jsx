import React from 'react';

const Paginacion = ({ paginaActual, numeroTotalPaginas, irAPagina }) => {
  return (
    <div className="pagination">
      <button onClick={() => irAPagina(paginaActual - 1)} disabled={paginaActual === 1}>
        Anterior
      </button>
      <span>
        Página {paginaActual} de {numeroTotalPaginas}
      </span>
      <button onClick={() => irAPagina(paginaActual + 1)} disabled={paginaActual === numeroTotalPaginas}>
        Siguiente
      </button>
    </div>
  );
}

export default Paginacion;
