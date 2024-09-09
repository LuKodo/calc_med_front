import { useEffect, useMemo, useState } from "react";
import { NavBar } from "../components/NavBar";
import Swal from "sweetalert2";
import { InsulinaForm } from "../components/InsulinaForm";
import { Calculadora } from "../components/Calculadora";
import { TableComponent } from "../components/TableComponent";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { FooterComponent } from "../components/FooterComponent";
import { IMed } from "../interfaces";


export const AdminPage = () => {
  const { user, isAuth } = useAuth();
  const navigate = useNavigate();
  const [insulinaSeleccionada, setInsulinaSeleccionada] = useState<IMed>({
    id: 0,
    insulina: "",
    concentracion: " 0",
    presentacion: 0,
    cantidad: 0,
    multiplo: 0,
    visible: true,
  });
  const [insulinasList, setInsulinas] = useState<IMed[]>([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    } else {
      if (user?.role === "usuario") {
        navigate("/pharmacy");
      }
      getInsulinas();
    }
  }, []);


  const getInsulinas = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/med`);
    const data = await response.json();
    setInsulinas(data);
  };

  useMemo(() => {
      getInsulinas();
  }, [modal]);

  const deleteFetch = (id: number) => {
    fetch(`${import.meta.env.VITE_API_URL}/med/${id}`, {
      method: "DELETE",
    }).then(() => {
      getInsulinas();
    });
  };

  const deleteInsulina = (id: number) => {
    Swal.fire({
      title: "¿Estás segur@?",
      html: `<i>¿Estas seguro que deseas eliminar este medicamento?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFetch(id);
      }
    });
  };

  return (
    <div className="container">
      <div className={`modal ${modal ? "is-active" : ""}`}>
        <div className="modal-background" onClick={() => setModal(false)}></div>
        <div className="modal-content">
          <InsulinaForm med={insulinaSeleccionada} setModal={setModal} getInsulinas={getInsulinas} />
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={() => setModal(false)}></button>
      </div>
      <NavBar />
      <div className="columns">
        <div className={"column is-12 is-flex is-justify-content-end"}>
          <button className="button" style={{ backgroundColor: "#ff8c00" }} onClick={() => {
            setInsulinaSeleccionada({ id: 0, insulina: "", concentracion: " 0", presentacion: 0, cantidad: 0, multiplo: 0, visible: true });
            setModal(true)
          }}>
            <i className="bi bi-plus" /> Nueva insulina
          </button>
        </div>
      </div>
      <div className="columns p-2">
        <TableComponent
          insulinasList={insulinasList}
          role="administrador"
          deleteInsulina={deleteInsulina}
          setInsulinaSeleccionada={setInsulinaSeleccionada}
          setModal={setModal}
        />
        <div className={"column is-3"}>
          <Calculadora insulinasList={insulinasList} />
        </div>
      </div>
      <div className="columns px-2">
        <div className={"column is-12"}>
          <FooterComponent />
        </div>
      </div>
    </div>
  );
};
