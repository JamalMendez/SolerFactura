package dbconnection

import (
	"gorm.io/gorm"
)

type TipoPago struct {
	gorm.Model
	Descripcion string    `gorm:"unique;not null;size:100"`
	Facturas    []Factura `gorm:"foreignKey:TPO_id"`
	COTs        []COT     `gorm:"foreignKey:TPO_id"`
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
	Ciudad     string    `gorm:"size:200"`
	Telefono   string    `gorm:"unique;size:10"`
	Celular    string    `gorm:"unique;size:10"`
	Facturas   []Factura `gorm:"foreignKey:CLI_id"`
	COTs       []COT     `gorm:"foreignKey:CLI_id"`
}

type Producto struct {
	gorm.Model
	TPR_id         uint   `gorm:"not null"`
	Descripcion    string `gorm:"unique;not null;size:150"`
	Costo          uint   `gorm:"not null"`
	CostoEnDolares uint   `gorm:"not null"`
}

type Factura struct {
	gorm.Model
	NCF_id        uint   `gorm:"not null"`
	CLI_id        uint   `gorm:"not null"`
	TPO_id        uint   `gorm:"not null"`
	Nombre        string `gorm:"unique;size:150"`
	CostoSubtotal uint   `gorm:"not null"`
	CostoTotal    uint   `gorm:"not null"`
	Descuento     uint
	Envio         uint
	Descripcion   string     `gorm:"type:text"`
	EnDolares     bool       `gorm:"not null;default:false"`
	Productos     []Producto `gorm:"many2many:factura_descs;"`
}

type FacturaDesc struct {
	CostoUnitario uint `gorm:"not null"`
	Cantidad      uint `gorm:"not null;default:1"`
	TotalUnitario uint `gorm:"not null"`
	ITBIS         bool `gorm:"not null";default:true`
}

type COT struct {
	gorm.Model
	Secuencia     uint   `gorm:"not null;unique"`
	CLI_id        uint   `gorm:"not null"`
	TPO_id        uint   `gorm:"not null"`
	Nombre        string `gorm:"unique;size:150"`
	CostoSubtotal uint   `gorm:"not null"`
	CostoTotal    uint   `gorm:"not null"`
	Descuento     uint
	Envio         uint
	Descripcion   string     `gorm:"type:text"`
	EnDolares     bool       `gorm:"not null;default:false"`
	Productos     []Producto `gorm:"many2many:cot_descs;"`
}

type COTDesc struct {
	CostoUnitario uint `gorm:"not null"`
	Cantidad      uint `gorm:"not null;default:1"`
	TotalUnitario uint `gorm:"not null"`
	ITBIS         bool `gorm:"not null";default:true`
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

	if err := db.AutoMigrate(&COT{}); err != nil {
		panic("failed to migrate database: " + err.Error())
	}

	if err := db.AutoMigrate(&COTDesc{}); err != nil {
		panic("failed to migrate database: " + err.Error())
	}
}
