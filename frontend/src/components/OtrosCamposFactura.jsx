import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function OtrosCamposFactura({ onChange, productos, clientes }) {
  const [productosSeleccionados, setProductosSeleccionados] = useState([
    { producto: "", cantidad: 1, precioUnitario: 0, total: 0 },
  ]);
  const [ncf, setNcf] = useState("");
  const [gastoEnvio, setGastoEnvio] = useState("");
  const [medioPago, setMedioPago] = useState("");
  const [cliente, setCliente] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  // Manejar la selección de productos y sus cantidades
  const handleProductoChange = (index, field, value) => {
    const nuevosProductos = [...productosSeleccionados];
    nuevosProductos[index][field] = value;

    // Calcular el total si se cambia la cantidad o el producto
    if (field === "cantidad" || field === "producto") {
      const productoSeleccionado = productos.find(
        (p) => p.nombre === nuevosProductos[index].producto
      );
      if (productoSeleccionado) {
        nuevosProductos[index].precioUnitario = productoSeleccionado.costo;
        nuevosProductos[index].total =
          nuevosProductos[index].cantidad * productoSeleccionado.costo;
      }
    }

    setProductosSeleccionados(nuevosProductos);
    onChange("productos", nuevosProductos); // Pasar los productos seleccionados al componente padre
  };

  // Agregar un nuevo producto al formulario
  const agregarProducto = () => {
    setProductosSeleccionados([
      ...productosSeleccionados,
      { producto: "", cantidad: 1, precioUnitario: 0, total: 0 },
    ]);
  };

  // Eliminar un producto del formulario
  const eliminarProducto = (index) => {
    const nuevosProductos = productosSeleccionados.filter(
      (_, i) => i !== index
    );
    setProductosSeleccionados(nuevosProductos);
    onChange("productos", nuevosProductos); // Actualizar el estado en el componente padre
  };

  // Manejar cambios en los demás campos (NCF, Gasto de envío, Medio de pago, Cliente, Fecha Vencimiento)
  const handleChange = (name, value) => {
    if (name === "cliente") {
      setCliente(value);
    } else if (name === "ncf") {
      setNcf(value);
    } else if (name === "gastoEnvio") {
      setGastoEnvio(value);
    } else if (name === "medioPago") {
      setMedioPago(value);
    } else if (name === "fechaVencimiento") {
      setFechaVencimiento(value);
    }
    onChange(name, value); // Pasar los cambios al componente padre
  };

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

      {/* Select de productos */}
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
            label="Precio Unitario"
            type="number"
            value={producto.precioUnitario}
            disabled
          />

          <TextField
            label="Total"
            type="number"
            value={producto.total}
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

      {/* Campo NCF */}
      <FormControl fullWidth>
        <InputLabel>NCF</InputLabel>
        <Select
          value={ncf}
          onChange={(e) => handleChange("ncf", e.target.value)}
        >
          <MenuItem value="NCF 1">NCF 1</MenuItem>
          <MenuItem value="NCF 2">NCF 2</MenuItem>
          <MenuItem value="NCF 3">NCF 3</MenuItem>
        </Select>
      </FormControl>

      {/* Campo Gasto de envío */}
      <TextField
        label="Gasto de Envío (opcional)"
        type="number"
        value={gastoEnvio}
        onChange={(e) => handleChange("gastoEnvio", e.target.value)}
      />

      {/* Campo Medio de pago */}
      <TextField
        label="Medio de pago"
        value={medioPago}
        onChange={(e) => handleChange("medioPago", e.target.value)}
      />
    </div>
  );
}
