package clientecontroller

import (
	"fmt"

	"ggstudios.com/solerfactura/dbconnection"
)

func Create(rnc_cedula, nombre, apellido, email, direccion, telefono, celular string) error {
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

func GetActiveAll() ([]dbconnection.Cliente, error) {
	clientes := make([]dbconnection.Cliente, 0)

	result := dbconnection.Db.Where("activo = ?", "1").Find(&clientes)

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

func GetActiveById(id uint) (dbconnection.Cliente, error) {
	cliente := new(dbconnection.Cliente)

	result := dbconnection.Db.Where("activo = ?", "1").Find(cliente, id)

	if result.Error != nil {
		return *cliente, result.Error
	}

	fmt.Println("usuario: ", cliente.ID)
	fmt.Println("Filas: ", result.RowsAffected)

	return *cliente, nil
}

func Update(rnc_cedula, nombre, apellido, email, direccion, telefono, celular string, id uint) (dbconnection.Cliente, error) {
	cliente := new(dbconnection.Cliente)

	result := dbconnection.Db.Where("activo = ?", "1").Find(cliente, id)

	if result.Error != nil {
		return *cliente, result.Error
	}

	cliente.RND_Cedula = rnc_cedula
	cliente.Nombre = nombre
	cliente.Apellido = apellido
	cliente.Email = email
	cliente.Direccion = direccion
	cliente.Telefono = telefono
	cliente.Celular = celular
	dbconnection.Db.Save(cliente)

	return *cliente, nil
}

func Delete(id uint) (dbconnection.Cliente, error) {
	cliente := new(dbconnection.Cliente)

	result := dbconnection.Db.Where("activo = ?", "1").Find(cliente, id)

	if result.Error != nil {
		return *cliente, result.Error
	}

	cliente.Activo = false
	dbconnection.Db.Save(cliente)

	return *cliente, nil
}
