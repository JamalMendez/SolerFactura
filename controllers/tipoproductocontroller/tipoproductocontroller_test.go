package tipoproductocontroller

import (
	"testing"

	"ggstudios.com/solerfactura/dbconnection"
)

func TestCreate(t *testing.T) {
	descripcion := "un tipo7"

	dbconnection.DbOpen()

	err := Create(descripcion)

	if err != nil {
		t.Errorf("Ocurrio un error al insertar %v en la base de datos. Error: %b", descripcion, err)
	}

	tipoProductos, _ := GetAll()
	dbconnection.Db.Unscoped().Delete(tipoProductos[len(tipoProductos)-1])
	dbconnection.CloseDb()
}

func TestGetAll(t *testing.T) {
	dbconnection.DbOpen()
	_, err := GetAll()

	if err != nil {
		t.Errorf("Ha ocurrido un error al traer los datos: %v", err)
	}
	dbconnection.CloseDb()
}

func TestGetById(t *testing.T) {
	descripcion := "un tipo7"
	dbconnection.DbOpen()

	Create(descripcion)
	tipoProductos, _ := GetAll()
	_, err := GetById(tipoProductos[len(tipoProductos)-1].ID)

	if err != nil {
		t.Errorf("Ha ocurrido un error al traer los datos: %v", err)
	}

	dbconnection.Db.Unscoped().Delete(tipoProductos[len(tipoProductos)-1])
	dbconnection.CloseDb()
}

func TestUpdate(t *testing.T) {
	descripcion := "un tipo7"
	dbconnection.DbOpen()

	Create(descripcion)
	tipoProductos, _ := GetAll()
	err := Update("otro tipo 7", tipoProductos[len(tipoProductos)-1].ID)

	if err != nil {
		t.Errorf("Ha ocurrido un error al traer o actualizar los datos: %v", err)
	}

	dbconnection.Db.Unscoped().Delete(tipoProductos[len(tipoProductos)-1])
	dbconnection.CloseDb()
}

func TestDelete(t *testing.T) {
	descripcion := "un tipo7"
	dbconnection.DbOpen()

	Create(descripcion)
	tipoProductos, _ := GetAll()

	IDTipoProducto := tipoProductos[len(tipoProductos)-1].ID
	err := Delete(IDTipoProducto)

	if err != nil {
		t.Errorf("Ha ocurrido un error al borrar los datos: %v", err)
	}

	tipoProducto, _ := GetById(IDTipoProducto)

	if tipoProducto.ID != 0 {
		t.Errorf("No se debio de haber encontrado el tipo de pago con el ID: %v", IDTipoProducto)
	}

	tipoProducto.ID = IDTipoProducto

	dbconnection.Db.Unscoped().Delete(tipoProducto)
	dbconnection.CloseDb()
}
