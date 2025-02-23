export default function UseStorage() {
    function insertarLocalStorage(nombre, valor) {
      localStorage.setItem(nombre, JSON.stringify(valor));
    }
  
    function retornarLocalStorage(nombre) {
      return JSON.parse(localStorage.getItem(nombre));
    }
  
    function insertarUltimoId(nombreTabla, id) {
      localStorage.setItem(`ultimoId_${nombreTabla}`, id);
    }
  
    function retornarUltimoId(nombreTabla) {
      return parseInt(localStorage.getItem(`ultimoId_${nombreTabla}`)) || 1;
    }
  
    return [insertarLocalStorage, retornarLocalStorage, insertarUltimoId, retornarUltimoId];
  }