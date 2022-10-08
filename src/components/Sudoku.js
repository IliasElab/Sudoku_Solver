import React, { useState } from 'react';


const Sudoku = () => {
    const [data, setData] = useState([])
    const nb_of_input = 81

    function isValid() {
        let rows = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()];
        let cols = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()];
        let squares = [new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set(), new Set()];
        
        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++)
                const number = board[i + 9*j]
                if (number != 0){
                    if (number in rows[i] or number in cols[j] or number in squares[~~(i / 3) * 3 + ~~(j / 3)]){
                        return False
                    }    
                    rows[i].add(number)
                    cols[j].add(number)
                    squares[(i // 3) * 3 + j // 3].add(number)
                }

        return True
    }

    function solving() {

    }

    function handleSubmit(e) {
        e.preventDefault();
        let filled_Sudoku = []
        for (let i = 0; i < nb_of_input; i++) {
            if (e.target[i].value > 0 && e.target[i].value < 10){
                filled_Sudoku.push(e.target[i].value)
            }
            else{
                filled_Sudoku.push(0)
            }
        }
        setData(filled_Sudoku)
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
                {data}
            </div>
        </div>
    );
};

export default Sudoku;