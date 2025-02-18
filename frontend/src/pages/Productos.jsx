import '../styles/Productos.css';
import Table from '../components/Table';
import HeaderGroup from '../components/HeaderGroup';
import Modal from '../components/Modal'
import { useState } from 'react';
import { Button } from '@mui/material';
import CamposProductos from '../components/CamposProductos';

const columnas = ['Nombre', 'Costo', 'Tipo de producto'];
const rows = []

export default function Productos(){

    const [isModal, setIsModal] = useState(false);
    const [isError, setIsError] = useState(false);

    const [nombre, setNombre] = useState('');
    const [costo, setCosto] = useState('');
    const [tipoProducto, setTipoProducto] = useState('');

    function showModal(){
        setIsModal(true)
    }

    return(
        <div className="productos-container">

            <header className='productos-header'>
                <h1 className='productos-title'>Productos</h1>

                {/* GRUPO HEADER */}
                <HeaderGroup 
                nombreBtn={'Productos'}
                onShowModal={showModal}
                />
            </header>  

            {/* TABLA */}
            <main>
                <Table columnas={columnas} data={rows}/>
            </main>

            {/* MODAL AGREGAR*/}
            {isModal ?
             <Modal setIsModal={setIsModal} modalNombre="Productos">
                <CamposProductos 
                setNombre={setNombre}
                setCosto={setCosto}
                setTipoProducto={setTipoProducto}
                />
                <Button style={{marginTop: '10px'}} variant='contained' color='success'>Agregar Producto</Button>
             </Modal>
              :
              ''
            }
        </div>
    )
}