package main

import (
	"fmt"
	"sort"
)

func tripleEqual(a int, b int, c int) bool {
	return a == b && b == c && a != 0
}

func tripleEqualWithZero(a int, b int, c int) bool {
	return a == b && b == c
}

func twoEqualToNum(a int, b int, c int, num int) bool {
	if ((a == b) || (a == c)) && a == num {
		return true
	}
	if b == c && c == num {
		return true
	}
	return false
}

func oneFromWin(a int, b int, c int, num int) bool {
	if a == b && a != c && c == 0 && a == num {
		return true
	}
	if a == c && a != b && b == 0 && a == num {
		return true
	}
	if b == c && b != a && a == 0 && b == num {
		return true
	}
	return false
}

// returns the indices in order that would sort an array.
// for example, if the array is [3,2,1] then the returned array will be [1,2,3]
func getSortedIndices(miniBoard [3][3]int) []int {
	flattenedEvalBoard := getFlattenedBoard(&miniBoard)
	var indices []int
	for i := 0; i < len(flattenedEvalBoard); i++ {
		indices = append(indices, i)
	}
	sort.Slice(indices, func(i, j int) bool {
		return flattenedEvalBoard[indices[i]] > flattenedEvalBoard[indices[j]]
	})
	return indices
}

func isMovesLeftRunner(board [9][3][3]int) bool {
	numberOfJobs := len(board)
	jobs := make(chan [3][3]int, numberOfJobs)
	results := make(chan bool, numberOfJobs)

	for workerNum := 0; workerNum < numberOfJobs/2; workerNum++ {
		go isMovesLeftWorker(jobs, results)
	}

	for index := 0; index < numberOfJobs; index++ {
		jobs <- board[index]
	}
	close(jobs)

	for numberOfResults := 0; numberOfResults < numberOfJobs; numberOfResults++ {
		fmt.Println(<-results)
	}

	return false
}

func isMovesLeftWorker(jobs <-chan [3][3]int, results chan<- bool) {
	for currentJob := range jobs {
		results <- isMovesLeft(currentJob)
	}
}

func isMovesLeft(miniBoard [3][3]int) bool {
	for rowIndex := 0; rowIndex < len(miniBoard); rowIndex++ {
		for colIndex := 0; colIndex < len(miniBoard[rowIndex]); colIndex++ {
			if miniBoard[rowIndex][colIndex] == 0 {
				return true
			}
		}
	}
	return false
}

func makeMainBoard(playerMoves []move, computerMoves []move) [9][3][3]int {
	var newBoard [9][3][3]int
	for miniBoardNum := 0; miniBoardNum < 9; miniBoardNum++ {
		for rowIndex := 0; rowIndex < 3; rowIndex++ {
			for colIndex := 0; colIndex < 3; colIndex++ {
				newBoard[miniBoardNum][rowIndex][colIndex] = 0
			}
		}
	}
	for _, player := range playerMoves {
		threeByThreeLoc := convertToThreeByThree(player.Row, player.Col)
		newBoard[threeByThreeLoc[0]][threeByThreeLoc[1]][threeByThreeLoc[2]] = 2
	}
	for _, computer := range computerMoves {
		threeByThreeLoc := convertToThreeByThree(computer.Row, computer.Col)
		newBoard[threeByThreeLoc[0]][threeByThreeLoc[1]][threeByThreeLoc[2]] = 1
	}
	return newBoard
}

func makeFinishedBoard(board [9][3][3]int) [3][3]int {
	var newBoard [3][3]int
	for rowIndex := 0; rowIndex < 3; rowIndex++ {
		for colIndex := 0; colIndex < 3; colIndex++ {
			value := checkSingleBoardWinner(board[colIndex+(rowIndex*3)], 0)
			switch {
			case value > 0:
				newBoard[rowIndex][colIndex] = 1
			case value < 0:
				newBoard[rowIndex][colIndex] = 2
			default:
				newBoard[rowIndex][colIndex] = 0
			}
		}
	}
	return newBoard
}

func makeEvaluationBoard() {
	for boardNum := 0; boardNum < 9; boardNum++ {
		locationOfBoard := getRowColFlattenBoard(boardNum)
		if finishedBoard[locationOfBoard[0]][locationOfBoard[1]] == 0 {
			evaluateBoard(&mainBoard[boardNum], boardNum, &evaluationBoard)
		}
	}
}

