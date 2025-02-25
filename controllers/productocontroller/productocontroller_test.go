package productocontroller

import (
	"ggstudios.com/solerfactura/dbconnection"
	"testing"
)

func TestCreate(t *testing.T) {
	descripcion := "un tipo7"
	var costo uint = 4350

	dbconnection.DbOpen()

	err := Create(descripcion, costo, 1)

	if err != nil {
		t.Errorf("Ocurrio un error al insertar %v en la base de datos. Error: %b", descripcion, err)
	}

	producto, _ := GetAll()
	dbconnection.Db.Unscoped().Delete(producto[len(producto)-1])
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
	var costo uint = 4350
	dbconnection.DbOpen()

	Create(descripcion, costo, 1)
	producto, _ := GetAll()
	_, err := GetById(producto[len(producto)-1].ID)

	if err != nil {
		t.Errorf("Ha ocurrido un error al traer los datos: %v", err)
	}

	productoO := dbconnection.Producto{}
	productoO.ID = producto[len(producto)-1].ID

	dbconnection.Db.Unscoped().Delete(&productoO)
	dbconnection.CloseDb()
}

func TestUpdate(t *testing.T) {
	descripcion := "un tipo7"
	var costo uint = 4350
	dbconnection.DbOpen()

	Create(descripcion, costo, 1)
	producto, _ := GetAll()
	err := Update("otro tipo 7", 3452, 2, producto[len(producto)-1].ID)

	if err != nil {
		t.Errorf("Ha ocurrido un error al traer o actualizar los datos: %v", err)
	}

	productoO := dbconnection.Producto{}
	productoO.ID = producto[len(producto)-1].ID

	dbconnection.Db.Unscoped().Delete(&productoO)
	dbconnection.CloseDb()
}

func TestDelete(t *testing.T) {
	descripcion := "un tipo7"
	var costo uint = 4350
	dbconnection.DbOpen()

	Create(descripcion, costo, 1)
	productos, _ := GetAll()

	IDProducto := productos[len(productos)-1].ID
	err := Delete(IDProducto)

	if err != nil {
		t.Errorf("Ha ocurrido un error al borrar los datos: %v", err)
	}

	producto, _ := GetById(IDProducto)

	if producto.ID != 0 {
		t.Errorf("No se debio de haber encontrado el tipo de pago con el ID: %v", producto)
	}

	producto.ID = IDProducto

	productoO := dbconnection.Producto{}
	productoO.ID = IDProducto

	dbconnection.Db.Unscoped().Delete(productoO)
	dbconnection.CloseDb()
}
