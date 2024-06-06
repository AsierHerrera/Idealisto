// components/Login.js
import { useState, useEffect, useContext } from 'react';
import usersData from '../../DataBase/Users.json';
import UserContext from '../context/userContext';
import { useNavigate } from "react-router-dom";

function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    passwordRepeat: '',
    emailError: '',
    passwordError: '',
    passwordRepeatError: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const { email, password, passwordRepeat } = formState;

    setFormState(prevState => ({
      ...prevState,
      emailError: email && !validateEmail(email) ? "El correo electrónico no es válido. Asegúrate de que esté en el formato correcto, como ejemplo@dominio.com." : '',
      passwordError: password && !validatePassword(password) ? "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo." : '',
      passwordRepeatError: passwordRepeat && passwordRepeat !== password ? "Las contraseñas no coinciden" : '',
    }));
  }, [formState.email, formState.password, formState.passwordRepeat]);

  const handleLogin = (event) => {
    event.preventDefault();
    const { email, password } = formState;
    const user = usersData.find(user => user.email === email);

    if (user && user.password === password) {
      alert('Inicio de sesión exitoso');
      setUser(user);
      localStorage.setItem('userId', user.User_id);
      navigate("/");
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const { email, password, passwordRepeat } = formState;

    if (password === passwordRepeat) {
      const isEmailRegistered = usersData.some(user => user.email === email);
      if (isEmailRegistered) {
        alert('El correo electrónico ya está registrado');
      } else {
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
        setFormState({
          email: '',
          password: '',
          passwordRepeat: '',
          emailError: '',
          passwordError: '',
          passwordRepeatError: '',
        });
        setIsRegistering(false);
      }
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  const handleToggleMode = () => {
    setIsRegistering(prevState => !prevState);
    setFormState({
      email: '',
      password: '',
      passwordRepeat: '',
      emailError: '',
      passwordError: '',
      passwordRepeatError: '',
    });
  };

  const { email, password, passwordRepeat, emailError, passwordError, passwordRepeatError } = formState;

  return (
    <section>
      {isRegistering ? (
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
          </div>
          <div>
            <label htmlFor="passwordRepeat">Password Repeat:</label>
            <input
              type="password"
              id="passwordRepeat"
              name="passwordRepeat"
              value={passwordRepeat}
              onChange={handleChange}
            />
            {passwordRepeatError && <p style={{ color: 'red' }}>{passwordRepeatError}</p>}
          </div>
          <button type="submit">Registrarse</button>
          <button type="button" onClick={handleToggleMode}>¿Ya tienes una cuenta? Inicia sesión aquí</button>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            {passwordError && <p style={{ color: 'red' }}>  {passwordError}</p>}
          </div>
          <button className="iniciar-sesion" type="submit">Iniciar sesión</button>
          <button type="button" onClick={handleToggleMode}>¿No tienes una cuenta? Regístrate aquí</button>
        </form>
      )}
    </section>
  );
}

export default Login;
