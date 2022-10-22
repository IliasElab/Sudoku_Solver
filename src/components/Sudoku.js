import React, { useState, useEffect } from 'react';


const Sudoku = () => {
    const [data, setData] = useState([]);
    const [solution, setSolution] = useState([]);
    const [firstRender, setfirstRender] = useState(true);
    const [wrongSudoku, setWrongSudoku] = useState(false);
    const [wrongInput, setWrongInput] = useState(-1);
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
            setWrongInput(-1);
            const wrongSlot = isWrong(data);
            if (!wrongSlot){
                solving(data);
            }
            else {
                setWrongSudoku(true);
                setWrongInput(wrongSlot[0] * 9 + wrongSlot[1])
            }
        } 
    }, [data])

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
        setWrongSudoku(false);
        setWrongInput(-1);
    }

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
            const idxr = ~~(i / 9);
            const idxe = i % 9;
            if((~~(idxr / 3) !== 1 && ~~(idxe / 3) !== 1) || (~~(idxr / 3) === 1 && ~~(idxe / 3) === 1)){
                all_Inputs.push(<input className={wrongInput === i ? "sudokuSlot inputs_side_color red_input" : "sudokuSlot inputs_side_color"} id={i} min='1' max='9' type='number' key={i}/>);
            }
            else {
                all_Inputs.push(<input className={wrongInput === i ? "sudokuSlot inputs_normal_color red_input" : "sudokuSlot inputs_normal_color"} id={i} min='1' max='9' type='number' key={i}/>);
            }
        }
        
        return all_Inputs; 
    };

    const render_solution = () => {
        if (firstRender === false){
            const soluce = solution.map((row, idxr) => <tr key={'row' + idxr.toString()}>
                {row.map((elem, idxe) => 
                    {if((~~(idxr / 3) !== 1 && ~~(idxe / 3) !== 1) || (~~(idxr / 3) === 1 && ~~(idxe / 3) === 1)) {
                        return <td className="soluce_side_color" key={'slot' + idxe.toString()}>{elem}</td>
                    }
                    else{
                        return <td className="soluce_normal_color" key={'slot' + idxe.toString()}>{elem}</td>
                    }} 
                )}
            </tr>)

            return soluce;
        }   
    }

    return (
        <div>
            <div id ="sudoku">
                <form id='sudokuForm' onSubmit={handleSubmit}>
                    <div id='inputs'>
                        {render_inputs()}
                    </div>
                    <div id="formButtons">
                        <button id='submitButton' type='submit'>SOLVE <i className="fa-solid fa-robot"></i></button> 
                        <button id='resetButton' type='reset' onClick={resetAll}>CLEAR <i className="fa-solid fa-trash-can"></i></button> 
                    </div>
                    {wrongSudoku && <div id='wrongContainer'><button onClick={() => setWrongSudoku(false)} id='wrongSudoku'>Hum... Your Sudoku seems to be wrong, check the <span>NUMBER</span> and <span>ROW</span> / <span>COLUMN</span> / <span>SQUARE</span> he is in</button></div>}
                </form>
                

                {solution.length > 0 && <table>
                    <tbody id='solution'>
                        {render_solution()}
                    </tbody>
                </table>}
                
            </div>
        </div>
    );
};

export default Sudoku;