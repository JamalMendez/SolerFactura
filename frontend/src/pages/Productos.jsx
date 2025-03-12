import "../styles/Productos.css";
import { useState } from "react";
import { Button } from "@mui/material";
import Alert from "@mui/joy/Alert";
import Table from "../components/Table";
import HeaderGroup from "../components/HeaderGroup";
import Modal from "../components/Modal";
import CamposProductos from "../components/CamposProductos";
import ModalConfirmacion from "../components/ModalConfirmacion";
import useModal from "../hooks/UseModal";
import UseStorage from "../hooks/UseStorage";

const columnas = ["ID", "Nombre", "Costo", "Tipo de producto"];

export default function Productos() {
  const [isModal, setIsModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const [
    insertarLocalStorage,
    retornarLocalStorage,
    insertarUltimoId,
    retornarUltimoId,
  ] = UseStorage();

  const nombreTabla = "tablaProductos";
  const [rows, setRows] = useState(retornarLocalStorage(nombreTabla) || []);
  const [palabraFiltro, setPalabraFiltro] = useState("");
  const [busqueda, setBusqueda] = useState([]);
  const [nombre, setNombre] = useState("");
  const [costo, setCosto] = useState("");
  const [tipoProducto, setTipoProducto] = useState("");
  const [opcionesTipoProducto, setOpcionesTipoProducto] = useState(
    retornarLocalStorage("opcionesTipoProducto") || [
      { nombre: "eléctrico" },
      { nombre: "mecánico" },
      { nombre: "digital" },
    ]
  );

  const [id, setId] = useState(retornarUltimoId(nombreTabla));

  const [
    isError,
    setIsError,
    mensajeAlerta,
    setMensajeAlerta,
    isModalConfirmacion,
    setIsModalConfirmacion,
    cancelarEliminacion,
  ] = useModal();

  const handleShowModal = (id) => {
    limpiarCampos();
    setIsModal(true);
    setIsEditing(false);

    if (typeof id === "number" && !isNaN(id)) {
      setIdSeleccionado(id);
      setIsEditing(true);
      editarFila(id);
    }
  };

  const limpiarCampos = () => {
    setNombre("");
    setCosto("");
    setTipoProducto("");
  };

  const handleValidarInformacion = () => {
    if ([nombre, costo, tipoProducto].includes("")) {
      setMensajeAlerta("Campos no pueden ir vacíos");
      setIsError(true);
      return;
    }

    if (costo <= 0) {
      setMensajeAlerta("Producto no tiene costo");
      setIsError(true);
      return;
    }

    if (!isTipoProductoExistente()) {
      setOpcionesTipoProducto((productos) => {
        const nuevasOpciones = [...productos, { nombre: tipoProducto }];
        insertarLocalStorage("opcionesTipoProducto", nuevasOpciones);
        return nuevasOpciones;
      });
    }

    setIsModal(false);
    limpiarCampos();

    if (!isEditing) {
      agregarProducto();
    } else {
      editarProducto();
    }
  };

  const isTipoProductoExistente = () => {
    return opcionesTipoProducto.some(
      (producto) => producto.nombre === tipoProducto
    );
  };

  const agregarProducto = () => {
    setRows((rows) => {
      const nuevasRows = [
        {
          id,
          nombre,
          costo,
          tipodeproducto: tipoProducto,
        },
        ...rows,
      ];
      insertarLocalStorage(nombreTabla, nuevasRows);
      insertarUltimoId(nombreTabla, id + 1);
      return nuevasRows;
    });
    setId((id) => id + 1);
  };

  const editarProducto = () => {
    setRows((rows) => {
      const nuevasRows = rows.map((row, i) =>
        row.id === idSeleccionado
          ? {
              ...row,
              nombre,
              costo,
              tipodeproducto: tipoProducto,
            }
          : row
      );
      insertarLocalStorage(nombreTabla, nuevasRows);
      return nuevasRows;
    });
    setIsEditing(false);
  };

  const eliminarElemento = (id) => {
    setRows((rows) => {
      const nuevasRows = rows.filter((row) => row.id !== id);
      insertarLocalStorage(nombreTabla, nuevasRows);
      return nuevasRows;
    });
  };

  const editarFila = (id) => {
    const fila = rows.find((row, i) => row.id === id);
    if (fila) {
      setNombre(fila.nombre);
      setCosto(fila.costo);
      setTipoProducto(fila.tipodeproducto);
    }
  };

  const filtrarTabla = (palabraBusqueda) => {
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
  };

  const eliminarTipoProducto = (index) => {
    const listaActualizada = opcionesTipoProducto.filter((_, i) => i !== index);
    setOpcionesTipoProducto(listaActualizada);
    insertarLocalStorage("opcionesTipoProducto", listaActualizada);

    setTimeout(() => {
      setTipoProducto("");
    }, 0.2);
  };

  return (
    <div className="productos-container">
      <header className="productos-header">
        <h1 className="productos-title">Productos</h1>
        <HeaderGroup
          nombreBtn={"Productos"}
          onShowModal={handleShowModal}
          onFiltrarTabla={filtrarTabla}
        />
      </header>

      <main>
        <Table
          columnas={columnas}
          data={palabraFiltro.length > 0 ? busqueda : rows}
          setIsModalConfirmacion={setIsModalConfirmacion}
          onShowModal={handleShowModal}
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
        <Modal setIsModal={setIsModal} modalNombre="Productos">
          {mensajeAlerta && (
            <div>
              <Alert color="danger">{mensajeAlerta}</Alert>
            </div>
          )}

          <CamposProductos
            nombre={nombre}
            setNombre={setNombre}
            costo={costo}
            setCosto={setCosto}
            tipoProducto={tipoProducto}
            setTipoProducto={setTipoProducto}
            opcionesTipoProducto={opcionesTipoProducto}
            onEliminarTipoProducto={eliminarTipoProducto}
          />
          <Button
            className="productos-button"
            variant="contained"
            color={isEditing ? "warning" : "success"}
            onClick={handleValidarInformacion}
          >
            {isEditing ? "Editar Producto" : "Agregar Producto"}
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
