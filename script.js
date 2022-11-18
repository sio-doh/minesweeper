// User-Interface 
import { createBoard } from "./minesweeper"; 

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 2

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector(".board") 
console.log(board)
board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
    })
})
boardElement.style.setProperty("--size", BOARD_SIZE)
// 1. Populate a board with tiles and mines 
// 2. Left-click on tiles to reveal tiles 
// 3. Right-click on tiles to mark tiles 
// 4. Check for a win / lose 