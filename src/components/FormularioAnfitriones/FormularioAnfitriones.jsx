import { useState, useEffect } from 'react';
import DataBase from "../../../DataBase/DataBase.json"

const Form = () => {
  const [hostalname, setHostalname] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [precioNoche, setPrecioNoche] = useState("");
  const [camino, setCamino] = useState("");
  const [provincia, setProvincia] = useState("");
  const [camasTotales, setCamasTotales] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const validateHostalname = () => {
      const hostalYaRegistrado = DataBase.some(alojamiento => alojamiento.hostalname === hostalname);
      if (hostalYaRegistrado) {
        setError("El nombre del alojamiento ya está registrado.");
      } else {
        setError('');
      }
    };

    const validateLatitud = () => {
      const latitudRegex = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
      if (!latitudRegex.test(latitud) && latitud !== '') {
        setError("La latitud no es válida. Debe estar en el rango de -90 a 90.");
      } else {
        setError('');
      }
    };

    const validateLongitud = () => {
      const longitudRegex = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
      if (!longitudRegex.test(longitud) && longitud !== '') {
        setError("La longitud no es válida. Debe estar en el rango de -90 a 90.");
      } else {
        setError('');
      }
    };

    const validatePrecioNoche = () => {
      const precioNocheRegex = /^\d+(\.\d{1,2})?$/;
      if (!precioNocheRegex.test(precioNoche) && precioNoche !== '') {
        setError("El precio por noche no es válido. Debe ser un número.");
      } else {
        setError('');
      }
    };

    const validateCamasTotales = () => {
      const camasTotalesRegex = /^\d+$/;
      if (!camasTotalesRegex.test(camasTotales) && camasTotales !== '') {
        setError("El número de camas totales no es válido. Debe ser un número entero.");
      } else {
        setError('');
      }
    };
    validateHostalname();
    validateLatitud();
    validateLongitud();
    validatePrecioNoche();
    validateCamasTotales();
  }, [hostalname, latitud, longitud, precioNoche, camasTotales]);

  const handleHostalnameChange = (event) => {
    setHostalname(event.target.value);
  };

  const handleLatitudChange = (event) => {
    setLatitud(event.target.value);
  };

  const handleLongitudChange = (event) => {
    setLongitud(event.target.value);
  };

  const handlePrecioNocheChange = (event) => {
    setPrecioNoche(event.target.value);
  };

  const handleCaminoChange = (event) => {
    setCamino(event.target.value);
  };

  const handleProvinciaChange = (event) => {
    setProvincia(event.target.value);
  };

  const handleCamasTotalesChange = (event) => {
    setCamasTotales(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (error === '') {
      const maxId = Math.max(...DataBase.map(alojamiento => alojamiento.Alojamiento_id));
      const newId = maxId + 1;
      const newAlojamiento = {
          Alojamiento_id: newId,
          hostalname,
          latitud: parseFloat(latitud),
          longitud: parseFloat(longitud),
          camino,
          provincia,
          precioNoche,
          camasTotales: parseInt(camasTotales, 10),
          camasocupadas: 0
      };
      DataBase.push(newAlojamiento);
      alert('Formulario enviado correctamente');

      setSuccess(true);
      setHostalname('');
      setLatitud('');
      setLongitud('');
      setPrecioNoche('');
      setCamino('');
      setProvincia('');
      setCamasTotales('');
    } else {
      alert('Por favor, corrige los errores antes de enviar el formulario');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="hostalname">Titulo del anuncio:Nombre del hostal:</label>
        <input
          type="text"
          id="hostalname"
          name="hostalname"
          value={hostalname}
          onChange={handleHostalnameChange}
        />
      </div>
      <div>
        <label htmlFor="precioNoche">Precio:</label>
        <input
          type="text"
          id="precioNoche"
          name="precioNoche"
          value={precioNoche}
          onChange={handlePrecioNocheChange}
        />
      </div>
      <div>
        <label htmlFor="precioNoche">Superficie:</label>
        <input
          type="text"
          id="precioNoche"
          name="precioNoche"
          value={precioNoche}
          onChange={handlePrecioNocheChange}
        />
      </div>
      <div>
        <label htmlFor="provincia">Provincia:</label>
        <input
          type="text"
          id="provincia"
          name="provincia"
          value={provincia}
          onChange={handleProvinciaChange}
        />
      </div>
      <div>
        <label htmlFor="camasTotales">Dormitorios:</label>
        <input
          type="text"
          id="camasTotales"
          name="camasTotales"
          value={camasTotales}
          onChange={handleCamasTotalesChange}
        />
      </div>
      <div>
        <label htmlFor="camasTotales">Cuartos de baño:</label>
        <input
          type="text"
          id="camasTotales"
          name="camasTotales"
          value={camasTotales}
          onChange={handleCamasTotalesChange}
        />
      </div>
      <div>
        <label htmlFor="latitud">Latitud:</label>
        <input
          type="text"
          id="latitud"
          name="latitud"
          value={latitud}
          onChange={handleLatitudChange}
        />
      </div>
      <div>
        <label htmlFor="longitud">Longitud:</label>
        <input
          type="text"
          id="longitud"
          name="longitud"
          value={longitud}
          onChange={handleLongitudChange}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Formulario enviado con éxito!</p>}
      <button type="submit">Publicar</button>
    </form>
  );
};


export default Form;
