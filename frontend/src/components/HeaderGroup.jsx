import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

export default function HeaderGroup({ onFiltrarTabla, nombreBtn, onShowModal }) {
  const navigate = useNavigate();

  return (
    <div className="header-group">
      <TextField
        placeholder="Buscar"
        rows={1}
        size="small"
        style={{ marginRight: "15px" }}
        onChange={e => onFiltrarTabla(e.target.value)}
      />

      {
        nombreBtn ? 
        <Button
        size="medium"
        color="success"
        variant="contained"
        onClick={() => nombreBtn === 'Factura' ? navigate('/creacion-factura') : onShowModal()}
      >
        Agregar {nombreBtn}
      </Button>
        :
        ''
      }
    </div>
  );
}
