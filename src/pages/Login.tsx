import { Fragment, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../utils/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
  const { login, isAuth, user } = useAuth()
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (username === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      })
      return
    }
    if (await login(username, password)) {
      if (isAuth) {
        if (user?.role === "admin") {
          navigate("/admin");
        } else if (user?.role === "pharmacy") {
          navigate("/pharmacy");
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o contraseña incorrectos",
      });
    }
  };

  return (
    <Fragment>
      {!isAuth ? (
        <div style={{
          backgroundImage: "url('https://img.freepik.com/foto-gratis/abstract-blur-centro-comercial_1203-8821.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
          overflow: "hidden",
        }}>
          <div className="is-flex is-justify-content-center is-align-items-center" style={{ minHeight: "100vh" }}>
            <div className="card p-4" style={{ maxWidth: "400px" }}>
              <div>
                <img className="bi me-2" width="200" src="https://www.pharmaser.com.co/wp-content/uploads/2023/07/logo-color.png" alt="Logo" />
                <h1 className="h3 mb-3 fw-normal">Por favor, inicie sesión</h1>
                <div className="field mb-4">
                  <label className="label">Usuario</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      placeholder="Usuario"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      required
                    />
                    <span className="icon is-small is-left">
                      <i className="bi bi-person"></i>
                    </span>
                  </div>
                </div>
                <div className="field mb-4">
                  <label className="label">Contraseña</label>
                  <div className="control has-icons-left">
                    <input
                      className="input"
                      placeholder="Contraseña"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    />
                    <span className="icon is-small is-left">
                      <i className="bi bi-key"></i>
                    </span>
                  </div>
                </div>

                <button className="button is-fullwidth text-white py-2" onClick={handleLogin} style={{ backgroundColor: "#ff8c00" }}>
                  Iniciar Sesión
                </button>
                <p className="mt-5 mb-3 text-body-secondary text-center">
                  Copyright © 2024 Todos los derechos reservados
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {
            user?.role === 'administrador' ? <Navigate to="/admin" replace /> : <Navigate to='/pharmacy' replace />
          }
        </>
      )}
    </Fragment>
  );
};