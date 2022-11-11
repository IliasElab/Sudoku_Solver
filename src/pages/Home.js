import React, { useState } from 'react';
import Sudoku from '../components/Sudoku';
import Contact from '../components/Contact';

const Home = () => {

    const [animatedSudoku, setAnimatedSudoku] = useState(false);
    const [animatedContacts, setAnimatedContacts] = useState(false);
    const [animatedFinger, setAnimatedFinger] = useState(true);

    function scrollReveal() {
        if(window.scrollY > 0.8 * (document.documentElement.scrollHeight - window.innerHeight)) {
            setAnimatedContacts(true);
            window.removeEventListener("scroll", scrollReveal);      
        }
        else if(window.scrollY > 0.9 * window.innerHeight) { setAnimatedFinger(false); }
        else if(window.scrollY > 0.6 * window.innerHeight) { setAnimatedSudoku(true); }
    }

    window.addEventListener('scroll', scrollReveal)  

    return (
        <div id="home">
            <section id="intro">
                <img src="/AI.jpg" alt="Error in Background"/>
                <h1>Sudoku Game</h1>
                <h3>Sudoku is a logic-based, number-placement puzzle. The objective is to fill a 9 × 9 grid </h3>
                <h3><span>Javascript</span> can help us to solve the Sudoku we are stuck on</h3>
                <div id='fingerDiv' className={animatedFinger ? '' : 'scrolled'}><i className="fa-solid fa-hand-point-down"></i></div>
            </section>

            <section id="main">
                <h3 id='left_h3'>Enter your Sudoku or try to solve one !</h3>
                <Sudoku animation={animatedSudoku}/>
            </section>

            <section id='about'>
                <h2>This Website in made by : <span>Ilias El-Abbassi</span></h2>
                <h3>Software Engineer</h3>
                <Contact animation={animatedContacts}/>
            </section>
        </div>
    );
    
};

export default Home;