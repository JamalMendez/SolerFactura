package clientecontroller

import (
	"testing"

	"ggstudios.com/solerfactura/dbconnection"
)

func TestCreate(t *testing.T) {
	rnc_cedula := "40221323212"
	nombre := "pepito"
	apellido := "veras"
	email := "pepitoveras@gmail.com"
	direccion := "calle ppe"
	telefono := "8093489232"
	celular := "8093435893"

	dbconnection.DbOpen()

	err := Create(rnc_cedula, nombre, apellido, email, direccion, telefono, celular)

	if err != nil {
		t.Errorf("Ocurrio un error al insertar al cliente en la base de datos. Error: %b", err)
	}

	tipoPagos, _ := GetAll()
	dbconnection.Db.Unscoped().Delete(tipoPagos[len(tipoPagos)-1])
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
	rnc_cedula := "40221323212"
	nombre := "pepito"
	apellido := "veras"
	email := "pepitoveras@gmail.com"
	direccion := "calle ppe"
	telefono := "8093489232"
	celular := "8093435893"

	dbconnection.DbOpen()

	Create(rnc_cedula, nombre, apellido, email, direccion, telefono, celular)
	tipoPagos, _ := GetAll()
	_, err := GetById(tipoPagos[len(tipoPagos)-1].ID)

	if err != nil {
		t.Errorf("Ha ocurrido un error al traer los datos: %v", err)
	}

	dbconnection.Db.Unscoped().Delete(tipoPagos[len(tipoPagos)-1])
	dbconnection.CloseDb()
}

func TestUpdate(t *testing.T) {
	rnc_cedula := "40221323212"
	nombre := "pepito"
	apellido := "veras"
	email := "pepitoveras@gmail.com"
	direccion := "calle ppe"
	telefono := "8093489232"
	celular := "8093435893"

	dbconnection.DbOpen()

	Create(rnc_cedula, nombre, apellido, email, direccion, telefono, celular)
	tipoPagos, _ := GetAll()

	rnc_cedula = "40221323542"
	nombre = "pepeo"
	apellido = "veraseo"
	email = "pepeoveraseo@gmail.com"
	direccion = "calle ppe0"
	telefono = "8093485432"
	celular = "8093235893"

	err := Update(rnc_cedula, nombre, apellido, email, direccion, telefono, celular, tipoPagos[len(tipoPagos)-1].ID)

	if err != nil {
		t.Errorf("Ha ocurrido un error al traer o actualizar los datos: %v", err)
	}

	dbconnection.Db.Unscoped().Delete(tipoPagos[len(tipoPagos)-1])
	dbconnection.CloseDb()
}

func TestDelete(t *testing.T) {
	rnc_cedula := "40221323212"
	nombre := "pepito"
	apellido := "veras"
	email := "pepitoveras@gmail.com"
	direccion := "calle ppe"
	telefono := "8093489232"
	celular := "8093435893"

	dbconnection.DbOpen()

	Create(rnc_cedula, nombre, apellido, email, direccion, telefono, celular)
	tipoPagos, _ := GetAll()

	IDTipoPago := tipoPagos[len(tipoPagos)-1].ID
	err := Delete(IDTipoPago)

	if err != nil {
		t.Errorf("Ha ocurrido un error al borrar los datos: %v", err)
	}

	tipoPago, _ := GetById(IDTipoPago)

	if tipoPago.ID != 0 {
		t.Errorf("No se debio de haber encontrado el tipo de pago con el ID: %v", IDTipoPago)
	}

	tipoPago.ID = IDTipoPago

	dbconnection.Db.Unscoped().Delete(tipoPago)
	dbconnection.CloseDb()
}
