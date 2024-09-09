import { useEffect, useState } from "react";
import { IMed } from "../interfaces";

interface Props {
  insulinasList: IMed[];
}

export const Calculadora: React.FC<Props> = ({ insulinasList }) => {
  const [multiplo, setMultiplo] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [dosisDiaria, setDosisDia] = useState(0);
  const [total, setTotal] = useState(0);

  const calcular = () => {
    if (multiplo === 0 || dosisDiaria === 0) {
      setTotal(0);
      return;
    }

    const cantidadADividir = multiplo * dosisDiaria;
    setTotal(Math.ceil(cantidadADividir / cantidad));
  };

  useEffect(() => {
    calcular();
  }, [multiplo, cantidad, dosisDiaria]);

  return (
    <div className="card">
      <div className="card-header text-white text-center" style={{ backgroundColor: "#ff8c00" }}>
        <div className="card-header-title">
          CALCULA EL PRODUCTO
        </div>
      </div>
      <div className="card-content">
        <div className="field mb-3">
          <label className="label fw-bold">Seleccionar Producto:</label>
          <div className="select">
            <select
              defaultValue=""
              onChange={(event) => {
                const [newMultiplo, newCantidad] = event.target.value.split("|").map(Number);
                setMultiplo(newMultiplo);
                setCantidad(newCantidad);
              }}
            >
              <option value="" disabled>-</option>
              {insulinasList.map((val: IMed) => (
                <option key={val.id} value={`${val.multiplo}|${val.cantidad}`}>
                  {val.insulina}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="field mb-3">
          <label className="label fw-bold">Dosis Total por Día:</label>
          <input
            className="input"
            onChange={(event) => setDosisDia(Number(event.target.value))}
            type="number"
          />
        </div>
        <div className="field mb-3 d-flex align-items-center">
          <label className="label fw-bold me-5">Cantidad a dispensar por mes:</label>
          <h1 className="is-size-1">{total}</h1>
        </div>
      </div>
    </div>
  );
};