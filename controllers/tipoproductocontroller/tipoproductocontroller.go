package tipoproductocontroller

import (
	"fmt"

	"ggstudios.com/solerfactura/dbconnection"
)

func Create(descripcion string) error {
	tipoProducto := dbconnection.TipoProducto{Descripcion: descripcion}

	result := dbconnection.Db.Create(&tipoProducto)

	if result.Error != nil {
		return result.Error
	}

	fmt.Println("usuario: ", tipoProducto.ID)
	fmt.Println("Filas: ", result.RowsAffected)

	return nil
}

func GetAll() ([]dbconnection.TipoProducto, error) {
	tipoProductos := make([]dbconnection.TipoProducto, 0)

	result := dbconnection.Db.Find(&tipoProductos)

	if result.Error != nil {
		return tipoProductos, result.Error
	}

	fmt.Println("Filas: ", result.RowsAffected)

	return tipoProductos, nil
}

func GetActiveAll() ([]dbconnection.TipoProducto, error) {
	tipoProductos := make([]dbconnection.TipoProducto, 0)

	result := dbconnection.Db.Where("activo = ?", "1").Find(&tipoProductos)

	if result.Error != nil {
		return tipoProductos, result.Error
	}

	fmt.Println("Filas: ", result.RowsAffected)

	return tipoProductos, nil
}

func GetById(id uint) (dbconnection.TipoProducto, error) {
	tipoProducto := new(dbconnection.TipoProducto)

	result := dbconnection.Db.Find(tipoProducto, id)

	if result.Error != nil {
		return *tipoProducto, result.Error
	}

	fmt.Println("usuario: ", tipoProducto.ID)
	fmt.Println("Filas: ", result.RowsAffected)

	return *tipoProducto, nil
}

func GetActiveById(id uint) (dbconnection.TipoProducto, error) {
	tipoProducto := new(dbconnection.TipoProducto)

	result := dbconnection.Db.Where("activo = ?", "1").Find(tipoProducto, id)

	if result.Error != nil {
		return *tipoProducto, result.Error
	}

	fmt.Println("usuario: ", tipoProducto.ID)
	fmt.Println("Filas: ", result.RowsAffected)

	return *tipoProducto, nil
}

func Update(descripcion string, id uint) (dbconnection.TipoProducto, error) {
	tipoProducto := new(dbconnection.TipoProducto)

	result := dbconnection.Db.Where("activo = ?", "1").Find(tipoProducto, id)

	if result.Error != nil {
		return *tipoProducto, result.Error
	}

	tipoProducto.Descripcion = descripcion
	dbconnection.Db.Save(tipoProducto)

	return *tipoProducto, nil
}

func Delete(id uint) (dbconnection.TipoProducto, error) {
	tipoProducto := new(dbconnection.TipoProducto)

	result := dbconnection.Db.Where("activo = ?", "1").Find(tipoProducto, id)

	if result.Error != nil {
		return *tipoProducto, result.Error
	}

	tipoProducto.Activo = false
	dbconnection.Db.Save(tipoProducto)

	return *tipoProducto, nil
}
