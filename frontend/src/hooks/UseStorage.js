export default function UseStorage(){

    function insertarLocalStorage(nombre, valor){
        return localStorage.setItem(nombre, JSON.stringify(valor));
    }

    function retornarLocalStorage(nombre){
        return JSON.parse(localStorage.getItem(nombre));
    }

    return [insertarLocalStorage, retornarLocalStorage]
}