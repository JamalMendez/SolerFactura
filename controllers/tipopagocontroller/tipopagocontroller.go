package tipopagocontroller

import (
	"errors"
	"fmt"

	"ggstudios.com/solerfactura/dbconnection"
)

func Create(descripcion string) error {
	tipoPago := dbconnection.TipoPago{Descripcion: descripcion}

	result := dbconnection.Db.Create(&tipoPago)

	if result.Error != nil {
		return result.Error
	}

	fmt.Println("usuario: ", tipoPago.ID)
	fmt.Println("Filas: ", result.RowsAffected)

	return nil
}

func GetAll() ([]dbconnection.TipoPago, error) {
	tipoPagos := make([]dbconnection.TipoPago, 0)

	result := dbconnection.Db.Find(&tipoPagos)

	if result.Error != nil {
		return tipoPagos, result.Error
	}

	fmt.Println("Filas: ", result.RowsAffected)

	return tipoPagos, nil
}

func GetById(id uint) (dbconnection.TipoPago, error) {
	tipoPago := new(dbconnection.TipoPago)

	result := dbconnection.Db.Find(tipoPago, id)

	if result.Error != nil {
		return *tipoPago, result.Error
	}

	fmt.Println("usuario: ", tipoPago.ID)
	fmt.Println("Filas: ", result.RowsAffected)

	return *tipoPago, nil
}

func Update(descripcion string, id uint) error {
	tipoPago := new(dbconnection.TipoPago)

	result := dbconnection.Db.Find(tipoPago, id)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("no se encontro ningun producto")
	}

	if descripcion != "" {
		tipoPago.Descripcion = descripcion
	}

	result = dbconnection.Db.Save(tipoPago)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func Delete(id uint) error {
	tipoPago := new(dbconnection.TipoPago)

	result := dbconnection.Db.Find(tipoPago, id)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("no se encontro ningun producto")
	}

	result = dbconnection.Db.Delete(tipoPago)

	if result.Error != nil {
		return result.Error
	}

	return nil
}
