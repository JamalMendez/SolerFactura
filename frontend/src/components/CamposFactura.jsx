import { TextField } from "@mui/material"
import  Textarea  from "@mui/joy/Textarea"

const date = new Date();

const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');

export default function CamposFactura(){
    return(
        <div className='textfields-container'>
            <TextField
            label="Nombre"
            type="text"
            />

            <Textarea
            placeholder="Descripcion"
            minRows={2}
            maxRows={4}
            />

            <TextField
            type="date"
            value={`${year}-${month}-${day}`}
            disabled
            />

            <TextField
            type="date"
            />
        </div>
    )
}