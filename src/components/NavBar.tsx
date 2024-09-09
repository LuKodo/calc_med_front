import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

export const NavBar = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleClose = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="is-flex is-flex-wrap-wrap is-justify-content-space-between p-3 mb-4 border-bottom border-warning">
      <a
        href="#"
        className="is-flex is-align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none text-dark"
      >
        <img className="bi me-2" width="200" src="https://www.pharmaser.com.co/wp-content/uploads/2023/07/logo-color.png" alt="Logo" />
      </a>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <button
            onClick={handleClose}
            className="button text-white w-100 me-2"
            style={{ backgroundColor: "#ff8c00" }}
          >
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </header>
  );
};
