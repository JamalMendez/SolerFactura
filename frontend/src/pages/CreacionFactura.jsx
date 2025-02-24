import React, { useRef, useState, useEffect } from 'react';
import CamposFactura from '../components/CamposFactura';
import {useNavigate} from 'react-router-dom';
import { Button } from '@mui/material';
import OtrosCamposFactura from '../components/OtrosCamposFactura';
import '../styles/CreacionFactura.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function CreacionFactura() {
    const iframeRef = useRef(null); // Referencia al iframe
    const navigate = useNavigate()

    // Estado para los datos de la factura
    const [datosFactura, setDatosFactura] = useState({
        cantidad: 1,
        descripcion: "Inversor Fronius 8 KW Canadian Solar",
        precioUnitario: "RD$55,848.00",
        total: "RD$55,848.00",
        cliente: "Cliente 1",
        producto: "Producto 1",
        ncf: "NCF 1"
    });

    // Función para manejar cambios en los campos
    const handleChange = (name, value) => {
        setDatosFactura(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Función para generar el PDF
    const generarPDF = () => {
        const doc = new jsPDF();

        // Datos de la factura (obtenidos del estado)
        const headers = [["Cantidad", "Descripción", "Precio unitario", "TOTAL"]];
        const data = [
            [datosFactura.cantidad, datosFactura.descripcion, datosFactura.precioUnitario, datosFactura.total]
        ];

        // Crear la tabla
        doc.autoTable({
            head: headers,
            body: data,
            startY: 20,
            theme: 'striped',
            styles: { fontSize: 10 },
            headStyles: { fillColor: [22, 200, 133] }
        });

        // Convertir el PDF a una URL
        const pdfUrl = doc.output('bloburl');

        // Asignar la URL al iframe
        iframeRef.current.src = pdfUrl;
    };

    // useEffect para generar el PDF automáticamente
    useEffect(() => {
        generarPDF();
    }, [datosFactura]); // Se ejecuta cada vez que datosFactura cambia

    return (
        <>
            <div className="creacion-factura-contenedor">
                <div onClick={() => navigate('/')} className='btn-home'><Button color="success" variant='contained'>Salir</Button></div>
                <main className="inputs-factura">
                    <h1 style={{color: 'green'}}>Datos de Factura</h1>
                    {/* Campos de la factura */}
                    <CamposFactura
                        cantidad={datosFactura.cantidad}
                        descripcion={datosFactura.descripcion}
                        precioUnitario={datosFactura.precioUnitario}
                        total={datosFactura.total}
                        onChange={handleChange}
                    />

                    <h1 style={{color: 'green'}}>Campos de la factura</h1>
                    <OtrosCamposFactura onChange={handleChange} />

                    <div style={{marginTop: '20px'}}>
                        <Button color='success' variant='contained'>Generar Factura</Button>
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