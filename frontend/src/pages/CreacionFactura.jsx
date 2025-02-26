import React, { useRef, useState, useEffect } from "react";
import CamposFactura from "../components/CamposFactura";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import OtrosCamposFactura from "../components/OtrosCamposFactura";
import "../styles/CreacionFactura.css";
import { pdf } from "@react-pdf/renderer";
import MyDocument from "../PDF/SolerPdf";
import UseStorage from "../hooks/UseStorage";

export default function CreacionFactura() {
  const iframeRef = useRef(null);
  const navigate = useNavigate();
  const [insertarLocalStorage, retornarLocalStorage] = UseStorage();

  // Estado para los datos de la factura
  const [datosFactura, setDatosFactura] = useState({
    descripcion: "",
    precioUnitario: "",
    total: "",
    cliente: "Cliente 1",
    producto: "Producto 1",
    ncf: "NCF 1",
    gastoEnvio: "",
    medioPago: "",
  });

  // Estado para el cliente seleccionado
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  // Obtener los clientes desde el localStorage
  const clientes = retornarLocalStorage("tablaClientes") || [];

  // Función para manejar cambios en los campos
  const handleChange = (name, value) => {
    if (name === "cliente") {
      // Buscar el cliente seleccionado
      const cliente = clientes.find((c) => c.nombre === value);
      setClienteSeleccionado(cliente || null);
    }
    setDatosFactura((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Función para generar el PDF
  const generarPDF = async () => {
    const blob = await pdf(
      <MyDocument datosFactura={datosFactura} clienteSeleccionado={clienteSeleccionado} />
    ).toBlob();
    const pdfUrl = URL.createObjectURL(blob);
    iframeRef.current.src = pdfUrl;
  };

  // useEffect para generar el PDF automáticamente
  useEffect(() => {
    generarPDF();
  }, [datosFactura, clienteSeleccionado]);

  return (
    <>
      <div className="creacion-factura-contenedor">
        <div onClick={() => navigate("/")} className="btn-home">
          <Button color="success" variant="contained">
            Salir
          </Button>
        </div>
        <main className="inputs-factura">
          {/* Campos de la factura */}
          <h1 style={{ color: "green" }}>Campos de la factura</h1>
          <OtrosCamposFactura onChange={handleChange} clientes={clientes} />
          <CamposFactura
            descripcion={datosFactura.descripcion}
            precioUnitario={datosFactura.precioUnitario}
            total={datosFactura.total}
            onChange={handleChange}
          />

          <div style={{ marginTop: "20px" }}>
            <Button color="success" variant="contained">
              Generar Factura
            </Button>
          </div>
        </main>

        <aside className="visualizacion-factura">
          {/* Iframe para mostrar el PDF */}
          <iframe
            ref={iframeRef}
            title="Visualización de Factura"
            width="100%"
            height="500px"
            frameBorder="0"
          ></iframe>
        </aside>
      </div>
    </>
  );
}