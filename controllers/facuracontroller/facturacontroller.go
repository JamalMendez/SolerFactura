package facuracontrollerpackage

import (
	"errors"
	"fmt"

	"ggstudios.com/solerfactura/dbconnection"
)

type FacturaDTO struct {
	ID              uint
	NCFSerie        string
	NCFTipo         string
	NCFSecuencia    string
	NombreCliente   string
	ApellidoCliente string
	TipoPago        string
	Nombre          string
	CostoSubtotal   uint
	CostoTotal      uint
	Descuento       uint
	ITBIS           uint
	Envio           uint
	Descripcion     string
	Productos       []dbconnection.Producto
}

func Create(ncf_id, cli_id, tpo_id, costoSubtotal, costoTotal, descuento, itbis, envio uint, nombre, descripcion string) error {
	factura := dbconnection.Factura{
		NCF_id:        ncf_id,
		CLI_id:        cli_id,
		TPO_id:        tpo_id,
		Nombre:        nombre,
		CostoSubtotal: costoSubtotal,
		CostoTotal:    costoTotal,
		Descuento:     descuento,
		ITBIS:         itbis,
		Envio:         envio,
		Descripcion:   descripcion,
	}

	result := dbconnection.Db.Create(&factura)

	if result.Error != nil {
		return result.Error
	}

	fmt.Println("usuario: ", factura.ID)
	fmt.Println("Filas: ", result.RowsAffected)

	return nil
}

func GetAll() ([]FacturaDTO, error) {
	facturas := make([]FacturaDTO, 0)

	result := dbconnection.Db.Model(&dbconnection.Factura{}).
		Select("facturas.id, " +
			"facturas.nombre, " +
			"facturas.costo_subtotal, " +
			"facturas.costo_total, " +
			"facturas.descuento, " +
			"facturas.itbis, " +
			"facturas.envio, " +
			"facturas.descripcion," +
			"clientes.Nombre NombreCliente," +
			"clientes.Apellido ApellidoCliente," +
			"ncfs.serie NCFSerie," +
			"ncfs.tipo NCFTipo," +
			"ncfs.secuencia NCFSecuencia," +
			"tipo_pagos.descripcion TipoPago").
		Joins("left join clientes on clientes.id = facturas.cli_id").
		Joins("left join ncfs on ncfs.id = facturas.ncf_id").
		Joins("left join tipo_pagos on tipo_pagos.id = facturas.tpo_id").
		Scan(&facturas)

	if result.Error != nil {
		return facturas, result.Error
	}

	fmt.Println("Filas: ", result.RowsAffected)

	fmt.Println("Filas: ", result.RowsAffected)
	for _, v := range facturas {
		fmt.Println(v)
	}

	return facturas, nil
}

func GetById(id uint) (FacturaDTO, error) {
	factura := new(FacturaDTO)

	result := dbconnection.Db.Model(&dbconnection.Factura{}).
		Select("facturas.id, "+
			"facturas.nombre, "+
			"facturas.costo_subtotal, "+
			"facturas.costo_total, "+
			"facturas.descuento, "+
			"facturas.itbis, "+
			"facturas.envio, "+
			"facturas.descripcion,"+
			"clientes.Nombre nombreCliente,"+
			"clientes.Apellido apellidoCliente,"+
			"ncfs.serie NCFSerie,"+
			"ncfs.tipo NCFTipo,"+
			"ncfs.secuencia NCFSecuencia,"+
			"tipo_pagos.descripcion TipoPago").
		Joins("left join clientes on clientes.id = facturas.cli_id").
		Joins("left join ncfs on ncfs.id = facturas.ncf_id").
		Joins("left join tipo_pagos on tipo_pagos.id = facturas.tpo_id").
		Where("facturas.id = ?", id).Scan(factura)

	if result.Error != nil {
		return *factura, result.Error
	}

	fmt.Println("usuario: ", factura.ID)
	fmt.Println("Filas: ", result.RowsAffected)
	fmt.Println(*factura)

	return *factura, nil
}

func Update(ncf_id, cli_id, tpo_id, costoSubtotal, costoTotal, descuento, itbis, envio, id uint, nombre, descripcion string) error {
	factura := new(dbconnection.Factura)

	result := dbconnection.Db.Find(factura, id)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("no se encontro ningun factura")
	}

	if descripcion != "" {
		factura.Descripcion = descripcion
	}
	if nombre != "" {
		factura.Nombre = nombre
	}

	factura.NCF_id = ncf_id
	factura.CLI_id = cli_id
	factura.TPO_id = tpo_id
	factura.CostoSubtotal = costoSubtotal
	factura.CostoTotal = costoTotal
	factura.Descripcion = descripcion
	factura.Envio = envio
	factura.Descuento = descuento
	factura.ITBIS = itbis

	result = dbconnection.Db.Save(factura)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func Delete(id uint) error {
	factura := new(dbconnection.Factura)

	result := dbconnection.Db.Find(factura, id)

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("no se encontro ningun factura")
	}

	result = dbconnection.Db.Delete(factura)

	if result.Error != nil {
		return result.Error
	}

	return nil
}
