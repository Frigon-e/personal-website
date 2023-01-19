package main

import (
	"fmt"
	"math"
	"math/rand"
)

var (
	mainBoard       [9][3][3]int
	finishedBoard   [3][3]int
	evaluationBoard [3][3]int
)

func findMove(playerMoves []move, computerMoves []move) []move {
	mainBoard = makeMainBoard(playerMoves, computerMoves)
	finishedBoard = makeFinishedBoard(mainBoard)
	makeEvaluationBoard()
	bestSpot := bestMove(getNextBoard(playerMoves[len(playerMoves)-1].Row, playerMoves[len(playerMoves)-1].Col, true), &mainBoard)
	computerMoves = append(computerMoves, move{Row: bestSpot[0], Col: bestSpot[1]})
	return computerMoves
}

func getFinishedBoard(playerMoves []move, computerMoves []move) finishedGame {
	mainBoard = makeMainBoard(playerMoves, computerMoves)
	finishedBoard = makeFinishedBoard(mainBoard)

	gameOver := false
	winner := 0

	value := checkSingleBoardWinner(finishedBoard, 0)
	switch {
	case value > 0:
		gameOver = true
		winner = 1
	case value < 0:
		gameOver = true
		winner = 2
	default:
		winner = 0
	}

	return finishedGame{CompletedBoard: finishedBoard, GameOver: gameOver, Winner: winner}
}

// bestMove calculates the best move for the current player on the specified board in a game of Tic Tac Toe.
// It returns the best move as a pair of [row, column] coordinates.
func bestMove(boardNum int, fullBoard *[9][3][3]int) [2]int {
	// Initialize the best score to the default minimum value.
	bestScore := []int{int(math.Inf(-1)), int(math.Inf(-1)), int(math.Inf(-1))}
	//scorePoints := [3][3]int{{0, 0, 0}, {0, 0, 0}, {0, 0, 0}}
	for row := 0; row < 3; row++ {
		for col := 0; col < 3; col++ {
			score := 0
			if fullBoard[boardNum][row][col] != 0 {
				continue
			}

			// Checks to make sure that the move is a instant win or not
			startingScore := 0
			isInstantWin := false
			for playerNum := 1; playerNum <= 2; playerNum++ {
				fullBoard[boardNum][row][col] = playerNum
				if startingScore = checkSingleBoardWinner(fullBoard[boardNum], 0); startingScore != 0 {
					isInstantWin = true
					break
				}
			}
			if isInstantWin {
				bestScore[0] = score
				bestScore[1] = row
				bestScore[2] = col
				fullBoard[boardNum][row][col] = 0
				newLoc := convertToEightByEight(boardNum, row, col)
				return newLoc
			}

			// Make the current move on the board.
			fullBoard[boardNum][row][col] = 1

			// Calculate the starting score for the current board after making the move.
			startingScore = checkSingleBoardWinner(fullBoard[boardNum], 0) + evaluateTiles(row, col, fullBoard[boardNum])

			//println()
			fmt.Printf("Row: %d, Col: %d, Starting Score: %d\n", row, col, startingScore)
			//println()

			score = miniMax(fullBoard[getNextBoard(row, col, false)], 0, false, startingScore, -1000, 1000)
			//scorePoints[row][col] = score

			// Undo the current move on the board.
			fullBoard[boardNum][row][col] = 0

			// Calculate the score for the current move by calling the miniMax function.

			//fmt.Printf("Row: %d, Col: %d, After Score: %d", row, col, score)
			if score == bestScore[0] {
				if rand.Intn(2) == 0 {
					newLoc := convertToEightByEight(boardNum, row, col)
					bestScore[0] = score
					bestScore[1] = newLoc[0]
					bestScore[2] = newLoc[1]
				}
			}

			if score > bestScore[0] {
				bestScore[0] = score
				newLoc := convertToEightByEight(boardNum, row, col)
				bestScore[1] = newLoc[0]
				bestScore[2] = newLoc[1]

			}
		}
	}

	return [2]int{bestScore[1], bestScore[2]}
}

