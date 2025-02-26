package ncfcontroller

import (
	"errors"
	"fmt"
	"strings"

	"ggstudios.com/solerfactura/dbconnection"
)

func Create(serie, tipo, secuencia string) error {

	if err := dataValidation(&serie, &tipo, &secuencia); err != nil {
		return err
	}

	ncf := dbconnection.NCF{
		Serie:     serie,
		Tipo:      tipo,
		Secuencia: secuencia,
	}

	result := dbconnection.Db.Create(&ncf)

	if result.Error != nil {
		return result.Error
	}

	fmt.Println("usuario: ", ncf.ID)
	fmt.Println("Filas: ", result.RowsAffected)

	return nil
}

func GetAll() ([]dbconnection.NCF, error) {
	ncfs := make([]dbconnection.NCF, 0)

	result := dbconnection.Db.Find(&ncfs)

	if result.Error != nil {
		return ncfs, result.Error
	}

	fmt.Println("Filas: ", result.RowsAffected)

	return ncfs, nil
}

func GetById(id uint) (dbconnection.NCF, error) {
	ncf := new(dbconnection.NCF)

	result := dbconnection.Db.Find(ncf, id)

	if result.Error != nil {
		return *ncf, result.Error
	}

	fmt.Println("usuario: ", ncf.ID)
	fmt.Println("Filas: ", result.RowsAffected)

	return *ncf, nil
}

func Update(serie, tipo, secuencia string, id uint) error {
	ncf := new(dbconnection.NCF)

	if err := dataValidation(&serie, &tipo, &secuencia); err != nil {
		return err
	}

	result := dbconnection.Db.Find(ncf, id)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("no se encontro ningun producto")
	}

	if serie == "" {
		serie = ncf.Serie
	}

	if tipo == "" {
		tipo = ncf.Tipo
	}

	if secuencia == "" {
		secuencia = ncf.Secuencia
	}

	ncf.Serie = serie
	ncf.Tipo = tipo
	ncf.Secuencia = secuencia
	result = dbconnection.Db.Save(ncf)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func Delete(id uint) error {
	ncf := new(dbconnection.NCF)

	result := dbconnection.Db.Find(ncf, id)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("no se encontro ningun producto")
	}

	result = dbconnection.Db.Delete(ncf)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func dataValidation(serie, tipo, secuencia *string) error {
	*serie = strings.ToUpper(*serie)

	if len(*tipo) != 2 {
		return errors.New("solo se pueden ingresar 2 digitos en el tipo")
	}

	if len(*secuencia) != 8 {
		return errors.New("solo se pueden ingresar 8 digitos en la secuencia")
	}

	return nil
}
