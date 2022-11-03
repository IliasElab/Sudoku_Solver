function isWrong(board){
    let rows = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()]
    let cols = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()]
    let squares = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()]
    
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            let number = board[i][j];
            if (number !== 0){
                if (rows[i].has(number) || cols[j].has(number) || squares[~~(i / 3) * 3 + ~~(j / 3)].has(number)){
                    return [i, j];
                }        
                rows[i].add(number);
                cols[j].add(number);
                squares[~~(i / 3) * 3 + ~~(j / 3)].add(number);
            }
        }
    }
    return false;
}

function isSafe(board, row, col, num){
    if(board[row].includes(num)){
        return false;
    }

    for(let r = 0; r < 9; r++){
        if (board[r][col] === num){
            return false;
        }
    }

    let startRow = row - row % 3;
    let startCol = col - col % 3;

    for(let r = startRow; r < startRow + 3; r++){
        for(let c = startCol; c < startCol + 3; c++){
            if (board[r][c] === num){
                return false;
            }
        }
    }
    return true;
}

function nextSlot(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] === 0){
                return [i, j, false];
            }
        }
    }
    return [-1, -1, true];
}

function solving(board, starting) {
    let emptySpot = nextSlot(board);
    let [row, col, isComplete] = emptySpot;
    //nbSpot = [row, col];

    if (starting) {
        if (solving(board, false)){return board;}
        else{return false;}
    }

    if (isComplete){return true;}

    for(let num = 1; num <= 9; num++){
        if (isSafe(board, row, col, num)){
            board[row][col] = num;

            if (solving(board)){return true;}
            else{board[row][col] = 0;}
        }
    }
    return false;
}

export {isSafe, isWrong, solving, nextSlot};