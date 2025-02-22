import { TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";

const date = new Date();

const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");

export default function CamposFactura({
  nombre,
  setNombre,
  descripcion,
  setDescripcion,
  fechaVencimiento,
  setFechaVencimiento
}) {
  return (
    <div className="textfields-container">
      <TextField
        label="Nombre"
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <Textarea
        placeholder="Descripcion"
        value={descripcion}
        minRows={2}
        maxRows={4}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <TextField type="date" value={`${year}-${month}-${day}`} disabled />

      <TextField
        type="date"
        value={fechaVencimiento}
        onChange={(e) => setFechaVencimiento(e.target.value)}
      />
    </div>
  );
}
