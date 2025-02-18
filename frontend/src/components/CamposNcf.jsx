import { TextField, Select } from "@mui/material"
export default function CamposNcf(){
    return(
        <div className='textfields-container'>
            <Select>
            </Select>

            <TextField
            label="Secuencia"
            type="text"
            />

            <TextField
            label="Serie"
            type="text"
            />

            <TextField
            type="date"
            />
        </div>
    )
}