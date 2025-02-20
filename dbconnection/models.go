package dbconnection

import (
	"gorm.io/gorm"
)

type TipoPago struct {
	gorm.Model
	Descripcion string    `gorm:"unique;not null;size:100"`
	Facturas    []Factura `gorm:"foreignKey:TPO_id"`
}

type TipoProducto struct {
	gorm.Model
	Descripcion string     `gorm:"unique;not null;size:100"`
	Productos   []Producto `gorm:"foreignKey:TPR_id"`
}

type NCF struct {
	gorm.Model
	Tipo      string    `gorm:"not null;size:2"`
	Secuencia string    `gorm:"unique;not null;size:8"`
	Serie     string    `gorm:"type:CHAR(1) NOT NULL"`
	Facturas  []Factura `gorm:"foreignKey:NCF_id"`
}

type Cliente struct {
	gorm.Model
	RND_Cedula string    `gorm:"unique;not null;size:11"`
	Nombre     string    `gorm:"not null;size:100"`
	Apellido   string    `gorm:"not null;size:100"`
	Email      string    `gorm:"unique;size:150"`
	Direccion  string    `gorm:"size:200"`
	Telefono   string    `gorm:"unique;size:10"`
	Celular    string    `gorm:"unique;size:10"`
	Facturas   []Factura `gorm:"foreignKey:CLI_id"`
}

type Producto struct {
	gorm.Model
	TPR_id uint    `gorm:"not null"`
	Costo  float32 `gorm:"not null"`
}

type Factura struct {
	gorm.Model
	NCF_id        uint    `gorm:"not null"`
	CLI_id        uint    `gorm:"not null"`
	TPO_id        uint    `gorm:"not null"`
	CostoSubtotal float32 `gorm:"not null"`
	CostoTotal    float32 `gorm:"not null"`
	Descuento     float32
	ITBIS         float32 `gorm:"not null"`
	Envio         float32
	Descripcion   string     `gorm:"type:text"`
	Productos     []Producto `gorm:"many2many:factura_descs"`
}

type FacturaDesc struct {
	FacId         uint    `gorm:"primaryKey"`
	ProId         uint    `gorm:"primaryKey"`
	CostoUnitario float32 `gorm:"not null"`
	Cantidad      uint    `gorm:"not null;default:1"`
	TotalUnitario float32 `gorm:"not null"`
}

func migration(db *gorm.DB) {
	if err := db.AutoMigrate(&TipoPago{}); err != nil {
		panic("failed to migrate database: " + err.Error())
	}

	if err := db.AutoMigrate(&TipoProducto{}); err != nil {
		panic("failed to migrate database: " + err.Error())
	}

	if err := db.AutoMigrate(&NCF{}); err != nil {
		panic("failed to migrate database: " + err.Error())
	}

	if err := db.AutoMigrate(&Cliente{}); err != nil {
		panic("failed to migrate database: " + err.Error())
	}

	if err := db.AutoMigrate(&Producto{}); err != nil {
		panic("failed to migrate database: " + err.Error())
	}

	if err := db.AutoMigrate(&Factura{}); err != nil {
		panic("failed to migrate database: " + err.Error())
	}

	if err := db.AutoMigrate(&FacturaDesc{}); err != nil {
		panic("failed to migrate database: " + err.Error())
	}
}
