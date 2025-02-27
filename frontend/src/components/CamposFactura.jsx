import { TextField } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import FormControl from "@mui/joy/FormControl";

export default function CamposFactura({
  descripcion,
  precioUnitario,
  total,
  onChange,
}) {
  return (
    <div className="textfields-container">
      <FormControl>
        <label>Fecha Vencimiento:</label>
        <TextField
          type="date"
          onChange={(e) => onChange("descripcion", e.target.value)}
        />
      </FormControl>
    </div>
  );
}
