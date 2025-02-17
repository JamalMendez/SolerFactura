package tipopagocontroller

import (
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

func GetActiveAll() ([]dbconnection.TipoPago, error) {
	tipoPagos := make([]dbconnection.TipoPago, 0)

	result := dbconnection.Db.Where("activo = ?", "1").Find(&tipoPagos)

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

func GetActiveById(id uint) (dbconnection.TipoPago, error) {
	tipoPago := new(dbconnection.TipoPago)

	result := dbconnection.Db.Where("activo = ?", "1").Find(tipoPago, id)

	if result.Error != nil {
		return *tipoPago, result.Error
	}

	fmt.Println("usuario: ", tipoPago.ID)
	fmt.Println("Filas: ", result.RowsAffected)

	return *tipoPago, nil
}

func Update(descripcion string, id uint) (dbconnection.TipoPago, error) {
	tipoPago := new(dbconnection.TipoPago)

	result := dbconnection.Db.Where("activo = ?", "1").Find(tipoPago, id)

	if result.Error != nil {
		return *tipoPago, result.Error
	}

	tipoPago.Descripcion = descripcion
	dbconnection.Db.Save(tipoPago)

	return *tipoPago, nil
}

func Delete(id uint) (dbconnection.TipoPago, error) {
	tipoPago := new(dbconnection.TipoPago)

	result := dbconnection.Db.Where("activo = ?", "1").Find(tipoPago, id)

	if result.Error != nil {
		return *tipoPago, result.Error
	}

	tipoPago.Activo = false
	dbconnection.Db.Save(tipoPago)

	return *tipoPago, nil
}
