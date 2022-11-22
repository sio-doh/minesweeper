// Logic

export const TILE_STATUSES = {
    HIDDEN: "hidden",  
    MINE: "mine", 
    NUMBER: "number", 
    MARKED: "marked", 
}

export function createBoard(boardSize, numberOfMines) {
    const board = [] 
    const minePositions = getMinePositions(boardSize, numberOfMines)

    for (let x = 0; x < boardSize; x++) {  
        const row = []
        for (let y = 0; y < boardSize; y++) {
            const element = document.createElement("div")
            element.dataset.status = TILE_STATUSES.HIDDEN

            const tile = { 
                element, 
                x, 
                y, 
                // check to see if positions are mine, if one matches our x,y coordinates 
                // return true otherwise return false
                mine: minePositions.some(positionMatch.bind(null, { x, y })), 
                get status() {
                    return this.element.dataset.status
                }, 
                set status(value) {
                    this.element.dataset.status = value 
                },
            }

            row.push(tile)
        }
        board.push(row)
    } 
    return board
}

export function markTile(tile) { 
    if ( // if hidden or marked continue on 
        tile.status !== TILE_STATUSES.HIDDEN && 
        tile.status !== TILE_STATUSES.MARKED
    ) { // else return prematurely
        return
    }

    if (tile.status === TILE_STATUSES.MARKED) {
        tile.status = TILE_STATUSES.HIDDEN
    } else {
        tile.status = TILE_STATUSES.MARKED
    }
}

export function revealTile(board, tile) {
    if (tile.status !== TILE_STATUSES.HIDDEN) {
        return 
    } 

    if (tile.mine) {
        tile.status = TILE_STATUSES.MINE 
        return
    } 

    tile.status = TILE_STATUSES.NUMBER 
    const adjacentTiles = nearbyTiles(board, tile) 
    // any tile that returns true is a mine 
    const mines = adjacentTiles.filter(t => t.mine) 
    if (mines.length === 0) { // when there is no mines 
        // pop-in each individual adjacent tile as third parameter
        adjacentTiles.forEach(revealTile.bind(null, board))
    } else { // when there are mines
        tile.element.textContent = mines.length
    }
}

function getMinePositions(boardSize, numberOfMines) {
    const positions = []
    
    while (positions.length < numberOfMines) {
        const position = {
            x: randomNumber(boardSize), 
            y: randomNumber(boardSize)
        } 

        if (!positions.some(p => positionMatch(p, positionMatch))) {
            positions.push(position)
        }
    }

    return positions
}

function positionMatch(a, b) {
    return a.x === b.x && a.y === b.y 
}

function randomNumber(size) {
    return Math.floor(Math.random() * size)
} 

function nearbyTiles() {
    const tiles = [] 

    for (let xOffset = -1; xOffset <= 1; xOffset++) {
        for (let yOffset = -1; yOffset <= 1; yOffset++) {
            // if we have element in x row, then get it in y direction
            const tile = board[x + xOffset]?.[y + yOffset] 
            if (tile) tiles.push(tile) // add tile to list
        }
    }
    return tiles 
}