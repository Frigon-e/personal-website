package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"net/http"
)

type TicTacHistory struct {
	PlayerMoves   []move       `json:"playerMoves"`
	ComputerMoves []move       `json:"computerMoves"`
	ValidMoves    [3][3]bool   `json:"validMoves"`
	FinishedGame  finishedGame `json:"finishedGame"`
}

type finishedGame struct {
	CompletedBoard [3][3]int `json:"completedBoard"`
	GameOver       bool      `json:"gameOver"`
	Winner         int       `json:"winner"`
}

type move struct {
	Row int `json:"Row"`
	Col int `json:"Col"`
}

func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()
	modCors := cors.DefaultConfig()

	modCors.AllowAllOrigins = true

	router.Use(cors.New(modCors))
	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile("./build", true)))

	// Setup route group for the API
	api := router.Group("/api")
	{
		// takes in a json object from a POST request made to /move/
		// maps the json object to a TIcTacHistory struct
		// returns with a json object containing the player and computer moves

		api.POST("/move/", func(c *gin.Context) {
			requestBody := new(TicTacHistory)

			if err := c.BindJSON(&requestBody); err != nil {
				println(err)
			}

			requestBody.ComputerMoves = findMove(requestBody.PlayerMoves, requestBody.ComputerMoves)
			requestBody.FinishedGame = getFinishedBoard(requestBody.PlayerMoves, requestBody.ComputerMoves)
			lastComputerMove := requestBody.ComputerMoves[len(requestBody.ComputerMoves)-1]
			requestBody.ValidMoves = getValidBoards(lastComputerMove.Row, lastComputerMove.Col, requestBody.FinishedGame.CompletedBoard)

			c.JSON(http.StatusOK, requestBody)
		})

	}

	// Start and run the server
	if err := router.Run(":5000"); err != nil {
		return
	}
}
