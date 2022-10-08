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
        if (!firstRender){
            console.log(data)   
        } 
    }, [data])
    
    useEffect(() => {
        if (!firstRender){
            console.log(solution);
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
        for (let i = 1; i <= nb_of_input; i++) {
            all_Inputs.push(<input name={i} min='1' max='9' type='number' key={i}/>);
        }
        return all_Inputs; 
    };

    return (
        <div>
            <div id ="sudoku">
                <h1>sudoku</h1>
                <form onSubmit={handleSubmit}>
                    {render_inputs()}
                    <input type='submit' value='Solve'/>
                </form>
            </div>
        </div>
    );
};

export default Sudoku;