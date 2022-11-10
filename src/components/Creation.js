import React from 'react';

const difficulties = [20, 31, 43, 47, 51, 57]

const Creation = (props) => {

    function randomInRangeDifficulty(i) {
        return Math.floor(Math.random() * (difficulties[i+1] - difficulties[i] + 1)) + difficulties[i];
    }

    return (
        <div id="creationButtons">
            <button className="difficultybutton" id='veryEasy' type='button' onClick={() => props.creationFunction(randomInRangeDifficulty(0))}>SIMPLE <i className="fa-solid fa-face-grin-wide"></i></button>
            <button className="difficultybutton" id='easy' type='button' onClick={() => props.creationFunction(randomInRangeDifficulty(1))}>EASY <i className="fa-solid fa-face-smile"></i></button>
            <button className="difficultybutton" id='medium' type='button' onClick={() => props.creationFunction(randomInRangeDifficulty(2))}>MEDIUM <i className="fa-solid fa-face-meh-blank"></i></button>
            <button className="difficultybutton" id='hard' type='button' onClick={() => props.creationFunction(randomInRangeDifficulty(3))}>HARD <i className="fa-solid fa-face-angry"></i></button>
            <button className="difficultybutton" id='impossible' type='button' onClick={() => props.creationFunction(randomInRangeDifficulty(4))}>HELL <i className="fa-solid fa-skull"></i></button>
        </div>
    );
};

export default Creation;