package dbconnection

import (
	"fmt"
	"log"

	"gorm.io/driver/sqlserver"
	"gorm.io/gorm"
)

var Db *gorm.DB

func DbOpen() {
	dsn := "sqlserver://sa:S4v30n3Story.@localhost:1433?database=SisFac"

	var err error
	Db, err = gorm.Open(sqlserver.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	migration(Db)
}

func CloseDb() {
	sqlDB, err := Db.DB()
	if err != nil {
		log.Fatalf("failed to get database object: %v", err)
	}
	err = sqlDB.Close()
	if err != nil {
		log.Fatalf("failed to close database: %v", err)
	}
	fmt.Println("Database connection closed")
}
