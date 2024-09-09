import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IMed } from "../interfaces";

interface Props {
  med: IMed;
  setModal: (value: boolean) => void;
  getInsulinas: () => void;
}

export const InsulinaForm: React.FC<Props> = ({ med, setModal, getInsulinas }) => {
  const [item, setInsulina] = useState<IMed>(med);

  useEffect(() => {
    if (
      item &&
      item.presentacion !== 0 &&
      item.concentracion !== "0"
    ) {
      setInsulina({...item, cantidad: item.presentacion * Number(item.concentracion)});
    }
  }, [item]);

  useEffect(() => {
    setInsulina(med);
  }, [med]);

  const saveInsulina = () => {
    if (!item) {
      return
    }
    fetch(`${import.meta.env.VITE_API_URL}/med`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Bien hecho!",
          html:
            "<i><strong>" +
            item.insulina +
            "</strong> fue guardada exitosamente!!</i>",
        });
        getInsulinas();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error 500!",
        });
      });
  };

  const updateInsulina = () => {
    if (!item) {
      return
    }

    fetch(`${import.meta.env.VITE_API_URL}/med/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Bien hecho!",
          html:
            "<i><strong>" +
            item.insulina +
            "</strong> fue actualizada exitosamente!!</i>",
        });
        getInsulinas();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error 500!",
        });
      });
  };

  const handleSubmit = () => {
    if (item && item.id === 0) {
      saveInsulina();
    } else {
      updateInsulina();
    }

    cleanData();
  };

  const cleanData = () => {
    setInsulina({
      id: 0,
      concentracion: "0",
      presentacion: 0,
      multiplo: 0,
      insulina: "",
      cantidad: 0,
      visible: true,
    });
    setModal(false);
  };

  return (
    <div className="card">
      <div className="card-header" style={{ backgroundColor: "#ff8c00" }}>
        <p className="card-header-title">{item.id === 0 ? "REGISTRE" : "EDITE"} SU PRODUCTO</p>
      </div>
      <div className="card-content">
        <div className="field mb-3">
          <label className="label fw-bold">Insulina:</label>
          <input
            onChange={(event) =>
              setInsulina({ ...item, insulina: event.target.value })
            }
            type="text"
            className="input"
            value={item?.insulina}
          />
        </div>
        <div className="field mb-3">
          <label className="label fw-bold">Concentración:</label>
          <input
            className="input"
            value={item.concentracion}
            onChange={(event) =>
              setInsulina({
                ...item,
                concentracion: String(event.target.value),
              })
            }
            type="number"
          />
        </div>
        <div className="field mb-3">
          <label className="label fw-bold">Presentación:</label>
          <input
            className="input"
            value={item.presentacion}
            onChange={(event) =>
              setInsulina({
                ...item,
                presentacion: Number(event.target.value),
              })
            }
            type="number"
          />
        </div>
        <div className="field mb-3">
          <label className="label fw-bold">Cantidad por Unidad:</label>
          <input
            className="input"
            value={item.multiplo}
            onChange={(event) =>
              setInsulina({
                ...item,
                multiplo: Number(event.target.value),
              })
            }
            type="number"
          />
        </div>
        <div className="field mb-3">
          <label className="label fw-bold">Cantidad:</label>
          <input
            value={item.cantidad}
            type="text"
            disabled
            className="input"
          />
        </div>

        <div className="is-flex is-justify-content-between">
          <button
            onClick={handleSubmit}
            className="button text-white is-fullwidth mr-3"
            style={{ backgroundColor: "#ff8c00" }}
          >
            {item.id === 0 ? "Guardar" : "Editar"}
          </button>
          <button
            onClick={cleanData}
            className="button is-danger text-white  is-fullwidth"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};