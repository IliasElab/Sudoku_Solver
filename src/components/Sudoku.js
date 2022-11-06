import React, { useState, useEffect } from 'react';

import { isWrong, solving, fillSudoku, removeNbSlots } from '../functions/SudokuFunctions.js';

const emptySudoku = [['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '']];

const Sudoku = () => {
    const [createSudoku, setCreateSudoku] = useState(false);
    const [sudokuValues, setSudokuValues] = useState(emptySudoku);
    const [solution, setSolution] = useState([]);
    const [wrongSudoku, setWrongSudoku] = useState(false);
    const [wrongInput, setWrongInput] = useState(-1);

    useEffect(() => {
        

        render_creation();

    }, [createSudoku]);

    function resetAll() {
        setSudokuValues(emptySudoku);
        setSolution([]);
        setWrongSudoku(false);
        setWrongInput(-1);
    }



    function handleSubmitAndSolve(e) {
        e.preventDefault();
        setWrongSudoku(false);
        setWrongInput(-1);

        let filled_Sudoku = [[], [], [], [], [], [], [], [], []];
        
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let val = parseInt(e.target[i * 9 + j].value)

                if (val > 0 && val < 10){ filled_Sudoku[i].push(val); }
                else{ filled_Sudoku[i].push(0); }
            }
        }

        const wrongSlot = isWrong(filled_Sudoku);

        if (!wrongSlot){
            const soluce = solving(filled_Sudoku, true, [0, 0]);

            if (soluce) { setSolution(soluce); }
            else {console.log('Error : Impossible to Solve the Sudoku')}
        }
        else {
            setWrongSudoku(true);
            setWrongInput(wrongSlot[0] * 9 + wrongSlot[1])
        }
    }



    function handleCreation() {
        setCreateSudoku(true);
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

    /*const render_inputs = () => {
        let all_Inputs = [];
        for (let i = 0; i < 81; i++) {
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
    };*/
    
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