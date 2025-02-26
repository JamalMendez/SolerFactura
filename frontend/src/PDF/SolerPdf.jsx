import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import SolerImagen from './solerSello.png'

const styles = StyleSheet.create({
  container: {
    margin: "40px auto 0 30px",
  },
  encabezado: {
    width: "70vw",
    textAlign: "center",
    gap: "2px",
  },
  facturaTitle: {
    position: "absolute",
    right: "50px",
    width: "25vw",
    top: "130px",
    fontSize: "35px",
    fontWeight: "900",
  },
  columnasHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90vw",
    marginTop: "150px",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  table: {
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    width: "90vw",
    borderTop: "2px solid black",
    borderRight: "2px solid black",
    borderLeft: "2px solid black",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid black",
    padding: "8px 0",
  },
  cell: {
    width: "20%",
    textAlign: "center",
    fontSize: "17px",
  },
  rectangle: {
    width: "90vw",
    height: "180px",
    border: "2px solid black",
    marginTop: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  footerText: {
    marginTop: "10px",
    textAlign: "center",
    fontSize: "14px",
  },
});

const MyDocument = ({ datosFactura }) => (
  <Document>
    <Page size="A3" orientation="portrait" style={styles.container}>
      {/* ENCABEZADO */}
      <View style={styles.encabezado}>
        <Text>Roderick Electro Solar R.S.L.</Text>
        <Text>Julio Verne No. 25 Gazcue</Text>
        <Text>Santo Domingo .R.D. Teléfono. 809-763-0249 RNC 1-32-64245-7</Text>
      </View>

      <View style={styles.facturaTitle}>
        <Text>Factura</Text>
      </View>

      <View>
        <Text
          style={{
            width: "100vw",
            height: "2px",
            backgroundColor: "black",
            top: "110px",
            position: "absolute",
          }}
        ></Text>
      </View>

      {/* Contenedor Flex */}
      <View style={styles.columnasHeader}>
        {/* COLUMNA IZQUIERDA */}
        <View style={[styles.flex]}>
          <View style={{ gap: "10px", marginRight: "20px" }}>
            <Text style={{ marginBottom: "10px", fontSize: "20px" }}>Cliente</Text>
            <Text>Nombre</Text>
            <Text>Dirección</Text>
            <Text>Ciudad</Text>
            <Text>Teléfono</Text>
          </View>

          <View style={{ gap: "12px", marginRight: "20px" }}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text>____________________________</Text>
            <Text>____________________________</Text>
            <Text>____________________________</Text>
            <Text>____________________________</Text>
          </View>
        </View>

        {/* COLUMNA DERECHA */}
        <View style={[styles.flex, { gap: "20px" }]}>
          <View style={{ gap: "10px" }}>
            <Text style={{ marginBottom: "10px", fontSize: "20px" }}>Varios</Text>
            <Text>Fecha</Text>
            <Text>NCF</Text>
            <Text>Valida</Text>
          </View>

          <View style={{ gap: "10px" }}>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text>_____________________</Text>
            <Text>_____________________</Text>
            <Text>_____________________</Text>
          </View>
        </View>
      </View>

      {/* TABLA */}
      <View style={styles.table}>
        {/* Encabezado de la tabla */}
        <View style={styles.row}>
          <Text style={[styles.cell, { fontWeight: "bold" }]}>Cantidad</Text>
          <Text style={[styles.cell, { fontWeight: "bold" }]}>Descripción</Text>
          <Text style={[styles.cell, { fontWeight: "bold" }]}>Precio Unitario</Text>
          <Text style={[styles.cell, { fontWeight: "bold" }]}>Total</Text>
        </View>

        {/* Filas de la tabla */}
        <View style={styles.row}>
          <Text style={styles.cell}>1</Text>
          <Text style={styles.cell}>{datosFactura.descripcion}</Text>
          <Text style={styles.cell}>{datosFactura.precioUnitario}</Text>
          <Text style={styles.cell}>{datosFactura.total}</Text>
        </View>
      </View>

      {/* Rectángulo con imagen */}
      <View style={styles.rectangle}>
        <Image
          src={SolerImagen} // URL de la imagen
          style={styles.image}
        />
      </View>

      {/* Texto debajo del rectángulo */}
      <View style={styles.footerText}>
        <Text>Calle julio Verne # 24, Gazcue. Santo Domingo; Rep. Dom. Teléfono. 809-763-0249</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;