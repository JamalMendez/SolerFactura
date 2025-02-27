package facuracontrollerpackage

import (
	"fmt"
	"ggstudios.com/solerfactura/dbconnection"
	"testing"
)

func TestGetAll(t *testing.T) {
	dbconnection.DbOpen()
	_, err := GetAll()

	if err != nil {
		t.Errorf("Ha ocurrido un error al traer los datos: %v", err)
	}
	facturas := make([]dbconnection.Factura, 0)
	//productos := make([]dbconnection.Producto, 0)
	dbconnection.Db.Preload("Productos").Find(&facturas)

	for _, factura := range facturas {
		fmt.Println(factura)
	}
	dbconnection.CloseDb()
}
