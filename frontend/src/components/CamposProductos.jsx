import { TextField } from "@mui/material"
export default function CamposProductos(){
    return(
        <div className='textfields-container'>
            <TextField
            label="Nombre"
            type="text"
            />

            <TextField
            label="Costo"
            type="number"
            />

            <TextField
            label="Tipo de producto"
            type="text"
            />
        </div>
    )
}