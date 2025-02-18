package ncfcontroller

import (
	"fmt"

	"ggstudios.com/solerfactura/dbconnection"
)

func Create(serie, tipo, secuencia string) error {
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

func CreateMany(serie, tipo string, secuencias []string) error {
	ncfs := make([]dbconnection.NCF, 0)

	for _, secuencia := range secuencias {

		ncfs = append(ncfs, dbconnection.NCF{
			Serie:     serie,
			Tipo:      tipo,
			Secuencia: secuencia,
		})
	}

	result := dbconnection.Db.Create(&ncfs)

	if result.Error != nil {
		return result.Error
	}

	for _, v := range ncfs {
		fmt.Println("usuario: ", v.ID)
	}

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

func GetActiveAll() ([]dbconnection.NCF, error) {
	ncfs := make([]dbconnection.NCF, 0)

	result := dbconnection.Db.Where("activo = ?", "1").Find(&ncfs)

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

func GetActiveById(id uint) (dbconnection.NCF, error) {
	ncf := new(dbconnection.NCF)

	result := dbconnection.Db.Where("activo = ?", "1").Find(ncf, id)

	if result.Error != nil {
		return *ncf, result.Error
	}

	fmt.Println("usuario: ", ncf.ID)
	fmt.Println("Filas: ", result.RowsAffected)

	return *ncf, nil
}

func Update(serie, tipo, secuencia string, id uint) (dbconnection.NCF, error) {
	ncf := new(dbconnection.NCF)

	result := dbconnection.Db.Where("activo = ?", "1").Find(ncf, id)

	if result.Error != nil {
		return *ncf, result.Error
	}

	ncf.Serie = serie
	ncf.Tipo = tipo
	ncf.Secuencia = secuencia
	dbconnection.Db.Save(ncf)

	return *ncf, nil
}

func Delete(id uint) (dbconnection.NCF, error) {
	ncf := new(dbconnection.NCF)

	result := dbconnection.Db.Where("activo = ?", "1").Find(ncf, id)

	if result.Error != nil {
		return *ncf, result.Error
	}

	ncf.Activo = false
	dbconnection.Db.Save(ncf)

	return *ncf, nil
}
