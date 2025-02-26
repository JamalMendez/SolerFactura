package tipoproductocontroller

import (
	"errors"
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

func Update(descripcion string, id uint) error {
	tipoProducto := new(dbconnection.TipoProducto)

	result := dbconnection.Db.Find(tipoProducto, id)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("no se encontro ningun producto")
	}

	if descripcion != "" {
		tipoProducto.Descripcion = descripcion
	}

	result = dbconnection.Db.Save(tipoProducto)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func Delete(id uint) error {
	tipoProducto := new(dbconnection.TipoProducto)

	result := dbconnection.Db.Find(tipoProducto, id)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("no se encontro ningun producto")
	}

	result = dbconnection.Db.Delete(tipoProducto)

	if result.Error != nil {
		return result.Error
	}

	return nil
}
