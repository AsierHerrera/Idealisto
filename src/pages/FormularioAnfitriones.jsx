import { useState, useEffect } from 'react';
import DataBase from "../../DataBase/DataBase.json";

const Form = () => {
  const [formData, setFormData] = useState({
    title: "",
    latitud: "",
    longitud: "",
    price: "",
    surface: "",
    location_name: "",
    bedrooms: "",
    restrooms: "",
    features: "",
    description: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (touched.title) validateField('title', formData.title);
    if (touched.latitud) validateField('latitud', formData.latitud);
    if (touched.longitud) validateField('longitud', formData.longitud);
    if (touched.price) validateField('price', formData.price);
    if (touched.surface) validateField('surface', formData.surface);
    if (touched.bedrooms) validateField('bedrooms', formData.bedrooms);
    if (touched.restrooms) validateField('restrooms', formData.restrooms);
  }, [formData, touched]);

  const validateField = (fieldName, value) => {
    let errorMsg = "";
    switch (fieldName) {
      case 'title':
        if (!value) {
          errorMsg = "El título es obligatorio.";
        } else if (DataBase.some(piso => piso.title === value)) {
          errorMsg = "El nombre del alojamiento ya está registrado.";
        }
        break;
      case 'latitud':
        const latitudRegex = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
        if (!latitudRegex.test(value) && value !== '') {
          errorMsg = "La latitud no es válida. Debe estar en el rango de -90 a 90.";
        }
        break;
      case 'longitud':
        const longitudRegex = /^-?([1-8]?\d(\.\d+)?|180(\.0+)?)$/;
        if (!longitudRegex.test(value) && value !== '') {
          errorMsg = "La longitud no es válida. Debe estar en el rango de -180 a 180.";
        }
        break;
      case 'price':
        const priceRegex = /^\d+(\.\d{1,2})?$/;
        if (!priceRegex.test(value) && value !== '') {
          errorMsg = "El precio no es válido. Debe ser un número.";
        }
        break;
      case 'surface':
        const surfaceRegex = /^\d+$/;
        if (!surfaceRegex.test(value) && value !== '') {
          errorMsg = "La superficie no es válida. Debe ser un número entero.";
        }
        break;
      case 'bedrooms':
        const bedroomsRegex = /^\d+$/;
        if (!bedroomsRegex.test(value) && value !== '') {
          errorMsg = "El número de dormitorios no es válido. Debe ser un número entero.";
        }
        break;
      case 'restrooms':
        const restroomsRegex = /^\d+$/;
        if (!restroomsRegex.test(value) && value !== '') {
          errorMsg = "El número de cuartos de baño no es válido. Debe ser un número entero.";
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [fieldName]: errorMsg }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    setTouched(prevTouched => ({ ...prevTouched, [name]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check for empty required fields
    const requiredFields = ['title', 'price', 'surface', 'location_name', 'bedrooms', 'restrooms', 'latitud', 'longitud', 'features', 'description'];
    const newErrors = {};
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = "Este campo es obligatorio.";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Validate all fields
    Object.keys(formData).forEach(field => {
      validateField(field, formData[field]);
    });

    if (Object.values(errors).every(error => error === '')) {
      const maxId = Math.max(...DataBase.map(piso => piso.id));
      const newId = maxId + 1;
      const newPiso = {
        id: newId,
        ...formData,
        latitud: parseFloat(formData.latitud),
        longitud: parseFloat(formData.longitud),
        price: parseFloat(formData.price),
        surface: parseFloat(formData.surface),
        bedrooms: parseInt(formData.bedrooms, 10),
        restrooms: parseInt(formData.restrooms, 10),
        rent: 1,
        is_province: 1
      };
      DataBase.push(newPiso);
      alert('Formulario enviado correctamente');

      setSuccess(true);
      setFormData({
        title: "",
        latitud: "",
        longitud: "",
        price: "",
        surface: "",
        location_name: "",
        bedrooms: "",
        restrooms: "",
        features: "",
        description: ""
      });
      setErrors({});
      setTouched({});
    } else {
      alert('Por favor, corrige los errores antes de enviar el formulario');
    }
  };

  return (
    <div>
      <h2>Registra aquí tu casa</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map(field => (
          <div key={field}>
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}:</label>
            <input
              type={field === 'description' ? 'textarea' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
            {errors[field] && <p style={{ color: 'red' }}>{errors[field]}</p>}
          </div>
        ))}
        {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}
        {success && <p style={{ color: 'green' }}>¡Formulario enviado con éxito!</p>}
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default Form;
