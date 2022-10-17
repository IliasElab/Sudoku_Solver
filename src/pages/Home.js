import React from 'react';
import Sudoku from '../components/Sudoku';


const Home = () => {
    return (
        <div id="home">
            <script src="https://kit.fontawesome.com/a3c07ac5df.js" crossOrigin="anonymous"></script>
            <section id="intro">
                <img src="/AI.jpg" alt="Error in Background"/>
                <h1>Sudoku Solver</h1>
                <h3>Sudokus can be fun but sometimes quite frustrating</h3>
                <h3><span>Javascript</span> can help us to solve the Sudoku we are stuck on</h3>
            </section>
            
            <section id="main">
                <h3 id='left_h3'>Enter your Sudoku and let Javascript find the solution for you !</h3>
                <Sudoku />
            </section>

            <section id='about'>
                <h4>This Website in made by : <span>Ilias El-Abbassi</span></h4>
                <h5>Software Engineer</h5>

                <ul id="list_contact">
                    <li className="list_element"><a href="mailto:elab.ilias@gmail.com"><i className="fa-solid fa-paper-plane"></i> My Mail</a></li>
                    <li className="list_element"><a href="https://www.linkedin.com/in/ilias-el-abbassi-a161131b5/"><i className="fa-brands fa-linkedin"></i> My LinkedIn</a></li>
                    <li className="list_element"><a href="https://github.com/IliasElab"><i className="fa-brands fa-github"></i> My Github</a></li>
                </ul>
            </section>
            
        </div>
    );
    
};

export default Home;