// User-Interface 
import { createBoard } from "./minesweeper"; 

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector(".board") 
const minesLeftText = document.querySelector("[mine-count]")

console.log(board)
board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
    })
})
boardElement.style.setProperty("--size", BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES
// 2. Left-click on tiles to reveal tiles 
// 3. Right-click on tiles to mark tiles 
// 4. Check for a win / lose 