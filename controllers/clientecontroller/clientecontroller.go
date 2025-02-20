package clientecontroller

import (
	"errors"
	"fmt"
	"strings"

	"ggstudios.com/solerfactura/dbconnection"
)

func Create(rnc_cedula, nombre, apellido, email, direccion, telefono, celular string) error {
	err := dataValidation(&rnc_cedula, &email, &telefono, &celular)

	if err != nil {
		return err
	}

	cliente := dbconnection.Cliente{
		RND_Cedula: rnc_cedula,
		Nombre:     nombre,
		Apellido:   apellido,
		Email:      email,
		Direccion:  direccion,
		Telefono:   telefono,
		Celular:    celular,
	}

	result := dbconnection.Db.Create(&cliente)

	if result.Error != nil {
		return result.Error
	}

	fmt.Println("usuario: ", cliente.ID)
	fmt.Println("Filas: ", result.RowsAffected)

	return nil
}

func GetAll() ([]dbconnection.Cliente, error) {
	clientes := make([]dbconnection.Cliente, 0)

	result := dbconnection.Db.Find(&clientes)

	if result.Error != nil {
		return clientes, result.Error
	}

	fmt.Println("Filas: ", result.RowsAffected)

	return clientes, nil
}

func GetById(id uint) (dbconnection.Cliente, error) {
	cliente := new(dbconnection.Cliente)

	result := dbconnection.Db.Find(cliente, id)

	if result.Error != nil {
		return *cliente, result.Error
	}

	fmt.Println("usuario: ", cliente.ID)
	fmt.Println("Filas: ", result.RowsAffected)

	return *cliente, nil
}

func Update(rnc_cedula, nombre, apellido, email, direccion, telefono, celular string, id uint) error {
	cliente := new(dbconnection.Cliente)

	err := dataValidation(&rnc_cedula, &email, &telefono, &celular)

	if err != nil {
		return err
	}

	result := dbconnection.Db.Find(cliente, id)

	if result.Error != nil {
		return result.Error
	}

	dataUpdateValidation(&rnc_cedula, &nombre, &apellido, &email, &direccion, &telefono, &celular, cliente)

	dbconnection.Db.Save(cliente)

	return nil
}

func Delete(id uint) error {
	cliente := new(dbconnection.Cliente)

	result := dbconnection.Db.Find(cliente, id)

	if result.Error != nil {
		return result.Error
	}

	dbconnection.Db.Delete(cliente)

	return nil
}

func dataValidation(rnc_cedula, email, telefono, celular *string) error {
	isDotAtTheEdge := strings.HasPrefix(*email, ".") || strings.HasSuffix(*email, ".")
	isArrAtTheEdge := strings.HasPrefix(*email, "@") || strings.HasSuffix(*email, "@")
	emailContainArrDot := strings.Contains(*email, "@") && strings.Contains(*email, ".")
	isEmailInvalid := !emailContainArrDot || isArrAtTheEdge || isDotAtTheEdge

	switch {
	case len(*rnc_cedula) < 8 || len(*rnc_cedula) > 11:
		return errors.New("cedula o rnc no es valido")
	case len(*telefono) != 10:
		return errors.New("el telefono no es valido")
	case len(*celular) != 10:
		return errors.New("el celular no es valido")
	case isEmailInvalid:
		return errors.New("el email no es valido")
	}

	return nil
}

func dataUpdateValidation(rnc_cedula, nombre, apellido, email, direccion, telefono, celular *string, cliente *dbconnection.Cliente) {

	if *rnc_cedula == "" {
		*rnc_cedula = cliente.RND_Cedula
	}

	if *nombre == "" {
		*nombre = cliente.Nombre
	}

	if *apellido == "" {
		*apellido = cliente.Apellido
	}

	if *email == "" {
		*email = cliente.Email
	}

	if *direccion == "" {
		*direccion = cliente.Direccion
	}

	if *telefono == "" {
		*telefono = cliente.Telefono
	}

	if *celular == "" {
		*celular = cliente.Celular
	}

	cliente.RND_Cedula = *rnc_cedula
	cliente.Nombre = *nombre
	cliente.Apellido = *apellido
	cliente.Email = *email
	cliente.Direccion = *direccion
	cliente.Telefono = *telefono
	cliente.Celular = *celular
}
