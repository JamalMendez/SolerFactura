import "../styles/factura.css";
import Table from "../components/Table";
import HeaderGroup from "../components/HeaderGroup";
import Modal from "../components/Modal";
import { Button } from "@mui/material";
import { useState } from "react";
import Alert from "@mui/joy/Alert";
import CamposFactura from "../components/CamposFactura";
import ModalConfirmacion from "../components/ModalConfirmacion";

const columnas = [
  "ID",
  "Nombre",
  "Descripcion",
  "Fecha Creacion",
  "Fecha Vencimiento",
];

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

const fechaCreacion = `${year}-${month}-${day}`;

export default function Factura() {
  const [isModal, setIsModal] = useState(false);
  const [isModalConfirmacion, setIsModalConfirmacion] = useState({
    active: false,
    id: null,
  });

  const [isError, setIsError] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState("");
  const [id, setId] = useState(1);

  const [rows, setRows] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  function showModal() {
    setIsModal(true);
  }

  function validarInformacion() {
    if ([nombre, descripcion, fechaVencimiento].includes("")) {
      setMensajeAlerta("Campos no pueden ir vacios");
      setIsError(true);

      //DEVOLVER A LA NORMALIDAD
      setTimeout(() => {
        setMensajeAlerta("");
        setIsError(false);
      }, 3000);
      return;
    }

    {
      /*CERRAR MODAL Y LLENAR FILA*/
    }
    setIsModal(false);
    setNombre("");
    setDescripcion("");
    setFechaVencimiento("");

    setRows((rows) => [
      { id: id, nombre, descripcion, fechaCreacion, fechaVencimiento },
      ...rows,
    ]);
    setId((id) => id + 1);
  }

  function eliminarElemento(index) {
    setRows(rows.filter((e, i) => e.id !== index));
  }

  return (
    <div className="factura-container">
      <header className="factura-header">
        <h1 className="factura-title">Factura</h1>
        <HeaderGroup nombreBtn={"Factura"} onShowModal={showModal} />
      </header>

      <main>
        <Table
          columnas={columnas}
          data={rows}
          onEliminarElemento={eliminarElemento}
          setIsModalConfirmacion={setIsModalConfirmacion}
        />
      </main>

      {/* MODAL AGREGAR*/}
      {isModal ? (
        <Modal setIsModal={setIsModal} modalNombre="Factura">
          {mensajeAlerta ? (
            <div>
              <Alert color="danger">{mensajeAlerta}</Alert>
            </div>
          ) : (
            ""
          )}

          <CamposFactura
            setNombre={setNombre}
            setDescripcion={setDescripcion}
            setFechaVencimiento={setFechaVencimiento}
          />
          <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            color="success"
            onClick={validarInformacion}
          >
            Agregar Factura
          </Button>
        </Modal>
      ) : (
        ""
      )}

      {isModalConfirmacion.active ? (
        <ModalConfirmacion
          onEliminarElemento={eliminarElemento}
          setIsModalConfirmacion={setIsModalConfirmacion}
          id={isModalConfirmacion.id}
        />
      ) : (
        ""
      )}
    </div>
  );
}
