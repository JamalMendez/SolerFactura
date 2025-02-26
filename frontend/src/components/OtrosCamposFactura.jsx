import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";

export default function OtrosCamposFactura({ onChange, clientes }) {
  const [clientesList, setClientesList] = useState([]);

  // Cargar los clientes al montar el componente
  useEffect(() => {
    if (clientes && clientes.length > 0) {
      setClientesList(clientes);
    }
  }, [clientes]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <FormControl>
          <label>Clientes:</label>
          <Select
            name="cliente"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          >
            {clientesList.map((cliente) => (
              <MenuItem key={cliente.id} value={cliente.nombre}>
                {cliente.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <label>Productos:</label>
          <Select
            name="producto"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          >
            <MenuItem value="Producto 1">Producto 1</MenuItem>
            <MenuItem value="Producto 2">Producto 2</MenuItem>
            <MenuItem value="Producto 3">Producto 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <label>NCF:</label>
          <Select
            name="ncf"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          >
            <MenuItem value="NCF 1">NCF 1</MenuItem>
            <MenuItem value="NCF 2">NCF 2</MenuItem>
            <MenuItem value="NCF 3">NCF 3</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <label>Gasto de Envio (opcional):</label>
          <TextField
            type="number"
            name="gastoEnvio"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        </FormControl>

        <FormControl>
          <label>Medio de pago (opcional):</label>
          <TextField
            name="medioPago"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
        </FormControl>
      </div>
    </>
  );
}