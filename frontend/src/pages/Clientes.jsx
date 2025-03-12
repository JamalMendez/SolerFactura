import "../styles/Clientes.css";
import Table from "../components/Table";
import HeaderGroup from "../components/HeaderGroup";
import Modal from "../components/Modal";
import UseStorage from "../hooks/UseStorage";
import { Button } from "@mui/material";
import { useState } from "react";
import Alert from "@mui/joy/Alert";
import CamposClientes from "../components/CamposClientes";
import ModalConfirmacion from "../components/ModalConfirmacion";
import useModal from "../hooks/UseModal";

const columnas = [
  "Cedula",
  "Nombre",
  "E-mail",
  "Direccion",
  "Ciudad",
  "Telefono",
  "Celular",
];
const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export default function Clientes() {
  const [
    insertarLocalStorage,
    retornarLocalStorage,
    insertarUltimoId,
    retornarUltimoId,
  ] = UseStorage();

  const nombreTabla = "tablaClientes";
  const [isModal, setIsModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);

  const [rows, setRows] = useState(retornarLocalStorage(nombreTabla) || []);
  const [palabraFiltro, setPalabraFiltro] = useState("");
  const [busqueda, setBusqueda] = useState([]);
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [celular, setCelular] = useState("");
  const [ciudad, setCiudad] = useState("");

  const [id, setId] = useState(retornarUltimoId(nombreTabla)); // Inicializa el ID desde el localStorage

  const [
    isError,
    setIsError,
    mensajeAlerta,
    setMensajeAlerta,
    isModalConfirmacion,
    setIsModalConfirmacion,
    cancelarEliminacion,
  ] = useModal();

  function showModal(id) {
    limpiarCampos();
    setIsModal(true);
    setIsEditing(false);

    if (typeof id === "number" && !isNaN(id)) {
      setIdSeleccionado(id);
      setIsEditing(true);
      editarFila(id);
    }
  }

  function validarInformacion() {
    if (
      camposVacios() ||
      !validarFormatoEmail() ||
      !validarCedula() ||
      !validarTelefonos()
    ) {
      return;
    }
    procesarDatos();
  }

  function camposVacios() {
    if (
      [cedula, nombre, email, direccion, telefono, celular, ciudad].includes("")
    ) {
      mostrarError("Campos no pueden ir vacíos");
      return true;
    }
    return false;
  }

  function validarFormatoEmail() {
    if (!regex.test(email)) {
      mostrarError("Email inválido");
      return false;
    }
    return true;
  }

  function validarCedula() {
    if (cedula.length !== 11) {
      mostrarError("Cédula inválida");
      return false;
    }
    return true;
  }

  function validarTelefonos() {
    if (telefono.length !== 10 || celular.length !== 10) {
      mostrarError("Teléfono/Celular inválido");
      return false;
    }
    return true;
  }

  function mostrarError(mensaje) {
    setMensajeAlerta(mensaje);
    setIsError(true);
  }

  function procesarDatos() {
    setIsModal(false);
    limpiarCampos();

    if (!isEditing) {
      agregarCliente();
    } else {
      actualizarCliente();
    }
  }

  function limpiarCampos() {
    setCedula("");
    setNombre("");
    setEmail("");
    setDireccion("");
    setCiudad("");
    setTelefono("");
    setCelular("");
  }

  function agregarCliente() {
    setRows((rows) => {
      const nuevasRows = [
        { id, cedula, nombre, email, direccion, ciudad, telefono, celular },
        ...rows,
      ];
      insertarLocalStorage(nombreTabla, nuevasRows);
      insertarUltimoId(nombreTabla, id + 1);
      return nuevasRows;
    });
    setId((id) => id + 1);
  }

  function actualizarCliente() {
    setRows((rows) => {
      const nuevasRows = rows.map((row) =>
        row.id === idSeleccionado
          ? {
              ...row,
              cedula,
              nombre,
              email,
              direccion,
              ciudad,
              telefono,
              celular,
            }
          : row
      );
      insertarLocalStorage(nombreTabla, nuevasRows);
      return nuevasRows;
    });
    setIsEditing(false);
  }

  function eliminarElemento(id) {
    setRows((rows) => {
      const nuevasRows = rows.filter((row) => row.id !== id);
      insertarLocalStorage(nombreTabla, nuevasRows); // Guarda el array actualizado
      return nuevasRows;
    });
  }

  function editarFila(id) {
    const fila = rows.find((row) => row.id === id);
    if (fila) {
      setCedula(fila.cedula);
      setNombre(fila.nombre);
      setEmail(fila.email);
      setDireccion(fila.direccion);
      setCiudad(fila.ciudad);
      setTelefono(fila.telefono);
      setCelular(fila.celular);
    }
  }

  function filtrarTabla(palabraBusqueda) {
    setPalabraFiltro(palabraBusqueda);

    if (palabraBusqueda === "") {
      setBusqueda([]);
    } else {
      const filtro = rows.filter((row) =>
        Object.values(row).some((elemento) =>
          String(elemento).toLowerCase().includes(palabraBusqueda.toLowerCase())
        )
      );
      setBusqueda(filtro);
    }
  }

  return (
    <div className="clientes-container">
      <header className="clientes-header">
        <h1 className="clientes-title">Clientes</h1>
        <HeaderGroup
          onFiltrarTabla={filtrarTabla}
          nombreBtn={"Clientes"}
          onShowModal={showModal}
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
          <h1 style={{ textAlign: "center", marginTop: "30px" }}>
            No hay datos de búsqueda
          </h1>
        ) : (
          ""
        )}
      </main>

      {/* MODAL AGREGAR*/}
      {isModal && (
        <Modal setIsModal={setIsModal} mensajeAlerta={mensajeAlerta} modalNombre="Clientes">
          {mensajeAlerta && (
            <div className="alert">
              <Alert color="danger">{mensajeAlerta}</Alert>
            </div>
          )}

          <CamposClientes
            cedula={cedula}
            setCedula={setCedula}
            nombre={nombre}
            setNombre={setNombre}
            email={email}
            setEmail={setEmail}
            direccion={direccion}
            setDireccion={setDireccion}
            telefono={telefono}
            setTelefono={setTelefono}
            celular={celular}
            setCelular={setCelular}
            ciudad={ciudad}
            setCiudad={setCiudad}
            mensajeAlerta={mensajeAlerta}
          />
          <Button
            className="clientes-button"
            variant="contained"
            color={isEditing ? "warning" : "success"}
            onClick={validarInformacion}
          >
            {isEditing ? "Editar Cliente" : "Agregar Cliente"}
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
