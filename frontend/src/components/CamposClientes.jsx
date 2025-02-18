import { TextField } from "@mui/material";
export default function CamposClientes(
  setCedula,
  setNombre,
  setEmail,
  setDireccion,
  setTelefono
) {
  return (
    <div className="textfields-container">
      <TextField
        label="Cedula"
        type="text"
        onChange={(e) => setCedula(e.target.value)}
      />

      <TextField
        label="Nombre"
        type="text"
        onChange={(e) => setNombre(e.target.value)}
      />

      <TextField
        label="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Direccion"
        type="text"
        onChange={(e) => setDireccion(e.target.value)}
      />

      <TextField
        label="Telefono"
        type="text"
        onChange={(e) => setTelefono(e.target.value)}
      />
    </div>
  );
}
