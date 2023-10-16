package battleship

func CreateBoard(moves []Move) [10][10]int {
	board := [10][10]int{}
	for _, move := range moves {
		boardVal := -1
		if move.Hit {
			boardVal = 1
		}
		board[move.Row][move.Col] = boardVal
	}
	return board
}

func PrintBoard(board *[10][10]int) {
	for rowIndex := 0; rowIndex < 10; rowIndex++ {
		for colIndex := 0; colIndex < 10; colIndex++ {
			print(board[rowIndex][colIndex], " ")
		}
		println()
	}
}
