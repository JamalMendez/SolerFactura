import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import OtrosCamposFactura from "../components/CamposFactura";
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
    precioUnitario: 0,
    total: 0,
    cliente: "Cliente 1",
    productos: [], // Array de productos seleccionados
    ncf: "NCF 1",
    gastoEnvio: 0, // Cambiado a número
    medioPago: "",
    fechaVencimiento: ""
  });

  // Estado para el cliente seleccionado
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  // Obtener los clientes y productos desde el localStorage
  const clientes = retornarLocalStorage("tablaClientes") || [];
  const productos = retornarLocalStorage("tablaProductos") || [];

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

  // Calcular el subtotal (suma de los totales de los productos)
  const calcularSubtotal = () => {
    return datosFactura.productos.reduce((acc, producto) => acc + producto.total, 0);
  };

  // Calcular el total (subtotal + gasto de envío)
  const calcularTotal = () => {
    const subtotal = calcularSubtotal();
    return Number(subtotal) + Number((datosFactura.gastoEnvio || 0));
  };

  // Función para generar el PDF
  const generarPDF = async () => {
    const blob = await pdf(
      <MyDocument
        datosFactura={datosFactura}
        clienteSeleccionado={clienteSeleccionado}
        subtotal={calcularSubtotal()}
        total={calcularTotal()}
        fechaVencimiento={datosFactura.fechaVencimiento} 
      />
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
          <h1 style={{ color: "green", marginBottom: "20px" }}>Campos de la factura</h1>
          <OtrosCamposFactura
            onChange={handleChange}
            clientes={clientes}
            productos={productos}
          />

          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            <Button
              onClick={() => {
                generarPDF();
              }}
              color="success"
              variant="contained"
            >
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