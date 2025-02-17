import '../styles/Productos.css';
import Table from '../components/Table';
import HeaderGroup from '../components/HeaderGroup';

const columnas = ['Nombre', 'Costo', 'Tipo de producto'];
const rows = [
]

export default function Productos(){
    return(
        <div className="productos-container">

            <header className='productos-header'>
                <h1 className='productos-title'>Productos</h1>

                {/* GRUPO HEADER */}
                <HeaderGroup nombreBtn={'Productos'}/>
            </header>  

            {/* TABLA */}
            <main>
                <Table columnas={columnas} data={rows}/>
            </main>
        </div>
    )
}