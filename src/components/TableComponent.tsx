import { IMed } from "../interfaces";

interface Props {
  insulinasList: IMed[];
  role: string;
  deleteInsulina: (id: number) => void;
  setInsulinaSeleccionada: (insulina: IMed) => void;
  setModal?: (visible: boolean) => void;
}

export const TableComponent: React.FC<Props> = ({
  role,
  insulinasList,
  deleteInsulina,
  setInsulinaSeleccionada,
  setModal
}) => {
  return (
    <div className="column">
      <div className="card" style={{ maxHeight: "400px", overflow: "auto" }}>
        <div className="card-content">
          <div className="table-container">
            <table className="table is-hoverable is-striped is-narrow is-fullwidth">
              <thead
                className="table-warning text-white"
                style={{ backgroundColor: "#ff8c00" }}
              >
                <tr>
                  <th className="text-center">ID</th>
                  <th style={{ width: "400px" }}>Producto</th>
                  <th className="text-center">Conc. UI/mL o mg/mL     </th>
                  <th className="text-center">Pres. mL     </th>
                  <th className="text-center">Cant/Und      </th>
                  <th className="text-center">Cant. UI o mg        </th>
                  {role === "administrador" && (<th className="text-center">Acciones       </th>)}
                </tr>
              </thead>
              <tbody>
                {insulinasList.map((insulina: IMed) => (
                  <tr key={insulina.id}>
                    <td className="text-center is-size-7">{insulina.id}</td>
                    <td className="text-center is-size-7">{insulina.insulina}</td>
                    <td className="text-center is-size-7">{insulina.concentracion}</td>
                    <td className="text-center is-size-7">{insulina.presentacion}</td>
                    <td className="text-center is-size-7">{insulina.multiplo}</td>
                    <td className="text-center is-size-7">{insulina.cantidad}</td>
                    <td className="text-center is-size-7">
                      {role === "administrador" && (
                        <div style={{ display: "flex", gap: "5px" }}>
                          <button
                            onClick={() => {
                              setInsulinaSeleccionada(insulina);
                              setModal && setModal(true);
                            }}
                            className="button is-info is-small text-white"
                          >
                            <i className="bi bi-pencil-square" />
                          </button>
                          <button
                            className="button is-danger is-small text-white"
                            onClick={() => deleteInsulina(insulina.id)}
                          >
                            <i className="bi bi-trash-fill" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};