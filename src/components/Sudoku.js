import React, { useState, useReducer } from 'react';
import { isWrong, solving, createNewSudoku } from '../functions/SudokuFunctions.js';
import Creation from './Creation.js';


const Sudoku = () => {
    const [sudokuValues, setSudokuValues] = useState([[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    const [solution, setSolution] = useState([]);
    const [wrongInput, setWrongInput] = useState([]);
    const [checkIsTrue, setCheckIsTrue] = useState(0);
    const [createdSudoku, setCreatedSudoku] = useState([[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]);

    function resetAll() {
        setSudokuValues([[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
        setCreatedSudoku([[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
        setSolution([]);
        setWrongInput(-1);
    }

    function setCheck(value) {
        setCheckIsTrue(value);
        setTimeout(() => setCheckIsTrue(0), 2000);
    }

    function handleSubmitAndSolve(e) {
        e.preventDefault();
        setWrongInput(-1);

        const wrongSlot = isWrong(sudokuValues);

        if (!wrongSlot){
            const soluce = solving(JSON.parse(JSON.stringify(sudokuValues)), true);

            if (soluce) { setSolution(soluce); }
            else { 
                setSolution([]);
                console.log('Error : Impossible to Solve the Sudoku');
            }
        }
        else {
            setWrongInput(wrongSlot)
        }
    }

    function handleChange(e) {
        let copied = JSON.parse(JSON.stringify(sudokuValues));
        const idr = ~~(e.target.id / 9);
        const idc = e.target.id % 9;

        if (e.target.value !== '' && !isNaN(e.target.value)){ copied[idr][idc] = Number(String(e.target.value)[0]); }
        else { copied[idr][idc] = 0; }

        setSudokuValues(copied);

        if (wrongInput.length > 0 && ((wrongInput[0] === 'row' && wrongInput[1] === idr) || (wrongInput[0] === 'column' && wrongInput[1] === idc) || (wrongInput[0] === 'square' && wrongInput[1] ===  ~~(idr / 3) * 3 + ~~(idc / 3)))){
            setWrongInput([]);
        }
    }

    function handleCreation(difficulty) {
        let board = createNewSudoku(difficulty);
        setSudokuValues(board);
        setCreatedSudoku(board);
        setSolution([]);
    }

    function handleChecking() {
        const wrongSlot = isWrong(sudokuValues);

        if (!wrongSlot){
            const soluce = solving(JSON.parse(JSON.stringify(sudokuValues)), true);

            if (soluce) { 
                console.log("The Sudoku is Correct !");
                setCheck(1);
             }
            else { 
                console.log('The Sudoku cannot be solve, need some changes !');
                setCheck(-1)
            }
        }
        else {
            setWrongInput(wrongSlot)
            setCheck(-1)
        }
    }

    function handleReset() {
        setSudokuValues(createdSudoku);
        setWrongInput(-1);
    }

    const render_inputs = () => {
        let all_Inputs = [];

        for (let i = 0; i < 81; i++) {
            const idxr = ~~(i / 9);
            const idxe = i % 9;

            if((~~(idxr / 3) !== 1 && ~~(idxe / 3) !== 1) || (~~(idxr / 3) === 1 && ~~(idxe / 3) === 1)){
                all_Inputs.push(<input disabled={createdSudoku[idxr][idxe]} onChange={handleChange} value={sudokuValues[idxr][idxe] !== 0 ? sudokuValues[idxr][idxe] : ''} className={(wrongInput[0] === 'row' && wrongInput[1] === idxr) || (wrongInput[0] === 'column' && wrongInput[1] === idxe) || (wrongInput[0] === 'square' && wrongInput[1] ===  ~~(idxr / 3) * 3 + ~~(idxe / 3)) ? "sudokuSlot inputs_side_color red_input" : "sudokuSlot inputs_side_color"} id={i} min='1' max='9' type='number' key={i}/>);
            }
            else {
                all_Inputs.push(<input disabled={createdSudoku[idxr][idxe]} onChange={handleChange} value={sudokuValues[idxr][idxe] !== 0 ? sudokuValues[idxr][idxe] : ''} className={(wrongInput[0] === 'row' && wrongInput[1] === idxr) || (wrongInput[0] === 'column' && wrongInput[1] === idxe) || (wrongInput[0] === 'square' && wrongInput[1] ===  ~~(idxr / 3) * 3 + ~~(idxe / 3)) ? "sudokuSlot inputs_normal_color red_input" : "sudokuSlot inputs_normal_color"} id={i} min='1' max='9' type='number' key={i}/>);
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
                    <Creation creationFunction={handleCreation} />
                    <div id='inputs' className={checkIsTrue !== 0 ? (checkIsTrue === 1 ? 'checkIsTrue' : 'checkIsFalse') : ''} >
                        {render_inputs()}
                    </div>
                    <div id="formButtons">
                        <button id='submitButton' type='submit'>SOLVE <i className="fa-solid fa-robot"></i></button>
                        <button id='resetButton' type='button' onClick={handleReset}>RESET <i className="fa-solid fa-arrows-rotate"></i></button>
                        <button id='checkButton' type='button' onClick={handleChecking}>CHECK <i className="fa-regular fa-circle-check"></i></button>  
                        <button id='clearButton' type='reset' onClick={resetAll}>CLEAR <i className="fa-solid fa-trash-can"></i></button> 
                    </div>
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