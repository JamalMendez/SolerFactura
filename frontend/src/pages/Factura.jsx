import '../styles/factura.css';
import Table from '../components/Table';
import HeaderGroup from '../components/HeaderGroup';

const columnas = ['Nombre', 'Descripcion', 'Fecha Creacion', 'Fecha Vencimientos'];
const rows = [
];

export default function Factura(){
    return(
        <div className="factura-container">
            <header className='factura-header'>
                <h1 className='factura-title'>Factura</h1>
                <HeaderGroup nombreBtn={'Factura'} />
            </header>  
            <main>
                <Table columnas={columnas} data={rows}/>
            </main>
        </div>
    );
}
