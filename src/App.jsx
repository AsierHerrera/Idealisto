import React, { useState } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AnunciosContainer from './components/AnunciosContainer';
import FormularioAnfitriones from './components/FormularioAnfitriones'
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
