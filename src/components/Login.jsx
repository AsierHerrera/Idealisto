import { useState, useEffect } from 'react';
import usersData from '../../DataBase/Users.json';
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); 
  
  useEffect(() => {
    const validateEmail = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email) && email !== '') {
        setEmailError("El correo electrónico no es válido. Asegúrate de que esté en el formato correcto, como ejemplo@dominio.com.");
      } else {
        setEmailError('');
      }
    };

    const validatePassword = () => {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
      if (!passwordRegex.test(password) && password !== '') {
        setPasswordError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.");
      } else {
        setPasswordError('');
      }
    };

    const validatePasswordRepeat = () => {
      if (passwordRepeat !== password && passwordRepeat !== '') {
        setPasswordRepeatError("Las contraseñas no coinciden");
      } else {
        setPasswordRepeatError('');
      }
    };

    validateEmail();
    validatePassword();
    validatePasswordRepeat();
  }, [email, password, passwordRepeat]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordRepeatChange = (event) => {
    setPasswordRepeat(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // Buscar el usuario por email
    const user = usersData.find(user => user.email === email);

    // Verificar si el usuario existe y la contraseña coincide
    if (user && user.password === password) {
      // Inicio de sesión exitoso
      alert('Inicio de sesión exitoso');
      onLogin();  // Notificar al componente App sobre el inicio de sesión exitoso
    } else {
      // Credenciales incorrectas
      alert('Credenciales incorrectas');
    }
  };

  const handleRegister = (event) => {
    event.preventDefault(); // Evitar que la página se recargue al enviar el formulario
  
    // Verificar si las contraseñas coinciden
    if (password === passwordRepeat) {
      // Verificar si el email ya está registrado
      const isEmailRegistered = usersData.some(user => user.Email === email);
      if (isEmailRegistered) {
        alert('El correo electrónico ya está registrado');
      } else {
        // Agregar el nuevo usuario a la lista
        const maxId = Math.max(...usersData.map(usuario => usuario.User_id));
        const newId = maxId + 1;
        const newUser = {
            User_id: newId,
            Is_admin: 0,
            email,
            password
        };
        usersData.push(newUser);
        alert('Registro exitoso');
        // Limpia los campos después del registro exitoso
        setEmail('');
        setPassword('');
        setPasswordRepeat('');
        setEmailError('');
        setPasswordError('');
        setPasswordRepeatError('');
        // Cambia al modo de inicio de sesión después del registro exitoso
        setIsRegistering(false);
      }
    } else {
      alert('Las contraseñas no coinciden');
    }
  };
  
  const handleToggleMode = (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del botón
    console.log("la userdata es:", usersData);

    setIsRegistering(prevState => !prevState); // Cambiar el estado de registro
    // Limpiar los campos y errores cuando se cambia entre modos de formulario
    setEmail('');
    setPassword('');
    setPasswordRepeat('');
    setEmailError('');
    setPasswordError('');
    setPasswordRepeatError('');
  };

  return (
    <section>
      {isRegistering ? (
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="Email">Email:</label>
            <input
              type="text"
              id="Email"
              name="Email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p>{emailError}</p>}
          </div>
          <div>
            <label htmlFor="Password">Password:</label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p>{passwordError}</p>}
          </div>
          <div>
            <label htmlFor="PasswordRepeat">Password Repeat:</label>
            <input
              type="password"
              id="PasswordRepeat"
              name="PasswordRepeat"
              value={passwordRepeat}
              onChange={handlePasswordRepeatChange}
            />
            {passwordRepeatError && <p>{passwordRepeatError}</p>}
          </div>
          <button type="submit">Registrarse</button>
          <button type="button" onClick={handleToggleMode}>¿Ya tienes una cuenta? Inicia sesión aquí</button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="Email">Email:</label>
            <input
              type="text"
              id="Email"
              name="Email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p>{emailError}</p>}
          </div>
          <div>
            <label htmlFor="Password">Password:</label>
            <input
              type="password"
              id="Password"
              name="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p>{passwordError}</p>}
          </div>
          <button className="iniciar-sesion" type="submit">Iniciar sesión</button>
          <button type="button" onClick={handleToggleMode}>¿No tienes una cuenta? Regístrate aquí</button>
        </form>
      )}
    </section>
  );
}

export default Login;
