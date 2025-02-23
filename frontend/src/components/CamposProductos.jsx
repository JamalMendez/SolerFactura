import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export default function CamposProductos({
  nombre,
  setNombre,
  costo,
  setCosto,
  tipoProducto,
  setTipoProducto,
}) {

  // Lista de opciones para el Autocomplete
  const opcionesTipoProducto = [
    { nombre: "eléctrico" },
    { nombre: "mecánico" },
    { nombre: "digital" },
  ];

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

      <Autocomplete
        options={opcionesTipoProducto}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.nombre
        }
        value={tipoProducto}
        onChange={(e, valor) => {
          if (valor && typeof valor === "object") {
            setTipoProducto(valor.nombre); 
          } else {
            setTipoProducto(valor || ""); 
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Tipo de producto"/>
        )}
        freeSolo 
        fullWidth
      />
    </div>
  );
}