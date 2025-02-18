import { TextField } from "@mui/material"
export default function CamposClientes(){
    return(
        <div className='textfields-container'>
            <TextField
            label="Nombre"
            type="text"
            />

            <TextField
            label="Email"
            type="text"
            />

            <TextField
            label="Direccion"
            type="text"
            />

            <TextField
            label="Telefono"
            type="text"
            />
        </div>
    )
}