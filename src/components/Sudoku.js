import React, { useState } from 'react';
import { isWrong, solving, fillSudoku, removeNbSlots } from '../functions/SudokuFunctions.js';


const Sudoku = () => {
    const [sudokuValues, setSudokuValues] = useState([[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    const [solution, setSolution] = useState([]);
    const [wrongSudoku, setWrongSudoku] = useState(false);
    const [wrongInput, setWrongInput] = useState(-1);

    function resetAll() {
        setSudokuValues([[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
        setSolution([]);
        setWrongSudoku(false);
        setWrongInput(-1);
    }

    function createNewSudoku(difficulty) {
        let board = fillSudoku([[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
        board = removeNbSlots(board, difficulty);
        return board;
    }

    function handleSubmitAndSolve(e) {
        e.preventDefault();
        setWrongSudoku(false);
        setWrongInput(-1);

        const wrongSlot = isWrong(sudokuValues);

        if (!wrongSlot){
            const soluce = solving(JSON.parse(JSON.stringify(sudokuValues)), true);

            if (soluce) { setSolution(soluce); }
            else { console.log('Error : Impossible to Solve the Sudoku') }
        }
        else {
            setWrongSudoku(true);
            setWrongInput(wrongSlot[0] * 9 + wrongSlot[1])
        }
    }

    function handleChange(e) {
        let copied = JSON.parse(JSON.stringify(sudokuValues));
        const idr = ~~(e.target.id / 9);
        const idc = e.target.id % 9;

        if (e.target.value > 0 && e.target.value < 10){ copied[idr][idc] = parseInt(e.target.value); }
        else{ copied[idr][idc] = 0; }

        setSudokuValues(copied);
        

        if (wrongInput !== -1 && ~~(wrongInput / 9) === idr && wrongInput % 9 === idc){
            setWrongSudoku(false);
            setWrongInput(-1);
        }
    }

    function handleCreation() {
        render_creation();
    }

    const render_creation = () => {
        //const difficulty = 50;
        //let board = createNewSudoku(difficulty);
        
        let all_Inputs = [];

        for (let i = 0; i < 81; i++) {
            const idxr = ~~(i / 9);
            const idxe = i % 9;

            if((~~(idxr / 3) !== 1 && ~~(idxe / 3) !== 1) || (~~(idxr / 3) === 1 && ~~(idxe / 3) === 1)){
                all_Inputs.push(<input onChange={handleChange} value={sudokuValues[idxr][idxe] !== 0 ? sudokuValues[idxr][idxe] : ''} className={wrongInput === i ? "sudokuSlot inputs_side_color red_input" : "sudokuSlot inputs_side_color"} id={i} min='1' max='9' type='number' key={i}/>);
            }
            else {
                all_Inputs.push(<input onChange={handleChange} value={sudokuValues[idxr][idxe] !== 0 ? sudokuValues[idxr][idxe] : ''} className={wrongInput === i ? "sudokuSlot inputs_normal_color red_input" : "sudokuSlot inputs_normal_color"} id={i} min='1' max='9' type='number' key={i}/>);
            }
        }
        return all_Inputs;
    }
    
    const render_solution = () => {
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

    return (
        <div>
            <div id ="sudoku">
                <form id='sudokuForm' onSubmit={handleSubmitAndSolve}>
                    <div id='inputs'>
                        {render_creation()}
                    </div>
                    <div id="formButtons">
                        <button id='submitButton' type='submit'>SOLVE <i className="fa-solid fa-robot"></i></button>
                        <button id='createButton' type='button' onClick={handleCreation}>CREATE <i className="fa-solid fa-table-cells"></i></button>  
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