import "../App.css";
import { Outlet, Link,useNavigate } from "react-router-dom";
import { useEffect,useContext } from "react";
import UserContext from "../context/userContext";
const Root = () => {
    const {user,setUser} = useContext(UserContext);
    const navigate = useNavigate();
    console.log("user en Root.jsx", user)

    useEffect(() => {
        if (!user) {
          navigate('/login');
        }
      }, []);

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/anuncios">Anuncios</Link>
                    </li>
                    <li>
                        <Link to="/registro">Registra tu piso </Link>
                    </li>
                </ul>
            </nav>
            <h1>Hola {user?.Name}</h1>
            <Outlet />
        </div>
    )
};

export default Root;

