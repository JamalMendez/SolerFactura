import "../styles/Ncf.css";
import Table from "../components/Table";
import HeaderGroup from "../components/HeaderGroup";
import Modal from "../components/Modal";
import { useState } from "react";
import CamposNcf from "../components/CamposNcf";
import { Button } from "@mui/material";
import useModal from "../hooks/UseModal";
import ModalConfirmacion from "../components/ModalConfirmacion";
import Alert from "@mui/joy/Alert";


const columnas = ["Tipo", "Secuencia", "Serie", "Activo", "Fecha De Creacion"];
const rows = [];

const date = new Date();
const day = String(date.getDate()).padStart(2, "0");
const month = String(date.getMonth() + 1).padStart(2, "0");
const year = date.getFullYear();

const fechaCreacion = `${year}-${month}-${day}`;

export default function Ncf() {
  const [isModal, setIsModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState(1);
  const [idSeleccionado, setIdSeleccionado] = useState(null);

  const [rows, setRows] = useState([]);
  const [tipo, setTipo] = useState("");
  const [secuencia, setSecuencia] = useState("");
  const [serie, setSerie] = useState("");
  const [fechaCreacion, setFechaCreacion] = useState("");

  const [
    isError,
    setIsError,
    mensajeAlerta,
    setMensajeAlerta,
    isModalConfirmacion,
    setIsModalConfirmacion,
    cancelarEliminacion
  ] = useModal();

  function showModal(id) {
    setIsModal(true)
    setTipo("");
    setSecuencia("");
    setSerie("");
    setFechaCreacion("");
    setIsEditing(false);

    if (typeof id === "number" && !isNaN(id)) {
      setIdSeleccionado(id);
      setIsEditing(true);
      editarFila(id);
    }
  }

  function validarInformacion() {
    if ([tipo, secuencia, serie].includes("")) {
      setMensajeAlerta("Campos no pueden ir vacios");
      setIsError(true);
      return;
    }

    setIsModal(false);
    setTipo("");
    setSecuencia("");
    setSerie("");

    if (!isEditing) {
      setRows((rows) => [
        {
          id,
          tipo,
          secuencia,
          serie,
          fechacreacion: fechaCreacion,
        },
        ...rows,
      ]);
      setId((id) => id + 1);
    } else {
      setRows((rows) =>
        rows.map((row, i) =>
          i === idSeleccionado
            ? {
                ...row,
                tipo,
                secuencia,
                serie,
                fechacreacion: fechaCreacion,
              }
            : row
        )
      );
      setIsEditing(false);
    }
  }

  function eliminarElemento(id) {
    setRows((rows) => rows.filter((row) => row.id !== id));
  }

  function editarFila(id) {
    const fila = rows.find((row, i) => i === id);
    if (fila) {
      console.log(fila.secuencia)
      setTipo(fila.tipo);
      setSecuencia(fila.secuencia);
      setSerie(fila.serie);
    }
  }

  return (
    <div className="factura-container">
      <header className="factura-header">
        <h1 className="factura-title">NCF</h1>
        <HeaderGroup nombreBtn={"NCF"} onShowModal={showModal} />
      </header>

      <main>
        <Table
          columnas={columnas}
          data={rows}
          setIsModalConfirmacion={setIsModalConfirmacion}
          onShowModal={showModal}
        />
      </main>

      {/* MODAL AGREGAR*/}
      {isModal && (
        <Modal setIsModal={setIsModal} modalNombre="Ncf">
          {mensajeAlerta && (
            <div>
              <Alert color="danger">{mensajeAlerta}</Alert>
            </div>
          )}

          <CamposNcf
            tipo={tipo}
            secuencia={secuencia}
            serie={serie}
            setTipo={setTipo}
            setSecuencia={setSecuencia}
            setSerie={setSerie}
          />
          <Button
            className="factura-button"
            variant="contained"
            color={isEditing ? "warning": "success"}
            onClick={validarInformacion}
          >
            {isEditing ? "Editar NCF" : "Agregar NCF"}
          </Button>
        </Modal>
      )}

      {/*MODAL CONFIRMACION DE ELIMINAR */}
      {isModalConfirmacion.active && (
        <ModalConfirmacion
          onEliminarElemento={eliminarElemento}
          setIsModalConfirmacion={setIsModalConfirmacion}
          id={isModalConfirmacion.id}
          onCancelar={cancelarEliminacion}
        />
      )}
    </div>
  );
}