func printMainBoard(board *[9][3][3]int) {
	for allRows := 0; allRows < 3; allRows++ {
		for colIndex := 0; colIndex < 3; colIndex++ {
			for miniBoardCol := 0; miniBoardCol < 3; miniBoardCol++ {
				// currentMiniBoard := float64(allRows/3) * 3
				print(board[miniBoardCol+allRows*3][colIndex][0], " ")
				print(board[miniBoardCol+allRows*3][colIndex][1], " ")
				print(board[miniBoardCol+allRows*3][colIndex][2], "  ")
			}
			println()
		}
		println()
	}
}

func printMiniBoard(board *[3][3]int) {
	for rowIndex := 0; rowIndex < 3; rowIndex++ {
		for colIndex := 0; colIndex < 3; colIndex++ {
			print(board[rowIndex][colIndex], " ")
		}
		println()
	}
}

func getRowColFlattenBoard(num int) [2]int {
	newRow := num / 3
	newCol := num - (newRow * 3)

	return [2]int{newRow, newCol}
}

func getValidBoards(currentRow int, currentCol int, finishedBoard [3][3]int) [3][3]bool {
	validBoards := [3][3]bool{{false, false, false}, {false, false, false}, {false, false, false}}
	newRow := currentRow % 3
	newCol := currentCol % 3
	if finishedBoard[newRow][newCol] == 0 {
		validBoards[newRow][newCol] = true
		return validBoards
	}

	for rowIndex := 0; rowIndex < 3; rowIndex++ {
		for colIndex := 0; colIndex < 3; colIndex++ {
			if finishedBoard[rowIndex][colIndex] == 0 {
				validBoards[rowIndex][colIndex] = true
			}
		}
	}
	return validBoards
}

func isNextBoard(currentRow int, currentCol int, isEightByEight bool) int {
	if isEightByEight {
		return isNextBoard(currentRow%3, currentCol%3, false)
	}
	return (currentRow * 3) + currentCol
}

func getNextBoard(row int, col int, maxingPlayer bool) int {
	nextBoardNumber := isNextBoard(row, col, true)
	eval := getRowColFlattenBoard(nextBoardNumber)
	if finishedBoard[eval[0]][eval[1]] != 0 {
		nextBoardNumber = getBestBoardAny(maxingPlayer)
	}
	return nextBoardNumber
}

func getBestBoardAny(maxingPlayer bool) int {
	sortedList := getSortedIndices(evaluationBoard)
	if maxingPlayer {
		for _, index := range sortedList {
			bestLoc := getRowColFlattenBoard(index)
			if finishedBoard[bestLoc[0]][bestLoc[1]] == 0 {
				return index
			}
		}
	} else {
		// reverse sortedList
		for i := len(sortedList) - 1; i >= 0; i-- {
			bestLoc := getRowColFlattenBoard(sortedList[i])
			if finishedBoard[bestLoc[0]][bestLoc[1]] == 0 {
				return sortedList[i]
			}
		}
	}
	return -1
}

func getFlattenedBoard(evaluationBoard *[3][3]int) []int {
	flattenedEvalBoard := make([]int, 0)
	for row := 0; row < 3; row++ {
		for col := 0; col < 3; col++ {
			flattenedEvalBoard = append(flattenedEvalBoard, evaluationBoard[row][col])
		}
	}
	return flattenedEvalBoard
}

func getCurrentBoard(currentRow int, currentCol int) int {
	newRow := (currentRow / 3) * 3
	newCol := currentCol / 3
	return newRow + newCol
}

func convertToEightByEight(currentBoard int, currentRow int, currentCol int) [2]int {
	newRow := ((currentBoard / 3) * 3) + currentRow
	newCol := ((currentBoard % 3) * 3) + currentCol
	return [2]int{newRow, newCol}
}

func convertToThreeByThree(currentRow int, currentCol int) [3]int {
	newBoard := getCurrentBoard(currentRow, currentCol)
	newRow := currentRow % 3
	newCol := currentCol % 3
	return [3]int{newBoard, newRow, newCol}
}

func checkSingleBoardWinner(board [3][3]int, depth int) int {
	results := make(chan int, 3)
	// var wg sync.WaitGroup
	// wg.Add(1)
	go func() {
		for index := 0; index < 3; index++ {
			if tripleEqual(board[index][0], board[index][1], board[index][2]) {
				if board[index][0] == 1 {
					results <- 25 - depth*3
					return
				}
				if board[index][0] == 2 {
					results <- -25 + depth*3
					return
				}
			}
		}
		results <- 0
	}()

	go func() {
		for index := 0; index < 3; index++ {
			if tripleEqual(board[0][index], board[1][index], board[2][index]) {
				if board[0][index] == 1 {
					results <- 25 - depth*3
					return
				}
				if board[0][index] == 2 {
					results <- -25 + depth*3
					return
				}
			}
		}
		results <- 0
	}()

	go func() {
		if tripleEqual(board[0][0], board[1][1], board[2][2]) {
			if board[0][0] == 1 {
				results <- 25 - depth*3
				return
			}
			if board[0][0] == 2 {
				results <- -25 + depth*3
				return
			}
		}
		if tripleEqual(board[0][2], board[1][1], board[2][0]) {
			if board[0][2] == 1 {
				results <- 25 - depth*3
				return
			}
			if board[0][2] == 2 {
				results <- -25 + depth*3
				return
			}
		}

		results <- 0
	}()

	total := 0
	for values := 0; values < 3; values++ {
		total += <-results
	}

	return total
}

