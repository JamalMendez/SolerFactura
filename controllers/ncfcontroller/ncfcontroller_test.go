package ncfcontroller

import (
	"testing"

	"ggstudios.com/solerfactura/dbconnection"
)

func TestCreate(t *testing.T) {
	serie := "B"
	tipo := "01"
	secuencia := "03940395"

	dbconnection.DbOpen()

	err := Create(serie, tipo, secuencia)

	if err != nil {
		t.Errorf("Ocurrio un error al insertar %v en la base de datos. Error: %b", dbconnection.NCF{Serie: serie, Tipo: tipo, Secuencia: secuencia}, err)
	}

	ncfs, _ := GetAll()
	dbconnection.Db.Unscoped().Delete(ncfs[len(ncfs)-1])
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
	serie := "B"
	tipo := "01"
	secuencia := "03940395"

	dbconnection.DbOpen()

	Create(serie, tipo, secuencia)

	ncfs, _ := GetAll()
	_, err := GetById(ncfs[len(ncfs)-1].ID)

	if err != nil {
		t.Errorf("Ha ocurrido un error al traer los datos: %v", err)
	}

	dbconnection.Db.Unscoped().Delete(ncfs[len(ncfs)-1])
	dbconnection.CloseDb()
}

func TestUpdate(t *testing.T) {
	serie := "B"
	tipo := "01"
	secuencia := "03940395"

	dbconnection.DbOpen()

	Create(serie, tipo, secuencia)

	ncfs, _ := GetAll()
	err := Update("A", "02", "48032098", ncfs[len(ncfs)-1].ID)

	if err != nil {
		t.Errorf("Ha ocurrido un error al traer o actualizar los datos: %v", err)
	}

	dbconnection.Db.Unscoped().Delete(ncfs[len(ncfs)-1])
	dbconnection.CloseDb()
}

func TestDelete(t *testing.T) {
	serie := "B"
	tipo := "01"
	secuencia := "03940395"

	dbconnection.DbOpen()

	Create(serie, tipo, secuencia)
	ncfs, _ := GetAll()

	IDTipoPago := ncfs[len(ncfs)-1].ID
	err := Delete(IDTipoPago)

	if err != nil {
		t.Errorf("Ha ocurrido un error al borrar los datos: %v", err)
	}

	ncf, _ := GetById(IDTipoPago)

	if ncf.ID != 0 {
		t.Errorf("No se debio de haber encontrado el tipo de pago con el ID: %v", IDTipoPago)
	}

	ncf.ID = IDTipoPago

	dbconnection.Db.Unscoped().Delete(ncf)
	dbconnection.CloseDb()
}
