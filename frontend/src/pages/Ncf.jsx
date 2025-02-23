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
import UseStorage from "../hooks/UseStorage";

const columnas = ["Tipo", "Secuencia", "Serie", "Activo", "Fecha De Creacion"];

const date = new Date();
const day = String(date.getDate()).padStart(2, "0");
const month = String(date.getMonth() + 1).padStart(2, "0");
const year = date.getFullYear();
const regex = /^\d{8,13}$/;

const fechaCreacion = `${year}-${month}-${day}`;

export default function Ncf() {
  const [isModal, setIsModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const [insertarLocalStorage, retornarLocalStorage, insertarUltimoId, retornarUltimoId] = UseStorage();

  const nombreTabla = "tablaNcf"; 
  const [rows, setRows] = useState(retornarLocalStorage(nombreTabla) || []);
  const [palabraFiltro, setPalabraFiltro] = useState(''); 
  const [busqueda, setBusqueda] = useState([]); 
  const [tipo, setTipo] = useState("");
  const [secuencia, setSecuencia] = useState("");
  const [serie, setSerie] = useState("");

  const [id, setId] = useState(retornarUltimoId(nombreTabla)); 

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
    setIsModal(true);
    setTipo("");
    setSecuencia("");
    setSerie("");
    setIsEditing(false);

    if (typeof id === "number" && !isNaN(id)) {
      setIdSeleccionado(id);
      setIsEditing(true);
      editarFila(id);
    } else {
      // GENERAR SECUENCIA
      generarSecuencia();
    }
  }

  function validarInformacion() {
    if ([tipo, secuencia, serie].includes("")) {
      setMensajeAlerta("Campos no pueden ir vacios");
      setIsError(true);
      return;
    }

    if (!regex.test(secuencia)) {
      setMensajeAlerta("Secuencial no valido");
      setIsError(true);
      return;
    }

    setIsModal(false);
    setTipo("");
    setSecuencia("");
    setSerie("");

    if (!isEditing) {
      setRows((rows) => {
        const nuevasRows = [
          {
            id,
            tipo,
            secuencia,
            serie,
            fechadecreacion: fechaCreacion,
          },
          ...rows,
        ];
        insertarLocalStorage(nombreTabla, nuevasRows); 
        insertarUltimoId(nombreTabla, id + 1); 
        return nuevasRows; 
      });
      setId((id) => id + 1);
    } else {
      setRows((rows) => {
        const nuevasRows = rows.map((row, i) =>
          i === idSeleccionado
            ? {
                ...row,
                tipo,
                secuencia,
                serie,
                fechacreacion: fechaCreacion,
              }
            : row
        );
        insertarLocalStorage(nombreTabla, nuevasRows); 
        return nuevasRows; 
      });
      setIsEditing(false);
    }
  }

  function generarSecuencia(secuencial) {
    let numeros = '';
    let tomarUltimoSecuencial = JSON.parse(localStorage.getItem('secuencial'));

    // SI NO HAY UN SECUENCIAL
    if (!tomarUltimoSecuencial) {
      setSecuencia("00000001");
      localStorage.setItem('secuencial', JSON.stringify('00000001'));
      return;
    }

    // SI HAY SECUENCIAL
    tomarUltimoSecuencial.split('').forEach(num => Number(num) > 0 ? numeros += num : '');
    numeros = Number(numeros) + 1;

    const secuencialActualizado = tomarUltimoSecuencial.slice(0, -numeros.toString().length) + numeros;
    setSecuencia(secuencialActualizado);

    if (secuencial) {
      localStorage.setItem('secuencial', JSON.stringify(secuencial));
    }
  }

  function eliminarElemento(id) {
    setRows((rows) => {
      const nuevasRows = rows.filter((row) => row.id !== id);
      insertarLocalStorage(nombreTabla, nuevasRows);
      return nuevasRows; 
    });
  }

  function editarFila(id) {
    const fila = rows.find((row, i) => i === id);
    if (fila) {
      setTipo(fila.tipo);
      setSecuencia(fila.secuencia);
      setSerie(fila.serie);
    }
  }

  function filtrarTabla(palabraBusqueda) {
    setPalabraFiltro(palabraBusqueda); 

    if (palabraBusqueda === '') {
      setBusqueda([]); 
    } else {
      const filtro = rows.filter(row =>
        Object.values(row).some(elemento =>
          String(elemento).toLowerCase().includes(palabraBusqueda.toLowerCase())
      ));
      setBusqueda(filtro); 
    }
  }

  return (
    <div className="factura-container">
      <header className="factura-header">
        <h1 className="factura-title">NCF</h1>
        <HeaderGroup
          nombreBtn={"NCF"}
          onShowModal={showModal}
          onFiltrarTabla={filtrarTabla} 
        />
      </header>

      <main>
        <Table
          columnas={columnas}
          data={palabraFiltro.length > 0 ? busqueda : rows}
          setIsModalConfirmacion={setIsModalConfirmacion}
          onShowModal={showModal}
        />
        {busqueda.length === 0 && palabraFiltro.length > 0 ? (
          <h1 style={{ textAlign: 'center', marginTop: '30px' }}>No hay datos de búsqueda</h1>
        ) : ''}
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
            color={isEditing ? "warning" : "success"}
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