import { TextField } from "@mui/material";

export default function CamposProductos({
  nombre,
  setNombre,
  costo,
  setCosto,
  tipoProducto,
  setTipoProducto,
}) {
  return (
    <div className="textfields-container">
      <TextField
        label="Nombre"
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        fullWidth
      />

      <TextField
        label="Costo"
        type="number"
        value={costo}
        onChange={(e) => setCosto(e.target.value)}
        fullWidth
      />

      <TextField
        label="Tipo de producto"
        type="text"
        value={tipoProducto}
        onChange={(e) => setTipoProducto(e.target.value)}
        fullWidth
      />
    </div>
  );
}