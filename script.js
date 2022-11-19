// User-Interface 
import { TILE_STATUS, createBoard, markTile } from "./minesweeper"; 

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector(".board") 
const minesLeftText = document.querySelector("[mine-count]")

console.log(board)

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element) 
        tile.element.addEventListener("click", () => { }) 
        tile.element.addEventListener("contextmenu", e => {
            e.preventDefault() 
            markTile(tile) 
            listMinesLeft()
        })
    })
})
boardElement.style.setProperty("--size", BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES

function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUS.MARKED)
    }, 0)
}
// 2. Left-click on tiles to reveal tiles 
// 3. Right-click on tiles to mark tiles 
// 4. Check for a win / lose 