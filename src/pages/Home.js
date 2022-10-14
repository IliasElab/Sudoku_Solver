import React from 'react';
import Sudoku from '../components/Sudoku';


const Home = () => {
    return (
        <div id="home">
            <script src="https://kit.fontawesome.com/a3c07ac5df.js" crossorigin="anonymous"></script>
            <section id="intro">
                <img src="/AI.jpg" alt="Error in Background"/>
                <h1>Sudoku Solver</h1>
                
                <h3>Sudokus can be fun but somtimes quite frustrating</h3>
                <h3><span>Javascript</span> can help us to solve the Sudoku we are stuck on</h3>
            </section>

            <section id="main">
                <h3 id='left_h3'>Enter your Sudoku and let Javascript find the solution for you !</h3>
                <Sudoku />
            </section>


            
        </div>
    );
    
};

export default Home;