func evaluateBoard(board *[3][3]int, boardNum int, choiceEvaluationBoard *[3][3]int) {
	results := make(chan int, 3)
	go func() {
		sum := 0
		for index := 0; index < 3; index++ {
			if oneFromWin(board[index][0], board[index][1], board[index][2], 1) {
				sum += 3
			} else if oneFromWin(board[index][0], board[index][1], board[index][2], 2) {
				sum += -3
			}
		}
		results <- sum
	}()

	go func() {
		sum := 0
		for index := 0; index < 3; index++ {
			if oneFromWin(board[0][index], board[1][index], board[2][index], 1) {
				sum += 3
			} else if oneFromWin(board[0][index], board[1][index], board[2][index], 2) {
				sum -= 3
			}
		}
		results <- sum
	}()

	go func() {
		sum := 0

		if oneFromWin(board[0][0], board[1][1], board[2][2], 1) {
			sum += 3
		} else if oneFromWin(board[0][0], board[1][1], board[2][2], 2) {
			sum += -3
		}
		if oneFromWin(board[0][2], board[1][1], board[2][0], 1) {
			sum += 3
		} else if oneFromWin(board[0][2], board[1][1], board[2][0], 2) {
			sum += -3
		}
		results <- sum
	}()

	total := 0
	for values := 0; values < 3; values++ {
		total += <-results
	}

	eval := getRowColFlattenBoard(boardNum)

	evaluateTiles(boardNum, choiceEvaluationBoard, finishedBoard)

	choiceEvaluationBoard[eval[0]][eval[1]] += total
}

func evaluateTiles(boardNumber int, choiceEvaluationBoard *[3][3]int, miniBoard [3][3]int) {
	results := make(chan int, 3)
	eval := getRowColFlattenBoard(boardNumber)

	go func() {
		sum := 0
		if (eval[0] == 1 && eval[1] == 1) || (eval[0] != 1 || eval[1] != 1) {
			diagonal := make([]int, 3)
			if (eval[0] == 0) && (eval[1] == 0) || (eval[0] == 1 && eval[1] == 1) || (eval[0] == 2 && eval[1] == 2) {
				for index := 0; index < 3; index++ {
					diagonal[index] = miniBoard[index][index]
				}
				if oneFromWin(diagonal[0], diagonal[1], diagonal[2], 1) {
					sum += 10
				} else if oneFromWin(diagonal[0], diagonal[1], diagonal[2], 2) {
					sum += -10
				}
			}

			if (eval[0] == 0) && (eval[1] == 2) || (eval[0] == 1 && eval[1] == 1) || (eval[0] == 2 && eval[1] == 0) {
				counterIndex := 2
				for index := 0; index < 3; index++ {
					diagonal[index] = miniBoard[index][counterIndex]
					counterIndex--
				}
				if oneFromWin(diagonal[0], diagonal[1], diagonal[2], 1) {
					sum += 10
				} else if oneFromWin(diagonal[0], diagonal[1], diagonal[2], 2) {
					sum += -10
				}
			}
		}
		results <- sum
	}()

	go func() {
		sum := 0
		finRow := make([]int, 3)
		for index := 0; index < 3; index++ {
			finRow[index] = miniBoard[index][eval[1]]
		}
		if oneFromWin(finRow[0], finRow[1], finRow[2], 1) {
			sum += 10
		} else if oneFromWin(finRow[0], finRow[1], finRow[2], 2) {
			sum += -10
		}
		results <- sum
	}()

	go func() {
		sum := 0
		finCol := make([]int, 3)
		for index := 0; index < 3; index++ {
			finCol[index] = miniBoard[eval[0]][index]
		}
		if oneFromWin(finCol[0], finCol[1], finCol[2], 1) {
			sum += 10
		} else if oneFromWin(finCol[0], finCol[1], finCol[2], 2) {
			sum += -10
		}
		results <- sum
	}()

	total := 0
	for values := 0; values < 3; values++ {
		total += <-results
	}

	choiceEvaluationBoard[eval[0]][eval[1]] = total
}
