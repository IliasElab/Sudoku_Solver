import React from 'react';
import Sudoku from '../components/Sudoku';
import Contact from '../components/Contact';

const Home = () => {

    function scrollReveal() {      
        const finger = document.getElementById('fingerDiv')
        const sudokuElement = document.querySelector('.reveal-Y')
        const contactList = document.querySelector('.reveal-X')

        if(window.scrollY > 0.8 * (document.documentElement.scrollHeight - window.innerHeight)) {
            contactList.classList.add('active')     
            window.removeEventListener("scroll", scrollReveal);      
        }
        else if(window.scrollY > 0.9 * window.innerHeight){
            finger.classList.add('scrolled')
        }
        else if(window.scrollY > 0.6 * window.innerHeight) {
            sudokuElement.classList.add('active') 
        }
    }
    window.addEventListener('scroll', scrollReveal)  

    return (
        <div id="home">
            <section id="intro">
                <img src="/AI.jpg" alt="Error in Background"/>
                <h1>Sudoku Solver</h1>
                <h3>Sudokus can be fun but sometimes quite frustrating</h3>
                <h3><span>Javascript</span> can help us to solve the Sudoku we are stuck on</h3>
                <div id='fingerDiv'><i className="fa-solid fa-hand-point-down"></i></div>
            </section>
            <section id="main">
                <h3 id='left_h3'>Enter your Sudoku and let Javascript find the solution for you !</h3>
                <div className='reveal-Y'><Sudoku/></div>
            </section>
            <section id='about'>
                <h2>This Website in made by : <span>Ilias El-Abbassi</span></h2>
                <h3>Software Engineer</h3>

                <Contact/>
            </section>
        </div>
    );
    
};

export default Home;