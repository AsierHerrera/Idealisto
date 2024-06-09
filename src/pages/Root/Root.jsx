import React, { useEffect, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import styles from "./Root.module.css"; // Importa el CSS module
import UserContext from "../../context/userContext";

const Root = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.clear();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login'); // Redirigir a la página de inicio de sesión si no hay userId
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link className={styles.navLink} to="/">Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} to="/anuncios">Buscar pisos</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} to="/registro">Registra tu piso</Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navLink} to={`/anuncios/publicaciones/${user?.User_id}`}>Consulta tus publicaciones</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Root;
