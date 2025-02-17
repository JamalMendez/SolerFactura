import '../styles/Ncf.css';
import Table from '../components/Table';
import HeaderGroup from '../components/HeaderGroup';

const columnas = ['Tipo', 'Secuencia', 'Serie', 'Fecha De Creacion'];
const rows = []

export default function Ncf(){
    return(
        <div className="ncf-container">

            <header className='ncf-header'>
                <h1 className='ncf-title'>NCF</h1>

                {/* GRUPO HEADER */}
                <HeaderGroup nombreBtn={'NCF'}/>
            </header>  

            {/* TABLA */}
            <main>
                <Table columnas={columnas} data={rows}/>
            </main>
        </div>
    )
}