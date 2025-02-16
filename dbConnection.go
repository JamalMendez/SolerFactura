package main

import (
	"gorm.io/driver/sqlserver"
	"gorm.io/gorm"
)

// github.com/denisenkom/go-mssqldb
func Db() *gorm.DB {
	dsn := "Server=.\\SQLEXPRESS;Initial Catalog=SisFac;Integrated Security=True; TrustServerCertificate=True"
	db, err := gorm.Open(sqlserver.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	migration(db)

	return db
}
