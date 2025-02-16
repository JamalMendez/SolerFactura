import { useState } from 'react'
import '../styles/Menu.css'

import MenuElement from "./MenuElement"
export default function Menu(){

    const menusTitles = [
        "Factura",
        "NCF",
        "Clientes",
        "Productos",
    ]
    const [active, setActive] = useState(null);
    const [menuActive, setMenuActive] = useState(true);
    
    return(
            <>
                {/*MENU HAMBURGUESA*/}
                <img className='menu-hamburguesa' src={menuActive ? '/images/menu-hamburguesa.svg':'/images/menu-hamburguesa-negro.svg'} alt="menu-hamburguesa" onClick={() => setMenuActive(!menuActive)}/>

                {/*MENU*/}
                <nav className={`nav-menu ${!menuActive ? 'menu-disabled': ''}`}>

                    <img width={'200px'} src="\images\R.electro solar logo (3).png" alt="Electro Solar Completo" />

                    <div className="container-menu-element">
                        {menusTitles.map((menu, i) => <MenuElement titulo={menu} key={i} active={active} setActive={setActive}/>)}
                    </div>
                </nav>
            </>
    )
}