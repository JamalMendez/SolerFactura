import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

export default function CamposProductos({
  nombre,
  setNombre,
  costo,
  setCosto,
  tipoProducto,
  setTipoProducto,
  opcionesTipoProducto,
  onEliminarTipoProducto
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

      <Autocomplete
        options={opcionesTipoProducto}
        getOptionLabel={(option) => 
          typeof option === "string" ? option : option.nombre // Devuelve solo el nombre como string
        }
        value={tipoProducto}
        onInputChange={(e, valor) => {
          setTipoProducto(valor); // Actualiza el valor cuando el usuario escribe
        }}
        onChange={(e, valor) => {
          if (valor && typeof valor === "object") {
            setTipoProducto(valor.nombre); // Actualiza el valor cuando se selecciona una opción
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Tipo de producto" />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.nombre}>
            <div className="option-type-product" style={{ display: "flex", justifyContent: 'space-between', width: '100%' }}>
              {typeof option === "string" ? option : <p>{option.nombre}</p>}
              <p onClick={() => {
                onEliminarTipoProducto(props['data-option-index']);
              }}>❌</p>
            </div>
          </li>
        )}
        freeSolo
        fullWidth
      />
    </div>
  );
}