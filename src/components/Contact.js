import React from 'react';

const Contact = () => {

    const contacts = {
        'mail' : {
            'link' : "mailto:elab.ilias@gmail.com",
            'icon' : "fa-solid fa-paper-plane",
            'content' : 'My Mail'
        },

        'linkedin' : {
            'link' : "https://www.linkedin.com/in/ilias-el-abbassi-a161131b5/",
            'icon' : "fa-brands fa-linkedin",
            'content' : 'My LinkedIn'
        },

        'github' : {
            'link' : "https://github.com/IliasElab",
            'icon' : "fa-brands fa-github",
            'content' : 'My Github'
        }
    }

    const render_contacts = () => {
        let elements = [];

        Object.values(contacts).forEach((element) => {
            elements.push(<li className="list_element"><a href={element.link}><i className={element.icon}></i> {element.content}</a></li>)
        })

        return elements;
    }

    return (
        <ul id="list_contact" className='reveal-X'>
            {render_contacts()}
        </ul>
    );
};

export default Contact;