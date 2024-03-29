package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"server/golang/battleship"
	tictactoe "server/golang/tictactoe"
)

type Certifications struct {
	Name                 string `json:"Name"`
	NlPool               string `json:"National Lifeguard - Pool"`
	NlWaterpark          string `json:"National Lifeguard - Waterpark"`
	CprC                 string `json:"CPR-C"`
	SFA                  string `json:"Standard First Aid"`
	AED                  string `json:"AED"`
	LifesavingInstructor string `json:"Lifesaving Instructor"`
}
type TicTacHistory struct {
	PlayerMoves   []tictactoe.Move       `json:"playerMoves"`
	ComputerMoves []tictactoe.Move       `json:"computerMoves"`
	ValidMoves    [3][3]bool             `json:"validMoves"`
	FinishedGame  tictactoe.FinishedGame `json:"finishedGame"`
}

type BattleshipHistory struct {
	PlayerMoves   []battleship.Move `json:"playerMoves"`
	ComputerMoves []battleship.Move `json:"computerMoves"`
}

func main() {
	// Set the router as the default one shipped with Gin
	gin.SetMode(gin.DebugMode)

	router := gin.Default()
	modCors := cors.DefaultConfig()

	modCors.AllowAllOrigins = true

	router.Use(cors.New(modCors))

	// Setup route group for the API
	api := router.Group("/api")
	{
		// takes in a json object from a POST request made to /move/
		// maps the json object to a TIcTacHistory struct
		// returns with a json object containing the player and computer moves

		api.POST("/ttt/move/", func(c *gin.Context) {
			requestBody := new(TicTacHistory)

			if err := c.BindJSON(&requestBody); err != nil {
				println(err)
			}

			requestBody.ComputerMoves = tictactoe.FindMove(requestBody.PlayerMoves, requestBody.ComputerMoves)
			requestBody.FinishedGame = tictactoe.GetFinishedBoard(requestBody.PlayerMoves, requestBody.ComputerMoves)
			lastComputerMove := requestBody.ComputerMoves[len(requestBody.ComputerMoves)-1]
			requestBody.ValidMoves = tictactoe.GetValidBoards(lastComputerMove.Row, lastComputerMove.Col, requestBody.FinishedGame.CompletedBoard)

			c.JSON(http.StatusOK, requestBody)
		})

		api.POST("/bs/move/", func(c *gin.Context) {
			requestBody := new(BattleshipHistory)

			if err := c.BindJSON(&requestBody); err != nil {
				println(err)
			}

			battleship.FindMove(requestBody.PlayerMoves, requestBody.ComputerMoves)

			c.AbortWithStatus(http.StatusOK)
		})

		api.POST("/certification/", func(c *gin.Context) {
			//cmd := exec.Command("C://Users//ebfri//Dropbox//coding//personal-website//venv//Scripts//python.exe", "C://Users//ebfri//Dropbox//coding//personal-website//src//server//certificationChecker.py")
			//out, err := cmd.Output()

			//if err != nil {
			//	log.Println(err.Error())
			//	return
			//}

			jsonString :=
				`[{"Name":"Ethan Frigon","National Lifeguard - Pool":"16-Jun-2022","National Lifeguard - Waterpark":"26-May-2021","CPR-C":"02-Jun-2022","Standard First Aid":"02-Oct-2022","AED":"02-Jun-2022","Lifesaving Instructor":null},{"Name":"Griffin Bennett","National Lifeguard - Pool":null,"National Lifeguard - Waterpark":null,"CPR-C":"24-Jul-2021","Standard First Aid":"18-Oct-2020","AED":"18-Oct-2020","Lifesaving Instructor":null},{"Name":"Nathan Christophe","National Lifeguard - Pool":null,"National Lifeguard - Waterpark":"24-Oct-2021","CPR-C":"23-Jul-2021","Standard First Aid":"02-Dec-2021","AED":"02-Dec-2021","Lifesaving Instructor":null}]`

			//log.Println(string(out))
			var jsonData []Certifications
			errTwo := json.Unmarshal([]byte(jsonString), &jsonData)

			if errTwo != nil {
				log.Println(errTwo.Error())
				return
			}
			fmt.Println("JSON data: ", jsonData)
			c.JSON(http.StatusOK, jsonData)
		})
	}
	// Start and run the server
	if err := router.Run(":5000"); err != nil {
		return
	}
}
