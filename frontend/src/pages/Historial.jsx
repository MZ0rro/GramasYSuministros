import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/historial.css";

export default function HistorialEntradas() {
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const abrirModal = () => setModalOpen(true);
  const cerrarModal = () => setModalOpen(false);

  return (
    <div className="header">
      <header>
        <div className="logo">
          <div className="logo-placeholder"></div>
        </div>
        <h2>Administrar Inventarios</h2>
        <div className="user-icon"></div>
      </header>

      <main>
        <h1>Historial de entradas - Grama Kukuyo</h1>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Stock</th>
                <th>Proveedor</th>
                <th>Entrada</th>
                <th>SubTotal</th>
                <th>Salida</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>19/06/2025</td>
                <td>146</td>
                <td>Janne Wu</td>
                <td>22</td>
                <td>168</td>
                <td>12</td>
                <td>156</td>
              </tr>
              <tr>
                <td>21/05/2025</td>
                <td>47</td>
                <td>Mónica Yin</td>
                <td>129</td>
                <td>176</td>
                <td>30</td>
                <td>146</td>
              </tr>
              <tr>
                <td>17/04/2025</td>
                <td>41</td>
                <td>Janne Wu</td>
                <td>23</td>
                <td>64</td>
                <td>17</td>
                <td>47</td>
              </tr>
              <tr>
                <td>20/03/2025</td>
                <td>1</td>
                <td>Janne Wu</td>
                <td>50</td>
                <td>51</td>
                <td>10</td>
                <td>41</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="button-group">
          <button className="regresar" onClick={() => navigate("/Stock")}>
            Regresar
          </button>

          <button className="agregar" onClick={abrirModal}>
            Agregar
          </button>
        </div>
      </main>

      {/* MODAL */}
      {modalOpen && (
        <div className="modal show">
          <div className="modal-content">
            <h2>Nueva entrada para “Grama Kukuyo”</h2>

            <form>
              <div className="form-group">
                <label htmlFor="fecha">Fecha de entrada</label>
                <input
                  type="text"
                  id="fecha"
                  placeholder="Ingrese la fecha de entrada del producto"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cantidad">Cantidad</label>
                <input
                  type="text"
                  id="cantidad"
                  placeholder="Ingrese la cantidad de entrada"
                />
              </div>

              <div className="form-group full">
                <label htmlFor="proveedor">Proveedor</label>
                <input
                  type="text"
                  id="proveedor"
                  placeholder="Ingrese el proveedor del producto"
                />
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  className="descartar"
                  onClick={cerrarModal}
                >
                  Descartar
                </button>

                <button type="submit" className="guardar">
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
