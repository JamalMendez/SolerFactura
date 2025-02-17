package main

import (
	// "embed"

	// "github.com/wailsapp/wails/v2"
	// "github.com/wailsapp/wails/v2/pkg/options"
	// "github.com/wailsapp/wails/v2/pkg/options/assetserver"

	"fmt"

	"ggstudios.com/solerfactura/controllers/tipoproductocontroller"
	"ggstudios.com/solerfactura/dbconnection"
)

// //go:embed all:frontend/dist
// var assets embed.FS

func main() {
	// // Create an instance of the app structure
	// app := NewApp()

	dbconnection.DbOpen()

	tipoproductocontroller.Create("prueba1")
	tipoproductocontroller.Create("prueba2")
	tipoproductocontroller.Create("prueba3")
	tipoproductocontroller.Update("otro", 2)
	tipoproductocontroller.Delete(2)
	prueba, _ := tipoproductocontroller.GetAll()
	for i := 0; i < len(prueba); i++ {
		fmt.Println(prueba[i])
	}
	prueba, _ = tipoproductocontroller.GetActiveAll()
	for i := 0; i < len(prueba); i++ {
		fmt.Println(prueba[i])
	}
	fmt.Println(tipoproductocontroller.GetById(2))
	fmt.Println(tipoproductocontroller.GetActiveById(2))

	// //Create application with options
	// err := wails.Run(&options.App{
	// 	Title:  "Soler Fatura",
	// 	Width:  1024,
	// 	Height: 768,
	// 	AssetServer: &assetserver.Options{
	// 		Assets: assets,
	// 	},
	// 	BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
	// 	OnStartup:        app.startup,
	// 	Bind: []interface{}{
	// 		app,
	// 	},
	// })

	// if err != nil {
	// 	println("Error:", err.Error())
	// }

	dbconnection.CloseDb()
}
