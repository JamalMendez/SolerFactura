import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function HeaderGroup({nombreBtn, onShowModal}){
    return(
        <div className='header-group'>
            <TextField 
            placeholder='Buscar'
            rows={1}
            size='small'
            style={{marginRight: '15px'}}
            />

            <Button
            size='medium'
            color='success'
            variant="contained"
            onClick={onShowModal}
            >
            Agregar {nombreBtn}
            </Button>
        </div>
    )
}