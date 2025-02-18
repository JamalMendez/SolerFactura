import '../styles/factura.css';
import Table from '../components/Table';
import HeaderGroup from '../components/HeaderGroup';
import  Modal from '../components/Modal';
import {Button} from '@mui/material';
import { useState } from 'react';
import CamposFactura from '../components/CamposFactura';

const columnas = ['Nombre', 'Descripcion', 'Fecha Creacion', 'Fecha Vencimientos'];
const rows = [];

export default function Factura(){
    const [isModal, setIsModal] = useState(false);
    const [isError, setIsError] = useState(false);

    function showModal(){
        setIsModal(true)
    }

    return(
        <div className="factura-container">
            <header className='factura-header'>
                <h1 className='factura-title'>Factura</h1>
                <HeaderGroup nombreBtn={'Factura'} onShowModal={showModal}/>
            </header>  

            <main>
                <Table columnas={columnas} data={rows}/>
            </main>

            {/* MODAL AGREGAR*/}
            {isModal ?
             <Modal setIsModal={setIsModal} modalNombre="Factura">

                <CamposFactura />
                <Button style={{marginTop: '10px'}} variant='contained' color='success'>Agregar Factura</Button>

             </Modal>
              :
              ''
            }
        </div>
    );
}
