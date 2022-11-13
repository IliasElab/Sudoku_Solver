import React, { useState } from 'react';
import { isWrong, solving, createNewSudoku } from '../functions/SudokuFunctions.js';
import Creation from './Creation.js';
import Solution from './Solution.js';

const Sudoku = (props) => {
    const [sudokuValues, setSudokuValues] = useState([[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    const [solution, setSolution] = useState([]);
    const [wrongInput, setWrongInput] = useState([]);
    const [checkIsTrue, setCheckIsTrue] = useState(0);
    const [wrongSudoku, setWrongSudoku] = useState(false);
    const [createdSudoku, setCreatedSudoku] = useState([[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    const [isCorrect, setIsCorrect] = useState(false);
    
    function resetNotSudokuValues() {
        setSolution([]);
        setWrongInput(-1);
        setWrongSudoku(false);
        setCheckIsTrue(0);
        setIsCorrect(false);
    }
    
    function resetAll() {
        setSudokuValues([[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
        setCreatedSudoku([[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
        resetNotSudokuValues();
    }

    function handleSolve() {
        setWrongInput(-1);

        const wrongSlot = isWrong(sudokuValues);

        if (!wrongSlot){

            const soluce = solving(JSON.parse(JSON.stringify(sudokuValues)), true);

            if (soluce) { 
                setSolution(soluce);
                setWrongSudoku(false);
                setCheckIsTrue(0);
             }
            else { 
                setSolution([]);
                setWrongSudoku(true);
                setCheckIsTrue(-1);
                console.log('Error : Impossible to Solve the Sudoku');
            }
        }
        else { 
            setWrongInput(wrongSlot);
            setCheckIsTrue(-1);
        }
    }

    function handleChange(e) {
        setCheckIsTrue(0);
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
        resetNotSudokuValues();
    }

    function handleChecking() {
        const wrongSlot = isWrong(sudokuValues);

        if (!wrongSlot){
            let noZero = true;
            for (const row of sudokuValues){
                if (row.includes(0)){ 
                    noZero = false; 
                    break;
                }
            }

            if (noZero){
                setWrongSudoku(false);
                setCheckIsTrue(0);
                setIsCorrect(true);
                return;      
            }

            const soluce = solving(JSON.parse(JSON.stringify(sudokuValues)), true);

            if (soluce) { 
                console.log("The Sudoku is Correct !");
                setCheckIsTrue(1);
                setWrongSudoku(false);
             }
            else { 
                console.log('The Sudoku cannot be solve, need some changes !');
                setCheckIsTrue(-1);
                setWrongSudoku(true);
            }
        }
        else {
            setWrongInput(wrongSlot);
            setWrongSudoku(false);
            setCheckIsTrue(-1);
        }
    }

    function handleReset() {
        setSudokuValues(createdSudoku);
        setWrongInput(-1);
        setWrongSudoku(false);
        setCheckIsTrue(0);
        setIsCorrect(false);
    }

    function handleWrongContainer () {
        setWrongSudoku(false);
        setCheckIsTrue(0);
    }

    const render_inputs = () => {
        let all_Inputs = [];

        for (let i = 0; i < 81; i++) {
            const idxr = ~~(i / 9);
            const idxe = i % 9;

            if((~~(idxr / 3) !== 1 && ~~(idxe / 3) !== 1) || (~~(idxr / 3) === 1 && ~~(idxe / 3) === 1)){
                all_Inputs.push(<input disabled={createdSudoku[idxr][idxe]} onChange={handleChange} value={sudokuValues[idxr][idxe] !== 0 ? sudokuValues[idxr][idxe] : ''} className={isCorrect ? "sudokuSlot inputs_side_color correct" : (wrongInput[0] === 'row' && wrongInput[1] === idxr) || (wrongInput[0] === 'column' && wrongInput[1] === idxe) || (wrongInput[0] === 'square' && wrongInput[1] ===  ~~(idxr / 3) * 3 + ~~(idxe / 3)) ? "sudokuSlot inputs_side_color red_input" : "sudokuSlot inputs_side_color"} id={i} min='1' max='9' type='number' key={i}/>);
            }
            else {
                all_Inputs.push(<input disabled={createdSudoku[idxr][idxe]} onChange={handleChange} value={sudokuValues[idxr][idxe] !== 0 ? sudokuValues[idxr][idxe] : ''} className={isCorrect ? "sudokuSlot inputs_normal_color correct" : (wrongInput[0] === 'row' && wrongInput[1] === idxr) || (wrongInput[0] === 'column' && wrongInput[1] === idxe) || (wrongInput[0] === 'square' && wrongInput[1] ===  ~~(idxr / 3) * 3 + ~~(idxe / 3)) ? "sudokuSlot inputs_normal_color red_input" : "sudokuSlot inputs_normal_color"} id={i} min='1' max='9' type='number' key={i}/>);
            }
        }
        return all_Inputs;
    }

    return (
        <div id ="sudoku" className={props.animation ? 'reveal-Y active' : 'reveal-Y'}>
            <form id='sudokuForm'>
                <Creation creationFunction={handleCreation} />

                <div id='inputs' className={isCorrect ? 'sudokuDone' : (checkIsTrue !== 0 ? (checkIsTrue === 1 ? 'checkIsTrue' : 'checkIsFalse') : '')} >
                    {render_inputs()}
                </div>

                <div id="formButtons">
                    <button id='submitButton' type='button' onClick={handleSolve}>SOLVE <i className="fa-solid fa-robot"></i></button>
                    <button id='resetButton' type='button' onClick={handleReset}>RESET <i className="fa-solid fa-arrows-rotate"></i></button>
                    <button id='checkButton' type='button' onClick={handleChecking}>CHECK <i className="fa-regular fa-circle-check"></i></button>  
                    <button id='clearButton' type='reset' onClick={resetAll}>CLEAR <i className="fa-solid fa-trash-can"></i></button> 
                </div>

                {wrongSudoku && <div id='wrongContainer'>
                    <button onClick={handleWrongContainer} id='wrongSudoku'>Hum... Your Sudoku seems impossible to Solve, We need you to change some numbers !</button>
                </div>}
                
            </form>

            {solution.length > 0 && <Solution data={solution} />}
            
        </div>
    );
};

export default Sudoku;