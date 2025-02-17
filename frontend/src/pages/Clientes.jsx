import '../styles/Clientes.css';
import Table from '../components/Table';
import HeaderGroup from '../components/HeaderGroup';

const columnas = ['Cedula', 'Nombre', 'E-mail', 'Direccion', 'Telefono'];
const rows = []

export default function Clientes(){
    return(
        <div className="clientes-container">

            <header className='clientes-header'>
                <h1 className='clientes-title'>Clientes</h1>

                {/* GRUPO HEADER */}
                <HeaderGroup nombreBtn={'Clientes'} />
            </header>  

            {/* TABLA */}
            <main>
                <Table columnas={columnas} data={rows}/>
            </main>
        </div>
    )
}