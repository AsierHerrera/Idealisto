import React, { useState } from 'react';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import AnunciosContainer from './components/anuncios/AnunciosContainer';
import FormularioAnfitriones from './components/FormularioAnfitriones/FormularioAnfitriones'
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('AnunciosContainer');

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <>
      <Navbar onViewChange={handleViewChange} />
      {/* <Login /> */}
      <>
            {currentView === 'AnunciosContainer' && (
              <article className="map-outer">
                <h2>Aqui podras buscar un piso</h2>
                <AnunciosContainer  />
              </article>
            )}
            {currentView === 'register' && (
              <section>
                <FormularioAnfitriones />
              </section>
            )}

          </>
    </>
  );
}

export default App;
