package battleship

import "server/golang/tictactoe"

type Move struct {
	Row int  `json:"Row"`
	Col int  `json:"Col"`
	Hit bool `json:"Hit"`
}

type TicTacHistory struct {
	PlayerMoves   []tictactoe.Move `json:"playerMoves"`
	ComputerMoves []tictactoe.Move `json:"computerMoves"`
}

var (
	computerBoard [10][10]int
	playerBoard   [10][10]int
)

func FindMove(computerMoves []Move, playerMoves []Move) {
	computerBoard := CreateBoard(computerMoves)
	PrintBoard(&computerBoard)
}
