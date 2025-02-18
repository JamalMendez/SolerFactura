import { TextField } from "@mui/material"
export default function CamposProductos(setTipoProducto, setNombre, setCosto){
    return(
        <div className='textfields-container'>
            <TextField
            label="Nombre"
            type="text"
            onChange={e => setNombre(e.target.value)}
            />

            <TextField
            label="Costo"
            type="number"
            onChange={e => setCosto(e.target.value)}
            />

            <TextField
            label="Tipo de producto"
            type="text"
            onChange={e => setTipoProducto(e.target.value)}
            />
        </div>
    )
}