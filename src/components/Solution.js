import React from 'react';

const Solution = (props) => {

    const solution = props.data;

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
        <table>
            <tbody id='solution'>{render_solution()}</tbody>
        </table>  
    );
};

export default Solution;