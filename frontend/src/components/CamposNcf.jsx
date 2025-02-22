import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function CamposNcf({tipo, secuencia, serie, setTipo, setSecuencia, setSerie}) {
  return (
    <div className="textfields-container">

<     TextField
        label="Serie"
        value={serie}
        type="text"
        onChange={(e) => setSerie(e.target.value)}
      />
      
      <FormControl variant="filled">
        <InputLabel>Tipo NCF</InputLabel>
        <Select
          value={tipo}
          onChange={e => setTipo(e.target.value)}
        >
          <MenuItem value={'01'}>01</MenuItem>
          <MenuItem value={'02'}>02</MenuItem>
          <MenuItem value={'03'}>03</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Secuencial"
        value={secuencia}
        type="text"
        onChange={(e) => setSecuencia(e.target.value)}
      />

      
      <FormControl>
        <label style={{marginBottom: '10px'}}>Fecha De Creacion:</label>
        <TextField type="date" value={'2024-01-20'} disabled/>
      </FormControl>
    </div>
  );
}
