import "../styles/Clientes.css";
import Table from "../components/Table";
import HeaderGroup from "../components/HeaderGroup";
import { Button } from "@mui/material";
import Modal from "../components/Modal";
import { useState } from "react";
import CamposClientes from "../components/CamposClientes";

const columnas = ["Cedula", "Nombre", "E-mail", "Direccion", "Telefono"];
const rows = [];

export default function Clientes() {
  const [isModal, setIsModal] = useState(false);
  const [isError, setIsError] = useState(false);

  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  function showModal() {
    setIsModal(true);
  }
  return (
    <div className="clientes-container">
      <header className="clientes-header">
        <h1 className="clientes-title">Clientes</h1>

        {/* GRUPO HEADER */}
        <HeaderGroup nombreBtn={"Clientes"} onShowModal={showModal} />
      </header>

      {/* TABLA */}
      <main>
        <Table columnas={columnas} data={rows} />
      </main>

      {/* MODAL AGREGAR*/}
      {isModal ? (
        <Modal setIsModal={setIsModal} modalNombre="Clientes">
          <CamposClientes
            setCedula={setCedula}
            setNombre={setNombre}
            setEmail={setEmail}
            setDireccion={setDireccion}
            setTelefono={setTelefono}
          />
          <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            color="success"
          >
            Agregar Clientes
          </Button>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
}
