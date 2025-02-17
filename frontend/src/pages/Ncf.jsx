import '../styles/Ncf.css';
import Table from '../components/Table';
import HeaderGroup from '../components/HeaderGroup';
import Modal from '../components/Modal';
import { useState } from 'react';
import CamposProductos from '../components/CamposProductos';
import { Button } from '@mui/material';

const columnas = ['Tipo', 'Secuencia', 'Serie', 'Fecha De Creacion'];
const rows = []

export default function Ncf(){

    const [isModal, setIsModal] = useState(false);
    const [isError, setIsError] = useState(false);

    function showModal(){
        setIsModal(true)
    }

    return(
        <div className="ncf-container">

            <header className='ncf-header'>
                <h1 className='ncf-title'>NCF</h1>

                {/* GRUPO HEADER */}
                <HeaderGroup nombreBtn={'NCF'} onShowModal={showModal}/>
            </header>  

            {/* TABLA */}
            <main>
                <Table columnas={columnas} data={rows}/>
            </main>

            {/* MODAL AGREGAR*/}
            {isModal ?
             <Modal setIsModal={setIsModal} modalNombre="NCF">
                <CamposProductos />
                <Button style={{marginTop: '10px'}} variant='contained' color='success'>Agregar NCF</Button>
             </Modal>
              :
              ''
            }
        </div>
    )
}