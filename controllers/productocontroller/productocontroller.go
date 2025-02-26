package productocontroller

import (
	"errors"
	"fmt"

	"ggstudios.com/solerfactura/dbconnection"
)

type ProductoDTO struct {
	ID           uint
	TipoProducto uint
	Descripcion  string
	Costo        uint
}

func Create(descripcion string, costo uint, tpr_id uint) error {
	producto := dbconnection.Producto{Descripcion: descripcion, Costo: costo, TPR_id: tpr_id}

	result := dbconnection.Db.Create(&producto)

	if result.Error != nil {
		return result.Error
	}

	fmt.Println("usuario: ", producto.ID)
	fmt.Println("Filas: ", result.RowsAffected)

	return nil
}

func GetAll() ([]ProductoDTO, error) {
	productos := make([]ProductoDTO, 0)

	result := dbconnection.Db.Model(&dbconnection.Producto{}).
		Select("productos.id, productos.descripcion, productos.costo, tipo_productos.descripcion TipoProducto").
		Joins("left join tipo_productos on tipo_productos.id = productos.tpr_id").Scan(&productos)

	if result.Error != nil {
		return productos, result.Error
	}

	fmt.Println("Filas: ", result.RowsAffected)
	for _, v := range productos {
		fmt.Println(v)
	}

	return productos, nil
}

func GetById(id uint) (ProductoDTO, error) {
	producto := new(ProductoDTO)

	result := dbconnection.Db.Model(&dbconnection.Producto{}).
		Select("productos.id, productos.descripcion, productos.costo, tipo_productos.descripcion TipoProducto").
		Joins("left join tipo_productos on tipo_productos.id = productos.tpr_id").
		Where("productos.id = ?", id).Scan(producto)

	if result.Error != nil {
		return *producto, result.Error
	}

	fmt.Println("usuario: ", producto.ID)
	fmt.Println("Filas: ", result.RowsAffected)
	fmt.Println(*producto)

	return *producto, nil
}

func Update(descripcion string, costo, tpr_id, id uint) error {
	producto := new(dbconnection.Producto)

	result := dbconnection.Db.Find(producto, id)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("no se encontro ningun producto")
	}

	if descripcion != "" {
		producto.Descripcion = descripcion
	}

	producto.Costo = costo
	producto.TPR_id = tpr_id

	result = dbconnection.Db.Save(producto)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func Delete(id uint) error {
	producto := new(dbconnection.Producto)

	result := dbconnection.Db.Find(producto, id)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("no se encontro ningun producto")
	}

	result = dbconnection.Db.Delete(producto)

	if result.Error != nil {
		return result.Error
	}

	return nil
}
