import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";

export default function OtrosCamposFactura({ onChange }) {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <FormControl>
                    <label>Clientes:</label>
                    <Select
                        name="cliente"
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    >
                        <MenuItem value="Cliente 1">Cliente 1</MenuItem>
                        <MenuItem value="Cliente 2">Cliente 2</MenuItem>
                        <MenuItem value="Cliente 3">Cliente 3</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <label>Productos:</label>
                    <Select
                        name="producto"
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    >
                        <MenuItem value="Producto 1">Producto 1</MenuItem>
                        <MenuItem value="Producto 2">Producto 2</MenuItem>
                        <MenuItem value="Producto 3">Producto 3</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <label>NCF:</label>
                    <Select
                        name="ncf"
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    >
                        <MenuItem value="NCF 1">NCF 1</MenuItem>
                        <MenuItem value="NCF 2">NCF 2</MenuItem>
                        <MenuItem value="NCF 3">NCF 3</MenuItem>
                    </Select>
                </FormControl>

                <FormControl>
                    <label>Gasto de Envio (opcional):</label>
                    <TextField type="number" />
                </FormControl>

                <FormControl>
                    <label>Medio de pago (opcional):</label>
                    <TextField/>
                </FormControl>
            </div>
        </>
    );
}