import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function HeaderGroup({nombreBtn}){
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
            >
            Agregar {nombreBtn}
            </Button>
        </div>
    )
}