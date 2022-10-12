import React from 'react';
import Navigation from '../components/Navigation';


const About = () => {
    return (
        <div>
            <Navigation />

            <section id="contact">
                <h1>This Sudoku Solver is developed by : <span>Ilias El-Abbassi<span>Software Engineer</span></span></h1>
                <h3></h3>

                <div id="contact-links">
                    <a href="https://www.linkedin.com/in/ilias-el-abbassi-a161131b5/" class="contact-item" target="_blank"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
                    <a href="https://github.com/IliasElab" class="contact-item" id="profile-link" target="_blank"><i class="fa-brands fa-github"></i> Github</a>
                    <a class="contact-item" target="_blank"><i class="fa-solid fa-phone"></i> Phone</a>
                    <a href="mailto:elab.ilias@gmail.com" class="contact-item" target="_blank"><i class="fa-solid fa-envelope"></i> elab.ilias@gmail.com</a>
                </div>
                <h5>This Web application is made using JavaScript / ReactJS</h5>
            </section>
        </div>
    );
};

export default About;