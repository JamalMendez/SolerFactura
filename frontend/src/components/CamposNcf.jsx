import { TextField, Select } from "@mui/material"
export default function CamposNcf(setTipo, setSecuencia, setSerie){
    return(
        <div className='textfields-container'>
            <Select onChange={e => setTipo(e.target.value)}>
            </Select>

            <TextField
            label="Secuencia"
            type="text"
            onChange={e => setSecuencia(e.target.value)}
            />

            <TextField
            label="Serie"
            type="text"
            onChange={e => setSerie(e.target.value)}
            />

            <TextField
            type="date"
            />
        </div>
    )
}