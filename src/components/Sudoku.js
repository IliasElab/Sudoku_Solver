import React, { useState, useEffect } from 'react';


const Sudoku = () => {
    const [data, setData] = useState([]);
    const [solution, setSolution] = useState([])
    const [firstRender, setfirstRender] = useState(true)
    const nb_of_input = 81;

    //When the page is rendered for the first time, change firstRender value
    useEffect(() => {
        setfirstRender(false);
    }, []) 

    useEffect(() => {
        //Avoid the useEffect to load if it is the first Render of the component
        
        if (!firstRender && data.length !== 0){
            function solving(board) {
                let emptySpot = nextSlot(board);
                let [row, col, isComplete] = emptySpot;
            
                if (isComplete){
                    setSolution(board)
                    return true;
                }
            
                for(let num = 1; num <= 9; num++){
                    if (isSafe(board, row, col, num)){
                        board[row][col] = num;
            
                        if (solving(board)){
                            return true;
                        }
                        else{
                            board[row][col] = 0;
                        }
                    }
                }
                return false;
            }
            if (isValid(data)){
                solving(data);
            }
            else {
                console.log("Not a Valid Sudoku");
            }
        } 
    }, [data])
    
    useEffect(() => {
        if (!firstRender && solution.length !== 0){
            function render_Solution() {
                for (let i = 0; i < nb_of_input; i++) {
                    const slot = document.getElementById(i);
                    slot.value = solution[~~(i / 9)][i % 9];
                }
            };
            render_Solution();
        }    
    }, [solution])

    function nextSlot(board) {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (board[i][j] === 0) 
                    return [i, j, false];
            }
        }
        return [-1, -1, true];
    }

    function resetAll() {
        setData([]);
        setSolution([]);
    }

    function isValid(board){
        let rows = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()]
        let cols = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()]
        let squares = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()]
        
        for (let i = 0; i < 9; i++){
            for (let j = 0; j < 9; j++){
                let number = board[i][j];
                if (number !== 0){
                    if (rows[i].has(number) || cols[j].has(number) || squares[~~(i / 3) * 3 + ~~(j / 3)].has(number)){
                        return false;
                    }        
                    rows[i].add(number);
                    cols[j].add(number);
                    squares[~~(i / 3) * 3 + ~~(j / 3)].add(number);
                }
            }
        }
        return true;
    }

    function isSafe(board, row, col, num){
        for(let c = 0; c < 9; c++){
            if (board[row][c] === num){
                return false;
            }
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

    function handleSubmit(e) {
        e.preventDefault();
        let filled_Sudoku = [[], [], [], [], [], [], [], [], []];
        
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let val = parseInt(e.target[i * 9 + j].value)
                if (val > 0 && val < 10){
                    filled_Sudoku[i].push(val);
                }
                else{
                    filled_Sudoku[i].push(0);
                }
            }
            
        }
        setData(filled_Sudoku);  
    }

    const render_inputs = () => {
        let all_Inputs = [];
        for (let i = 0; i < nb_of_input; i++) {
            all_Inputs.push(<input className="sudokuSlot" id={i} min='1' max='9' type='number' key={i}/>);
        }
        return all_Inputs; 
    };

    return (
        <div>
            <div id ="sudoku">
                <h1>Sudoku Solver</h1>
                <form id='sudokuForm' onSubmit={handleSubmit}>
                    <div id='inputs'>
                        {render_inputs()}
                    </div>
                    <div id="formButtons">
                        <input id='submitButton' type='submit' value='Solve'/> 
                        <input type='reset' onClick={resetAll} value='Clear'/> 
                    </div>
                </form>
                
            </div>
        </div>
    );
};

export default Sudoku;