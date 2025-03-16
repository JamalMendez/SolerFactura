import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  Checkbox,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OtrosCamposFactura({ onChange, productos, clientes }) {
  const [productosSeleccionados, setProductosSeleccionados] = useState([
    { producto: "", cantidad: 1, precioUnitario: 0, tipoDeMoneda: "RD" },
  ]);
  const [gastoEnvio, setGastoEnvio] = useState("");
  const [medioPago, setMedioPago] = useState("");
  const [cliente, setCliente] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [isDolar, setIsDolar] = useState(false);

  // NFC
  const [tipoNcf, setTipoNcf] = useState("01");
  const [serieNcf, setSerieNcf] = useState("A");
  const [secuencialNcf, setSecuencialNcf] = useState("00000001");

  // Update prices when currency changes
  useEffect(() => {
    const updatedProducts = productosSeleccionados.map(producto => {
      const productInfo = productos.find(p => p.nombre === producto.producto);
      if (productInfo) {
        return {
          ...producto,
          precioUnitario: isDolar ? productInfo.costoEnDolares : productInfo.costo,
          total: producto.cantidad * (isDolar ? productInfo.costoEnDolares : productInfo.costo),
          tipoDeMoneda: isDolar ? "USD" : "RD"
        };
      }
      return {...producto, precioUnitario: 0, total: 0, tipoDeMoneda: isDolar ? "USD" : "RD"};
    });
    
    setProductosSeleccionados(updatedProducts);
    onChange("productos", updatedProducts);
  }, [isDolar]);

  // SELECCION DE PRODUCTOS
  const handleProductoChange = (index, field, value) => {
    const nuevosProductos = [...productosSeleccionados];
    nuevosProductos[index][field] = value;

    if (field === "cantidad" || field === "producto") {
      const productoSeleccionado = productos.find(
        (p) => p.nombre === nuevosProductos[index].producto
      );
      if (productoSeleccionado) {
        const costo = isDolar ? productoSeleccionado.costoEnDolares : productoSeleccionado.costo;
        nuevosProductos[index].precioUnitario = costo;
        nuevosProductos[index].total = nuevosProductos[index].cantidad * costo;
      }
    }

    setProductosSeleccionados(nuevosProductos);
    onChange("productos", nuevosProductos);
  };

  // AGREGAR PRODUCTOS
  const agregarProducto = () => {
    setProductosSeleccionados([
      ...productosSeleccionados,
      { producto: "", cantidad: 1, precioUnitario: 0 },
    ]);
  };

  // ELIMINAR PRODUCTOS
  const eliminarProducto = (index) => {
    const nuevosProductos = productosSeleccionados.filter(
      (_, i) => i !== index
    );
    setProductosSeleccionados(nuevosProductos);
    onChange("productos", nuevosProductos); // Actualizar el estado en el componente padre
  };

  // Manejar cambios en los demás campos (Gasto de envío, Medio de pago, Cliente, Fecha Vencimiento)
  const handleChange = (name, value) => {
    if (name === "cliente") {
      setCliente(value);
    } else if (name === "gastoEnvio") {
      setGastoEnvio(value);
    } else if (name === "medioPago") {
      setMedioPago(value);
    } else if (name === "fechaVencimiento") {
      setFechaVencimiento(value);
    }
    onChange(name, value); // Pasar los cambios al componente padre
  };

  // Función para incrementar el secuencial del NCF
  const incrementarSecuencial = () => {
    const nuevoSecuencial = String(Number(secuencialNcf) + 1).padStart(8, "0");
    setSecuencialNcf(nuevoSecuencial);
    onChange("ncf", `${tipoNcf}-${serieNcf}-${nuevoSecuencial}`);
  };

  // Efecto para actualizar el NCF cuando cambia el tipo, serie o secuencial
  useEffect(() => {
    onChange("ncf", `${tipoNcf}-${serieNcf}-${secuencialNcf}`);
  }, [tipoNcf, serieNcf, secuencialNcf]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* Select de clientes */}
      <FormControl fullWidth>
        <InputLabel>Clientes</InputLabel>
        <Select
          value={cliente}
          onChange={(e) => handleChange("cliente", e.target.value)}
        >
          {clientes.map((c) => (
            <MenuItem key={c.id} value={c.nombre}>
              {c.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Checkbox para moneda */}
      <FormControlLabel 
        control={
          <Checkbox 
            size="large" 
            checked={isDolar}
            onChange={(e) => setIsDolar(e.target.checked)}
          />
        } 
        label="En Dólares" 
      />

      {productosSeleccionados.map((producto, index) => (
        <div
          key={index}
          style={{ display: "flex", gap: "10px", alignItems: "center" }}
        >
          <FormControl fullWidth>
            <InputLabel>Producto</InputLabel>
            <Select
              value={producto.producto}
              onChange={(e) =>
                handleProductoChange(index, "producto", e.target.value)
              }
            >
              {productos.map((p) => (
                <MenuItem key={p.id} value={p.nombre}>
                  {p.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Cantidad"
            type="number"
            value={producto.cantidad}
            onChange={(e) =>
              handleProductoChange(index, "cantidad", e.target.value)
            }
          />

          <TextField
            label={isDolar ? "Costo Unitario (USD)" : "Costo Unitario"}
            type="number"
            value={producto.precioUnitario}
            disabled
          />

          <Button
            variant="contained"
            color="error"
            onClick={() => eliminarProducto(index)}
          >
            <DeleteIcon />
          </Button>
        </div>
      ))}

      {/* Botón para agregar más productos */}
      <Button variant="contained" color="success" onClick={agregarProducto}>
        Agregar Producto
      </Button>

      {/* Campos NCF */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <FormControl fullWidth>
          <InputLabel>Tipo NCF</InputLabel>
          <Select
            value={tipoNcf}
            onChange={(e) => setTipoNcf(e.target.value)}
          >
            <MenuItem value="01">01</MenuItem>
            <MenuItem value="02">02</MenuItem>
            <MenuItem value="03">03</MenuItem>
            <MenuItem value="04">04</MenuItem>
            <MenuItem value="11">11</MenuItem>
            <MenuItem value="13">13</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Serie NCF</InputLabel>
          <Select
            value={serieNcf}
            onChange={(e) => setSerieNcf(e.target.value)}
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="E">E</MenuItem>
            <MenuItem value="F">F</MenuItem>
            <MenuItem value="M">M</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TextField
        label="Secuencial"
        value={secuencialNcf}
        type="text"
        onChange={(e) => setSecuencialNcf(e.target.value)}
      />

      {/* FECHA DE VENCIMIENTO */}
      <FormControl>
        <label>Fecha Vencimiento:</label>
        <TextField
          type="date"
          onChange={(e) => handleChange("fechaVencimiento", e.target.value)}
        />
      </FormControl>

      {/* Campo Gasto de envío */}
      <TextField
        label="Gasto de Envío (opcional)"
        type="number"
        value={gastoEnvio}
        onChange={(e) => handleChange("gastoEnvio", e.target.value)}
      />

      {/* Campo Medio de pago */}
      <FormControl>
        <InputLabel>Medio de pago</InputLabel>

        <Select
          value={medioPago}
          onChange={(e) => handleChange("medioPago", e.target.value)}
        >
          <MenuItem value="Efectivo">Efectivo</MenuItem>
          <MenuItem value="Transferencia">Transferencia</MenuItem>
          <MenuItem value="Tarjeta">Tarjeta</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}