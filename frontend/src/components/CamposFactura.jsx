import { TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import FormControl from "@mui/joy/FormControl";

export default function CamposFactura({
  cantidad,
  descripcion,
  precioUnitario,
  total,
  onChange
}) {
  return (
    <div className="textfields-container">
      <TextField
        label="Cantidad"
        type="number"
        value={cantidad}
        onChange={(e) => onChange("cantidad", e.target.value)}
      />

      <Textarea
        placeholder="Descripción"
        value={descripcion}
        minRows={2}
        maxRows={4}
        onChange={(e) => onChange("descripcion", e.target.value)}
      />

      <TextField
        label="Precio Unitario"
        type="text"
        value={precioUnitario}
        onChange={(e) => onChange("precioUnitario", e.target.value)}
      />

      <TextField
        label="Total"
        type="text"
        value={total}
        onChange={(e) => onChange("total", e.target.value)}
      />
    </div>
  );
}