func miniMax(board [3][3]int, depth int, isMaxPlayer bool, currentSum int, alpha int, beta int) int {
	// time.Sleep(100 * time.Millisecond)

	// Check if the current game board is in a terminal state (i.e. a player has won or there are no more moves)
	// and return the current sum of scores if it is.
	currentSum += checkSingleBoardWinner(board, depth)
	if depth >= 5 || !isMovesLeft(board) {
		return currentSum
	}

	// Initialize the best score to a very high or very low value, depending on whether the current player is
	// the maximizer or minimizer.

	var bestScore int
	if isMaxPlayer {
		bestScore = math.MinInt32
	} else {
		bestScore = math.MaxInt32
	}

	for row := 0; row < 3; row++ {
		for col := 0; col < 3; col++ {
			if board[row][col] != 0 {
				continue
			}

			// Make the move and call the miniMax function recursively to evaluate the potential outcome.
			if board[row][col] = 2; isMaxPlayer {
				board[row][col] = 1
			}
			score := miniMax(mainBoard[getNextBoard(row, col, !isMaxPlayer)], depth+1, !isMaxPlayer, currentSum, alpha, beta) + evaluateTiles(row, col, board)

			// Undo the move.
			board[row][col] = 0

			// Update the best score and the alpha and beta values for alpha-beta pruning.
			if isMaxPlayer {
				bestScore = int(math.Max(float64(bestScore), float64(score)))
				alpha = int(math.Max(float64(alpha), float64(bestScore)))
				// If the alpha value is greater than or equal to the beta value, there is no need to search
				// any further along this branch of the search tree, so we can break out of the loop early.
				if alpha <= beta {
					break
				}
			} else {
				bestScore = int(math.Min(float64(bestScore), float64(score)))
				beta = int(math.Min(float64(beta), float64(bestScore)))
				// If the beta value is less than or equal to the alpha value, there is no need to search
				// any further along this branch of the search tree, so we can break out of the loop early.
				if beta <= alpha {
					break
				}
			}
		}
	}
	return bestScore
}

// func main() {
//	test()
// }

// func test() {
//	playerMoves := []move{{Row: 1, Col: 1}, {Row: 2, Col: 2}, {Row: 0, Col: 0}, {Row: 2, Col: 0}, {Row: 6, Col: 6}, {Row: 4, Col: 1}, {Row: 4, Col: 4}, {Row: 5, Col: 5}, {Row: 3, Col: 3}}
//	computerMoves := []move{{Row: 3, Col: 2}, {Row: 5, Col: 1}, {Row: 7, Col: 7}, {Row: 6, Col: 4}, {Row: 5, Col: 2}}
//	mainBoard = makeMainBoard(playerMoves, computerMoves)
//	finishedBoard = makeFinishedBoard(mainBoard)
//	makeEvaluationBoard()
//	println()
//	printMiniBoard(&evaluationBoard)
//	println()
//	println()
//	fmt.Printf("sorted: %v", getSortedIndices(evaluationBoard))
//	println()
//	println()
//
//	println()
//	println()
//
//	printMainBoard(&mainBoard)
//	printMiniBoard(&finishedBoard)
//	println()
//	println()
//	print("Timer started")
//	start := time.Now()
//	bestSpot := bestMove(getNextBoard(playerMoves[len(playerMoves)-1].Row, playerMoves[len(playerMoves)-1].Col, true), &mainBoard)
//	fmt.Printf("best spot: %v", bestSpot)
//	computerMoves = append(computerMoves, move{Row: bestSpot[0], Col: bestSpot[1]})
//	println()
//	t := time.Now()
//	elapsed := t.Sub(start).Milliseconds()
//	fmt.Printf("Finnished in : %d Miliseconds", elapsed)
//	println()
//}
